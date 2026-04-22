const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^"(.*)"$/, "$1");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const NODE_ENV = process.env.NODE_ENV || "development";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL || "";
const MAIL_FROM = process.env.MAIL_FROM || "Natural Hype Orders <onboarding@resend.dev>";
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const FULFILLED_ORDERS_FILE = path.join(DATA_DIR, "fulfilled-orders.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendFile(response, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(response, 404, { error: "File not found" });
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentType
    });
    response.end(content);
  });
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    request.on("error", reject);
  });
}

function parseRawBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalSize = 0;

    request.on("data", (chunk) => {
      chunks.push(chunk);
      totalSize += chunk.length;

      if (totalSize > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    request.on("error", reject);
  });
}

function formatAmount(value) {
  return Math.round(Number(value) * 100);
}

function clampText(value, limit = 180) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readFulfilledOrders() {
  ensureDataDir();
  if (!fs.existsSync(FULFILLED_ORDERS_FILE)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(FULFILLED_ORDERS_FILE, "utf8"));
  } catch (error) {
    return {};
  }
}

function markOrderFulfilled(sessionId, metadata = {}) {
  const fulfilled = readFulfilledOrders();
  fulfilled[sessionId] = {
    sentAt: new Date().toISOString(),
    ...metadata
  };
  fs.writeFileSync(FULFILLED_ORDERS_FILE, JSON.stringify(fulfilled, null, 2));
}

function hasOrderBeenFulfilled(sessionId) {
  const fulfilled = readFulfilledOrders();
  return Boolean(fulfilled[sessionId]);
}

function verifyStripeWebhookSignature(rawBody, signatureHeader) {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe webhook secret is not configured.");
  }

  if (!signatureHeader) {
    throw new Error("Missing Stripe signature header.");
  }

  const elements = signatureHeader.split(",").map((part) => part.trim());
  const timestamp = elements.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = elements.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));

  if (!timestamp || !signatures.length) {
    throw new Error("Invalid Stripe signature header.");
  }

  const signedPayload = `${timestamp}.${rawBody.toString("utf8")}`;
  const expectedSignature = crypto
    .createHmac("sha256", STRIPE_WEBHOOK_SECRET)
    .update(signedPayload, "utf8")
    .digest("hex");

  const isMatch = signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    return signatureBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  });

  if (!isMatch) {
    throw new Error("Stripe signature verification failed.");
  }
}

async function fetchCheckoutLineItems(sessionId) {
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=100`, {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data && data.error && data.error.message
        ? data.error.message
        : "Stripe line items could not be retrieved.";
    throw new Error(message);
  }

  return data.data || [];
}

function buildRestaurantEmail(session, lineItems) {
  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const amountTotal = typeof session.amount_total === "number" ? (session.amount_total / 100).toFixed(2) : "0.00";

  const itemsMarkup = lineItems
    .map((item) => {
      const quantity = item.quantity || 1;
      const description = escapeHtml(item.description || "Menu item");
      const total = typeof item.amount_total === "number" ? (item.amount_total / 100).toFixed(2) : "0.00";
      return `<li><strong>${quantity} x ${description}</strong> - GBP ${total}</li>`;
    })
    .join("");

  const subject = `New paid order - ${metadata.customer_name || customerDetails.name || "Natural Hype customer"}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #1d321f; line-height: 1.6;">
      <h1 style="margin-bottom: 8px;">New paid order received</h1>
      <p style="margin-top: 0;">Stripe payment completed successfully for Natural Hype Juice and Jerk.</p>
      <h2 style="margin-bottom: 8px;">Customer</h2>
      <p>
        <strong>Name:</strong> ${escapeHtml(metadata.customer_name || customerDetails.name || "Not provided")}<br />
        <strong>Email:</strong> ${escapeHtml(customerDetails.email || "Not provided")}<br />
        <strong>Phone:</strong> ${escapeHtml(metadata.phone || customerDetails.phone || "Not provided")}
      </p>
      <h2 style="margin-bottom: 8px;">Order details</h2>
      <p>
        <strong>Service:</strong> ${escapeHtml(metadata.service_mode || "Not provided")}<br />
        <strong>Requested time:</strong> ${escapeHtml(metadata.desired_time || "Not provided")}<br />
        <strong>Address:</strong> ${escapeHtml(metadata.address || "Not provided")}<br />
        <strong>Notes:</strong> ${escapeHtml(metadata.notes || "None")}<br />
        <strong>Total paid:</strong> GBP ${escapeHtml(amountTotal)}<br />
        <strong>Stripe session:</strong> ${escapeHtml(session.id)}
      </p>
      <h2 style="margin-bottom: 8px;">Items</h2>
      <ul>${itemsMarkup || "<li>No items returned from Stripe.</li>"}</ul>
    </div>
  `;

  return { subject, html };
}

async function sendRestaurantEmail(session, lineItems) {
  if (!RESEND_API_KEY) {
    throw new Error("Resend API key is not configured.");
  }

  if (!RESTAURANT_EMAIL) {
    throw new Error("Restaurant email is not configured.");
  }

  const email = buildRestaurantEmail(session, lineItems);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [RESTAURANT_EMAIL],
      subject: email.subject,
      html: email.html
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data && data.message
        ? data.message
        : "Restaurant email could not be sent.";
    throw new Error(message);
  }

  return data;
}

async function handleSuccessfulCheckout(session) {
  if (!session || !session.id) {
    throw new Error("Checkout session payload is missing.");
  }

  if (hasOrderBeenFulfilled(session.id)) {
    return;
  }

  const lineItems = await fetchCheckoutLineItems(session.id);
  await sendRestaurantEmail(session, lineItems);
  markOrderFulfilled(session.id, {
    email: RESTAURANT_EMAIL
  });
}

function buildStripeParams(payload, origin) {
  const params = new URLSearchParams();
  const { cartItems = [], customer = {}, service = {} } = payload;
  const lineItems = [];

  cartItems.forEach((item) => {
    const quantity = Math.max(1, Number(item.quantity || 1));
    const price = Number(item.price || 0);

    if (!item.name || !Number.isFinite(price) || price <= 0) {
      return;
    }

    const sauceLabel = Array.isArray(item.sauces) && item.sauces.length ? item.sauces.join(", ") : "";

    lineItems.push({
      name: clampText(item.name, 80),
      variant: clampText(
        [item.optionLabel || "", sauceLabel].filter(Boolean).join(" • "),
        120
      ),
      quantity,
      unitAmount: formatAmount(price)
    });
  });

  const serviceFee = Number(service.fee || 0);
  if (Number.isFinite(serviceFee) && serviceFee > 0) {
    lineItems.push({
      name: `${clampText(service.mode || "Service", 20)} fee`,
      variant: "",
      quantity: 1,
      unitAmount: formatAmount(serviceFee)
    });
  }

  if (!lineItems.length) {
    throw new Error("Cart is empty");
  }

  params.set("mode", "payment");
  params.set("success_url", `${origin}/?checkout=success`);
  params.set("cancel_url", `${origin}/?checkout=cancelled`);
  params.set("billing_address_collection", "required");
  params.set("phone_number_collection[enabled]", "true");
  params.set("allow_promotion_codes", "true");

  if (customer.email) {
    params.set("customer_email", clampText(customer.email, 80));
  }

  lineItems.forEach((item, index) => {
    const label = item.variant ? `${item.name} (${item.variant})` : item.name;
    params.set(`line_items[${index}][quantity]`, String(item.quantity));
    params.set(`line_items[${index}][price_data][currency]`, "gbp");
    params.set(`line_items[${index}][price_data][unit_amount]`, String(item.unitAmount));
    params.set(`line_items[${index}][price_data][product_data][name]`, label);
  });

  params.set("metadata[customer_name]", clampText(customer.name, 80));
  params.set("metadata[phone]", clampText(customer.phone, 40));
  params.set("metadata[service_mode]", clampText(service.mode, 20));
  params.set("metadata[desired_time]", clampText(service.desiredTime, 40));
  params.set("metadata[address]", clampText(service.address, 120));
  params.set("metadata[notes]", clampText(service.notes, 120));

  return params;
}

async function createStripeCheckoutSession(payload, origin) {
  const params = buildStripeParams(payload, origin);
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data && data.error && data.error.message
        ? data.error.message
        : "Stripe checkout session could not be created.";
    throw new Error(message);
  }

  return data;
}

const server = http.createServer(async (request, response) => {
  const host = request.headers.host || `localhost:${PORT}`;
  const protocol =
    request.headers["x-forwarded-proto"] ||
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const parsedUrl = new URL(request.url, origin);

  if (request.method === "GET" && parsedUrl.pathname === "/api/config") {
    sendJson(response, 200, {
      stripeEnabled: Boolean(STRIPE_SECRET_KEY),
      currency: "GBP",
      environment: NODE_ENV
    });
    return;
  }

  if (request.method === "GET" && parsedUrl.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      stripeEnabled: Boolean(STRIPE_SECRET_KEY),
      webhookReady: Boolean(STRIPE_WEBHOOK_SECRET),
      emailReady: Boolean(RESEND_API_KEY && RESTAURANT_EMAIL)
    });
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/stripe/webhook") {
    try {
      const rawBody = await parseRawBody(request);
      verifyStripeWebhookSignature(rawBody, request.headers["stripe-signature"]);
      const event = JSON.parse(rawBody.toString("utf8"));

      if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
      ) {
        await handleSuccessfulCheckout(event.data.object);
      }

      sendJson(response, 200, { received: true });
    } catch (error) {
      sendJson(response, 400, {
        error: error.message || "Stripe webhook failed."
      });
    }
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/create-checkout-session") {
    try {
      const payload = await parseBody(request);

      if (!STRIPE_SECRET_KEY) {
        sendJson(response, 500, {
          error: "Stripe is not configured on the server."
        });
        return;
      }

      const session = await createStripeCheckoutSession(payload, origin);
      sendJson(response, 200, {
        mode: "stripe",
        url: session.url,
        id: session.id
      });
    } catch (error) {
      sendJson(response, 400, {
        error: error.message || "Checkout request failed."
      });
    }
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  let filePath = path.join(PUBLIC_DIR, parsedUrl.pathname);
  if (parsedUrl.pathname === "/") {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      sendFile(response, path.join(filePath, "index.html"));
      return;
    }

    sendFile(response, filePath);
  });
});

server.listen(PORT, () => {
  console.log(`Natural Hype Juice and Jerk is running at http://localhost:${PORT}`);
});

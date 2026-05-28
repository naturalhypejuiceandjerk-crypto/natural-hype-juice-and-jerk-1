const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function loadEnvFile(envPath) {
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

loadEnvFile(path.join(__dirname, ".env"));
loadEnvFile("/etc/secrets/.env");

const PORT = Number(process.env.PORT || 3000);
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const NODE_ENV = process.env.NODE_ENV || "development";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL || "";
const MAIL_FROM = process.env.MAIL_FROM || "Natural Hype Orders <onboarding@resend.dev>";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || "";
const BUSINESS_PHONE_NUMBER = process.env.BUSINESS_PHONE_NUMBER || "";
const ADMIN_PIN = process.env.ADMIN_PIN || "";
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const FULFILLED_ORDERS_FILE = path.join(DATA_DIR, "fulfilled-orders.json");
const ORDER_RECORDS_FILE = path.join(DATA_DIR, "orders.json");
const ADMIN_COOKIE_NAME = "nh_owner_session";

function isEmailConfigured() {
  return Boolean(RESEND_API_KEY && RESTAURANT_EMAIL && MAIL_FROM);
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
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

function sendRedirect(response, location) {
  response.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store"
  });
  response.end();
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

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, entry) => {
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex === -1) {
      return cookies;
    }

    const key = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1).trim();
    if (key) {
      cookies[key] = decodeURIComponent(value);
    }
    return cookies;
  }, {});
}

function createOrderId() {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomPart = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `NH-${datePart}-${randomPart}`;
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

function readOrderRecords() {
  ensureDataDir();
  if (!fs.existsSync(ORDER_RECORDS_FILE)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(ORDER_RECORDS_FILE, "utf8"));
  } catch (error) {
    return {};
  }
}

function saveOrderRecord(orderId, order) {
  const orders = readOrderRecords();
  const existing = orders[orderId] || {};
  orders[orderId] = {
    ...existing,
    ...order,
    orderId,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(ORDER_RECORDS_FILE, JSON.stringify(orders, null, 2));
  return orders[orderId];
}

function getOrderRecord(orderId) {
  const cleanOrderId = clampText(orderId, 40);
  if (!cleanOrderId) {
    return null;
  }

  return readOrderRecords()[cleanOrderId] || null;
}

function listOrderRecords() {
  return Object.values(readOrderRecords()).sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return dateB - dateA;
  });
}

function createAdminSessionToken() {
  if (!ADMIN_PIN) {
    return "";
  }

  return crypto.createHmac("sha256", ADMIN_PIN).update("natural-hype-owner").digest("hex");
}

function hasAdminSession(request) {
  if (!ADMIN_PIN) {
    return false;
  }

  const cookies = parseCookies(request.headers.cookie || "");
  const token = cookies[ADMIN_COOKIE_NAME] || "";
  const expected = createAdminSessionToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return tokenBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
}

function isAdminRequest(request) {
  if (!ADMIN_PIN) {
    return false;
  }

  return request.headers["x-admin-pin"] === ADMIN_PIN || hasAdminSession(request);
}

function sendAdminUnauthorized(response) {
  sendJson(response, ADMIN_PIN ? 401 : 503, {
    error: ADMIN_PIN ? "Owner PIN is incorrect." : "Owner PIN is not configured."
  });
}

function createTicketItems(lineItems) {
  return lineItems.map((item) => ({
    quantity: item.quantity || 1,
    name: clampText(item.description || "Menu item", 120),
    lineTotal: typeof item.amount_total === "number" ? item.amount_total / 100 : 0
  }));
}

function buildStoredOrder(session, lineItems, status) {
  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const orderId = metadata.order_id || session.client_reference_id || createOrderId();
  const paymentMethod = metadata.payment_method === "cash" ? "cash" : "card";

  return {
    orderId,
    status,
    paymentMethod,
    customerName: clampText(metadata.customer_name || customerDetails.name || "customer", 80),
    customerPhone: clampText(metadata.phone || customerDetails.phone || "", 40),
    customerEmail: clampText(customerDetails.email || "", 80),
    serviceMode: clampText(metadata.service_mode || "", 20),
    desiredTime: clampText(metadata.desired_time || "", 40),
    notes: clampText(metadata.notes || "", 120),
    total: typeof session.amount_total === "number" ? session.amount_total / 100 : 0,
    items: createTicketItems(lineItems),
    collectedAt: "",
    createdAt: new Date().toISOString()
  };
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
  const orderId = metadata.order_id || session.client_reference_id || createOrderId();
  const paymentMethod = metadata.payment_method === "cash" ? "Cash on collection" : "Card online";
  const paymentReference = session.id ? session.id.replace(/^cs_(test|live)_/, "") : "Not provided";

  const itemsMarkup = lineItems
    .map((item) => {
      const quantity = item.quantity || 1;
      const description = escapeHtml(item.description || "Menu item");
      const total = typeof item.amount_total === "number" ? (item.amount_total / 100).toFixed(2) : "0.00";
      return `<li><strong>${quantity} x ${description}</strong> - GBP ${total}</li>`;
    })
    .join("");

  const subject = `New order ${orderId} - ${metadata.customer_name || customerDetails.name || "Natural Hype customer"}`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #1d321f; line-height: 1.6;">
      <h1 style="margin-bottom: 8px;">New order received</h1>
      <p style="margin-top: 0;">A customer has placed a Natural Hype Juice and Jerk order.</p>
      <h2 style="margin-bottom: 8px;">Order</h2>
      <p>
        <strong>Order ID:</strong> ${escapeHtml(orderId)}<br />
        <strong>Payment:</strong> ${escapeHtml(paymentMethod)}<br />
        <strong>Total:</strong> GBP ${escapeHtml(amountTotal)}<br />
        <strong>Payment reference:</strong> ${escapeHtml(paymentReference)}
      </p>
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
        <strong>Notes:</strong> ${escapeHtml(metadata.notes || "None")}
      </p>
      <h2 style="margin-bottom: 8px;">Items</h2>
      <ul>${itemsMarkup || "<li>No items returned from the payment provider.</li>"}</ul>
    </div>
  `;

  return { subject, html };
}

function formatOrderLineItems(lineItems) {
  return lineItems
    .map((item) => {
      const quantity = item.quantity || 1;
      const description = clampText(item.description || "Menu item", 90);
      const total = typeof item.amount_total === "number" ? (item.amount_total / 100).toFixed(2) : "0.00";
      return `${quantity} x ${description} - GBP ${total}`;
    })
    .join("\n");
}

function buildBusinessMessage(session, lineItems) {
  const metadata = session.metadata || {};
  const customerDetails = session.customer_details || {};
  const orderId = metadata.order_id || session.client_reference_id || "NH-ORDER";
  const amountTotal = typeof session.amount_total === "number" ? (session.amount_total / 100).toFixed(2) : "0.00";
  const paymentMethod = metadata.payment_method === "cash" ? "Cash on collection" : "Card online";
  const itemsText = formatOrderLineItems(lineItems) || "No items returned.";

  return [
    `New Natural Hype order ${orderId}`,
    `Name: ${metadata.customer_name || customerDetails.name || "Not provided"}`,
    `Phone: ${metadata.phone || customerDetails.phone || "Not provided"}`,
    `Email: ${customerDetails.email || "Not provided"}`,
    `Payment: ${paymentMethod}`,
    `Time: ${metadata.desired_time || "Not provided"}`,
    `Service: ${metadata.service_mode || "Not provided"}`,
    `Notes: ${metadata.notes || "None"}`,
    `Total: GBP ${amountTotal}`,
    "Items:",
    itemsText
  ].join("\n");
}

async function sendBusinessMessage(session, lineItems) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !BUSINESS_PHONE_NUMBER) {
    return null;
  }

  const body = new URLSearchParams({
    To: BUSINESS_PHONE_NUMBER,
    From: TWILIO_FROM_NUMBER,
    Body: buildBusinessMessage(session, lineItems)
  });

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const message = data && data.message ? data.message : "Business phone alert could not be sent.";
    throw new Error(message);
  }

  return data;
}

async function sendRestaurantEmail(session, lineItems) {
  if (!isEmailConfigured()) {
    return null;
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

async function sendTestEmail() {
  if (!isEmailConfigured()) {
    return null;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [RESTAURANT_EMAIL],
      subject: "Natural Hype email test",
      html: `
        <div style="font-family: Arial, sans-serif; color: #1d321f; line-height: 1.6;">
          <h1>Email test</h1>
          <p>This is a Natural Hype test email from the website server.</p>
          <p>If this arrived, Render can reach Resend and the sender is accepted.</p>
        </div>
      `
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data && data.message ? data.message : "Test email could not be sent.";
    throw new Error(message);
  }

  return data;
}

function buildOwnerOrderEmail(order, title = "Owner order update") {
  const itemsMarkup = Array.isArray(order.items)
    ? order.items
        .map((item) => {
          const quantity = item.quantity || 1;
          const description = escapeHtml(item.name || "Menu item");
          const total = Number(item.lineTotal || 0).toFixed(2);
          return `<li><strong>${quantity} x ${description}</strong> - GBP ${total}</li>`;
        })
        .join("")
    : "";
  const paymentMethod = order.paymentMethod === "cash" ? "Cash on collection" : "Card online";
  const subject = `${title} ${order.orderId} - ${order.customerName || "Natural Hype customer"}`;

  return {
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1d321f; line-height: 1.6;">
        <h1 style="margin-bottom: 8px;">${escapeHtml(title)}</h1>
        <p style="margin-top: 0;">Natural Hype owner order record.</p>
        <h2 style="margin-bottom: 8px;">Order</h2>
        <p>
          <strong>Order ID:</strong> ${escapeHtml(order.orderId)}<br />
          <strong>Status:</strong> ${escapeHtml(order.status || "Order received")}<br />
          <strong>Payment:</strong> ${escapeHtml(paymentMethod)}<br />
          <strong>Total:</strong> GBP ${Number(order.total || 0).toFixed(2)}<br />
          <strong>Collected:</strong> ${escapeHtml(order.collectedAt || "No")}
        </p>
        <h2 style="margin-bottom: 8px;">Customer</h2>
        <p>
          <strong>Name:</strong> ${escapeHtml(order.customerName || "Not provided")}<br />
          <strong>Phone:</strong> ${escapeHtml(order.customerPhone || "Not provided")}<br />
          <strong>Email:</strong> ${escapeHtml(order.customerEmail || "Not provided")}
        </p>
        <h2 style="margin-bottom: 8px;">Order details</h2>
        <p>
          <strong>Service:</strong> ${escapeHtml(order.serviceMode || "Not provided")}<br />
          <strong>Requested time:</strong> ${escapeHtml(order.desiredTime || "Not provided")}<br />
          <strong>Notes:</strong> ${escapeHtml(order.notes || "None")}
        </p>
        <h2 style="margin-bottom: 8px;">Items</h2>
        <ul>${itemsMarkup || "<li>No items saved.</li>"}</ul>
      </div>
    `
  };
}

async function sendOwnerOrderEmail(order, title) {
  if (!isEmailConfigured()) {
    return null;
  }

  const email = buildOwnerOrderEmail(order, title);
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
    const message = data && data.message ? data.message : "Owner email could not be sent.";
    throw new Error(message);
  }

  return data;
}

async function sendOrderNotifications(session, lineItems) {
  const results = {
    emailSent: false,
    phoneAlertSent: false,
    errors: []
  };

  try {
    const email = await sendRestaurantEmail(session, lineItems);
    results.emailSent = Boolean(email);
  } catch (error) {
    results.errors.push(`Email alert failed: ${error.message}`);
    console.error("Restaurant email failed:", error.message);
  }

  try {
    const phoneAlert = await sendBusinessMessage(session, lineItems);
    results.phoneAlertSent = Boolean(phoneAlert);
  } catch (error) {
    results.errors.push(`Business phone alert failed: ${error.message}`);
    console.error("Business phone alert failed:", error.message);
  }

  return results;
}

async function handleSuccessfulCheckout(session) {
  if (!session || !session.id) {
    throw new Error("Checkout session payload is missing.");
  }

  if (hasOrderBeenFulfilled(session.id)) {
    return;
  }

  const lineItems = await fetchCheckoutLineItems(session.id);
  const notifications = await sendOrderNotifications(session, lineItems);
  const orderId = session.metadata?.order_id || session.client_reference_id || session.id;
  saveOrderRecord(orderId, buildStoredOrder(session, lineItems, "paid"));
  markOrderFulfilled(session.id, {
    email: notifications.emailSent ? RESTAURANT_EMAIL : "",
    phoneAlertSent: notifications.phoneAlertSent
  });
}

function buildStripeParams(payload, origin) {
  const params = new URLSearchParams();
  const { cartItems = [], customer = {}, service = {}, payment = {} } = payload;
  const orderId = createOrderId();
  const customerName = clampText(customer.name, 80);
  const lineItems = [];

  cartItems.forEach((item) => {
    const quantity = Math.max(1, Number(item.quantity || 1));
    const price = Number(item.price || 0);

    if (!item.name || !Number.isFinite(price) || price <= 0) {
      return;
    }

    const riceLabel = typeof item.rice === "string" ? item.rice : "";

    lineItems.push({
      name: clampText(item.name, 80),
      variant: clampText(
        [item.optionLabel || "", riceLabel].filter(Boolean).join(" • "),
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
  params.set("client_reference_id", orderId);
  params.set(
    "success_url",
    `${origin}/order-confirmation.html?order=${encodeURIComponent(orderId)}&name=${encodeURIComponent(customerName)}&payment=card`
  );
  params.set("cancel_url", `${origin}/checkout.html?checkout=cancelled`);
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

  params.set("metadata[order_id]", orderId);
  params.set("metadata[customer_name]", customerName);
  params.set("metadata[phone]", clampText(customer.phone, 40));
  params.set("metadata[payment_method]", clampText(payment.method || "card", 20));
  params.set("metadata[service_mode]", clampText(service.mode, 20));
  params.set("metadata[desired_time]", clampText(service.desiredTime, 40));
  params.set("metadata[address]", clampText(service.address, 120));
  params.set("metadata[notes]", clampText(service.notes, 120));

  return { params, orderId, customerName, lineItems };
}

function buildCashOrderSession(payload) {
  const { cartItems = [], customer = {}, service = {}, payment = {} } = payload;
  const orderId = createOrderId();
  const lineItems = [];
  let amountTotal = 0;

  cartItems.forEach((item) => {
    const quantity = Math.max(1, Number(item.quantity || 1));
    const price = Number(item.price || 0);

    if (!item.name || !Number.isFinite(price) || price <= 0) {
      return;
    }

    const riceLabel = typeof item.rice === "string" ? item.rice : "";
    const label = [item.name, item.optionLabel || "", riceLabel].filter(Boolean).join(" - ");
    const amount = formatAmount(price) * quantity;
    amountTotal += amount;

    lineItems.push({
      quantity,
      description: clampText(label, 120),
      amount_total: amount
    });
  });

  const serviceFee = Number(service.fee || 0);
  if (Number.isFinite(serviceFee) && serviceFee > 0) {
    const amount = formatAmount(serviceFee);
    amountTotal += amount;
    lineItems.push({
      quantity: 1,
      description: `${clampText(service.mode || "Service", 20)} fee`,
      amount_total: amount
    });
  }

  if (!lineItems.length) {
    throw new Error("Cart is empty");
  }

  return {
    orderId,
    lineItems,
    session: {
      id: "",
      client_reference_id: orderId,
      amount_total: amountTotal,
      metadata: {
        order_id: orderId,
        customer_name: clampText(customer.name, 80),
        phone: clampText(customer.phone, 40),
        payment_method: clampText(payment.method || "cash", 20),
        service_mode: clampText(service.mode, 20),
        desired_time: clampText(service.desiredTime, 40),
        address: clampText(service.address, 120),
        notes: clampText(service.notes, 120)
      },
      customer_details: {
        email: clampText(customer.email, 80),
        phone: clampText(customer.phone, 40),
        name: clampText(customer.name, 80)
      }
    }
  };
}

async function createStripeCheckoutSession(payload, origin) {
  const { params, orderId, customerName, lineItems } = buildStripeParams(payload, origin);
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
    throw new Error("Payment checkout could not be created.");
  }

  saveOrderRecord(orderId, {
    orderId,
    status: "pending_card_payment",
    paymentMethod: "card",
    stripeSessionId: data.id || "",
    customerName,
    customerPhone: clampText(payload.customer?.phone, 40),
    customerEmail: clampText(payload.customer?.email, 80),
    serviceMode: clampText(payload.service?.mode, 20),
    desiredTime: clampText(payload.service?.desiredTime, 40),
    notes: clampText(payload.service?.notes, 120),
    total: lineItems.reduce((sum, item) => sum + (item.unitAmount * item.quantity) / 100, 0),
    items: lineItems.map((item) => ({
      quantity: item.quantity,
      name: clampText([item.name, item.variant].filter(Boolean).join(" - "), 120),
      lineTotal: (item.unitAmount * item.quantity) / 100
    })),
    createdAt: new Date().toISOString()
  });

  return {
    ...data,
    orderId,
    customerName
  };
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
      emailReady: isEmailConfigured(),
      emailSender: MAIL_FROM ? "configured" : "missing",
      emailSenderMode: MAIL_FROM.includes("@resend.dev") ? "resend-dev-testing" : "custom-domain",
      emailRecipient: RESTAURANT_EMAIL ? "configured" : "missing",
      phoneAlertReady: Boolean(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && BUSINESS_PHONE_NUMBER)
    });
    return;
  }

  if (request.method === "GET" && parsedUrl.pathname.startsWith("/api/orders/")) {
    const orderId = decodeURIComponent(parsedUrl.pathname.replace("/api/orders/", ""));
    const order = getOrderRecord(orderId);

    if (!order) {
      sendJson(response, 404, {
        valid: false,
        error: "Order ticket was not found."
      });
      return;
    }

    sendJson(response, 200, {
      valid: true,
      order
    });
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/admin/login") {
    try {
      const payload = await parseBody(request);
      const pin = String(payload.pin || "");

      if (!ADMIN_PIN || pin !== ADMIN_PIN) {
        sendAdminUnauthorized(response);
        return;
      }

      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie": `${ADMIN_COOKIE_NAME}=${encodeURIComponent(createAdminSessionToken())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`
      });
      response.end(JSON.stringify({ ok: true }));
    } catch (error) {
      sendJson(response, 400, {
        error: "Owner login failed."
      });
    }
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/admin/logout") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${ADMIN_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
    });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/admin/test-email") {
    if (!isAdminRequest(request)) {
      sendAdminUnauthorized(response);
      return;
    }

    try {
      const email = await sendTestEmail();
      sendJson(response, 200, {
        ok: true,
        emailSent: Boolean(email)
      });
    } catch (error) {
      sendJson(response, 500, {
        error: error.message || "Test email could not be sent."
      });
    }
    return;
  }

  if (request.method === "GET" && parsedUrl.pathname === "/api/admin/orders") {
    if (!isAdminRequest(request)) {
      sendAdminUnauthorized(response);
      return;
    }

    sendJson(response, 200, {
      orders: listOrderRecords()
    });
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname.startsWith("/api/admin/orders/")) {
    if (!isAdminRequest(request)) {
      sendAdminUnauthorized(response);
      return;
    }

    const actionPath = parsedUrl.pathname.replace("/api/admin/orders/", "");
    const [encodedOrderId, action] = actionPath.split("/");
    const orderId = decodeURIComponent(encodedOrderId || "");
    const order = getOrderRecord(orderId);

    if (!order) {
      sendJson(response, 404, {
        error: "Order ticket was not found."
      });
      return;
    }

    if (action === "email") {
      try {
        const email = await sendOwnerOrderEmail(order, "Owner order confirmation");
        sendJson(response, 200, {
          ok: true,
          emailSent: Boolean(email)
        });
      } catch (error) {
        sendJson(response, 500, {
          error: error.message || "Order email could not be sent."
        });
      }
      return;
    }

    if (action !== "collect") {
      sendJson(response, 404, {
        error: "Owner action was not found."
      });
      return;
    }

    const collectedOrder = saveOrderRecord(orderId, {
      ...order,
      status: "collected",
      collectedAt: new Date().toISOString()
    });
    try {
      await sendOwnerOrderEmail(collectedOrder, "Order collected");
    } catch (error) {
      console.error("Collected order email failed:", error.message);
    }

    sendJson(response, 200, {
      ok: true,
      order: collectedOrder
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
          error: "Online payment is not available right now."
        });
        return;
      }

      const session = await createStripeCheckoutSession(payload, origin);
      sendJson(response, 200, {
        mode: "stripe",
        url: session.url,
        id: session.id,
        orderId: session.orderId,
        customerName: session.customerName
      });
    } catch (error) {
      sendJson(response, 400, {
        error: error.message || "Checkout request failed."
      });
    }
    return;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/cash-order") {
    try {
      const payload = await parseBody(request);
      const cashOrder = buildCashOrderSession(payload);

      const notifications = await sendOrderNotifications(cashOrder.session, cashOrder.lineItems);
      saveOrderRecord(
        cashOrder.orderId,
        buildStoredOrder(cashOrder.session, cashOrder.lineItems, "cash_confirm_required")
      );
      markOrderFulfilled(cashOrder.orderId, {
        email: notifications.emailSent ? RESTAURANT_EMAIL : "",
        phoneAlertSent: notifications.phoneAlertSent,
        paymentMethod: "cash"
      });

      sendJson(response, 200, {
        mode: "cash",
        orderId: cashOrder.orderId,
        customerName: cashOrder.session.metadata.customer_name
      });
    } catch (error) {
      sendJson(response, 400, {
        error: error.message || "Cash order could not be sent."
      });
    }
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (parsedUrl.pathname === "/owner.html" && !hasAdminSession(request)) {
    sendRedirect(response, "/owner-login.html");
    return;
  }

  if (parsedUrl.pathname === "/owner-login.html" && hasAdminSession(request)) {
    sendRedirect(response, "/owner.html");
    return;
  }

  if (parsedUrl.pathname.endsWith(".bak") || parsedUrl.pathname.endsWith(".js.js")) {
    sendJson(response, 404, { error: "File not found" });
    return;
  }

  let filePath = path.resolve(PUBLIC_DIR, `.${parsedUrl.pathname}`);
  if (parsedUrl.pathname === "/") {
    filePath = path.resolve(PUBLIC_DIR, "index.html");
  }

  if (!filePath.startsWith(PUBLIC_DIR + path.sep) && filePath !== PUBLIC_DIR) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      sendFile(response, path.resolve(filePath, "index.html"));
      return;
    }

    sendFile(response, filePath);
  });
});

server.listen(PORT, () => {
  console.log(`Natural Hype Juice and Jerk is running at http://localhost:${PORT}`);
});

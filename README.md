# Natural Hype Juice and Jerk

Restaurant website code for Natural Hype Juice and Jerk with:

- branded landing page using the supplied logo
- full menu transcribed into product cards
- menu images and branded product cards
- add-to-cart and persistent browser cart
- pickup and dine-in checkout form
- Stripe hosted card payment flow
- optional restaurant email notifications after successful Stripe payment

## What to publish

Publish the full project as a Node app. The important runtime files are:

- `server.js`
- `public/index.html`
- `public/order.html`
- `public/checkout.html`
- `public/app.js`
- `public/styles.css`
- `public/assets/`

Do not upload `.env` to GitHub. Add the same secret values in your hosting provider's environment settings instead.

## Run locally

If you already have Node installed:

```bash
node server.js
```

If you want to use the bundled Codex runtime from this environment:

```powershell
C:\Users\jesti\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe server.js
```

Then open [http://localhost:3000](http://localhost:3000).

## Live card payments with Stripe

1. Copy `.env.example` values into your environment.
2. Create a `.env` file in the project root.
3. Set `STRIPE_SECRET_KEY` to your Stripe secret key.
4. Start the server.
5. Submit an order on the website. The checkout button will redirect the customer to Stripe Checkout for secure card payment.

## Restaurant email notifications after payment

The app can now notify the restaurant by email after Stripe confirms a successful checkout.

You need to configure:

- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESTAURANT_EMAIL`
- `MAIL_FROM`

Current restaurant inbox:

- `naturalhypejuiceandjerk@gmail.com`

Webhook endpoint to register in Stripe:

- `/api/stripe/webhook`

Recommended Stripe event:

- `checkout.session.completed`

For some delayed payment methods, Stripe also supports:

- `checkout.session.async_payment_succeeded`

The implementation follows Stripe's official webhook and Checkout fulfillment guidance:

- [Receive Stripe events in your webhook endpoint](https://docs.stripe.com/webhooks)
- [Fulfill orders after Checkout payment](https://docs.stripe.com/checkout/fulfillment)
- [Retrieve a Checkout Session's line items](https://docs.stripe.com/api/checkout/sessions/line_items)

Email delivery is set up against Resend's official send-email API:

- [Resend send email API](https://resend.com/docs/api-reference/emails)

How it works:

1. Customer pays through Stripe Checkout.
2. Stripe sends the success event to your webhook.
3. The server verifies the Stripe signature.
4. The server fetches the paid line items from Stripe.
5. The server emails the restaurant with the paid order details.

## Fast publish option

This project now includes `render.yaml`, so a Node host like Render can run it directly.

Typical deploy flow:

1. Upload this project to GitHub.
2. Create a new web service on Render from the repo.
3. Render will read `render.yaml` and create the service settings automatically.
4. In Render, add your live `STRIPE_SECRET_KEY`.
5. In Stripe, add a webhook pointing to `https://your-render-domain/api/stripe/webhook`.
6. Copy the Stripe webhook signing secret into Render as `STRIPE_WEBHOOK_SECRET`.
7. If you want paid-order emails, add `RESEND_API_KEY` and use a valid `MAIL_FROM` sender.
8. Deploy and place a real payment test on the live site.

## Pre-launch check

After deployment, open:

```text
https://your-domain.com/api/health
```

The response should show:

```json
{
  "ok": true,
  "stripeEnabled": true,
  "webhookReady": true,
  "emailReady": true
}
```

If GoDaddy owns the domain, point the GoDaddy DNS records to Render. Render runs the app; GoDaddy only connects the domain.

Stripe Checkout setup is based on the current official Checkout Sessions API:

- [Create a Checkout Session](https://docs.stripe.com/api/checkout/sessions/create)

## Notes

- The menu names and prices are set in the front-end menu data.
- The checkout uses GBP because the menu prices are in pounds.

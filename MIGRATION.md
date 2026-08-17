# The White Butterflies — Mollie Hosted Checkout + Catalog Upgrade

**This ZIP supersedes the previous `twb-catalog-eu-payment-upgrade.zip`.**
The previous ZIP was not implemented, so this bundle already includes those changes plus the new Mollie-hosted payment architecture.

## New payment flow

### When shipping is already known
The website shows one button:

`Proceed to secure payment`

Apps Script creates a Mollie Payment **without a `method` parameter**.
The customer is then redirected to Mollie's hosted checkout, where Mollie shows the payment methods enabled in your Mollie account and relevant to the checkout.

Our website does not collect:
- card numbers;
- online-banking credentials;
- PayPal credentials;
- direct-bank-transfer credentials.

### When shipping is not known
No payment is created.
The customer submits a shipping quote request.
You calculate the real shipping charge and then send a secure Mollie Payment Link.

## Shipping configuration

`catalog.js` currently contains:

```js
"countryRates": {
  "NL": 6.96
}
```

So today:
- Netherlands -> exact shipping -> Mollie Hosted Checkout.
- Other EU countries -> shipping quote first.

When you know a reliable rate for another country, add it:

```js
"countryRates": {
  "NL": 6.96,
  "BE": 10.50,
  "DE": 11.25
}
```

Then Belgium and Germany can also proceed directly to Mollie with the correct final total.

## Payment methods

The code intentionally does **not** hard-code a payment method.

In Mollie, enable the methods you actually want to offer, for example:
- iDEAL;
- Bancontact;
- credit/debit cards;
- Pay by Bank;
- PayPal;
- bank transfer.

Mollie's hosted checkout handles the selection and sensitive payment UI.

## catalog.js

It is now the public catalog source of truth for:
- product prices;
- product names;
- volume/concentration;
- quiz data;
- sample/discovery pricing;
- CHASKA;
- shipping rates.

Apps Script fetches the **published** `catalog.js` before creating a payment, so it does not trust a browser-edited price.

## Owner email status replies

Your original order email thread can receive one reply per status:
- PAYMENT OPEN · AWAITING CUSTOMER
- PAYMENT PENDING · WAIT
- PAYMENT AUTHORIZED · WAIT FOR PAID
- PAYMENT CREATION FAILED · CHECK ORDER
- PAYMENT FAILED · DO NOT PREPARE
- PAYMENT CANCELLED · DO NOT PREPARE
- PAYMENT EXPIRED · DO NOT PREPARE
- PAYMENT CONFIRMED · START PREPARING

Duplicate notifications for the same status are suppressed.

## Paid customer email

When Mollie reports `paid`:
- your original order email gets the `START PREPARING` reply;
- the customer gets the branded order-confirmation email;
- the invoice PDF is attached;
- `order-confirmed.html` shows the Download Invoice button.

---

# Files to add / replace

Add:
- `catalog.js`
- `order-requested.html`

Replace:
- Apps Script `Code.gs`
- `index.html`
- `cart.js`
- `checkout.html`
- `order-confirmed.html`
- `quiz.html`
- all six HTML files inside `products/`

# Before pushing

Search these files for:

`PASTE_YOUR_CURRENT_APPS_SCRIPT_EXEC_URL_HERE`

Replace that with your current Apps Script `/exec` URL in:
- `checkout.html`
- `order-confirmed.html`
- `quiz.html`

Also verify the Apps Script URL inside the contact form in `index.html`.

Keep `MOLLIE_API_KEY` only in:
Apps Script -> Project Settings -> Script Properties

Never put it into GitHub.

# Deployment order

1. Put your current Apps Script `/exec` URL into the website files.
2. Push the website files to GitHub.
3. Confirm this loads publicly:
   `https://pranavdj09-pixel.github.io/thewhitebutterflies/catalog.js`
4. Replace Apps Script `Code.gs`.
5. Save.
6. If Gmail thread permission has not yet been granted, manually run:
   `authorizeOrderThreadReplies`
7. Deploy -> Manage deployments -> Edit -> New version -> Deploy.
8. If the `/exec` URL changed, update the website files and push again.

# Mollie setup

Enable the payment methods you actually want in your Mollie dashboard.
The website will not show its own card/bank form.

# Tests

## Netherlands
- shipping = €6.96;
- button = Proceed to secure payment;
- Mollie hosted payment-selection page opens;
- choose any enabled test payment method;
- verify status emails, webhook updates, customer confirmation and invoice.

## Failed/cancelled/open
Use fresh test orders and verify the same internal email thread receives the appropriate status reply.

## EU without configured rate
Choose a country not present in `countryRates`.
No Mollie payment should be created.
The customer should get a shipping-quote acknowledgement instead.

## Future EU fixed rate
Add a temporary fixed shipping rate for an EU country in `catalog.js`.
That country should then go directly to Mollie's hosted payment-selection checkout.

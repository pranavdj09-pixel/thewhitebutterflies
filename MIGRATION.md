# The White Butterflies — Mollie Payment Choice + Return-to-Site Upgrade

This ZIP supersedes both earlier catalog/payment ZIPs.

## Why this version exists

Mollie's documented Hosted Checkout behaviour is:

- if you create a payment without choosing one specific method,
  Mollie shows its payment-method chooser;
- if a payment attempt fails or is cancelled while multiple methods are
  available, Mollie sends the customer back to that chooser;
- Mollie documents that this retry behaviour cannot be disabled.

You asked for the opposite behaviour:
after an attempt, successful or not, leave Mollie and come back to
The White Butterflies.

Therefore this version puts ONLY THE PAYMENT-METHOD CHOICE on our checkout.

Example:

- iDEAL
- Credit / debit card
- PayPal
- Bancontact
- Pay by Bank
- Bank transfer via Mollie

The customer does NOT enter:
- card number;
- CVV;
- bank username/password;
- PayPal login;
- bank-transfer credentials

on our website.

After they choose a method, Apps Script creates the Mollie payment with one
specific `method`. Mollie then hosts the actual payment screen.

## Redirect behaviour

PAID:
Mollie -> order-confirmed.html -> paid confirmation/invoice.

FAILED:
Mollie -> order-confirmed.html -> Payment failed -> Retry payment.

CANCELLED:
Mollie -> order-confirmed.html -> Payment cancelled -> Retry payment.

EXPIRED:
The webhook/status check records expired. If the customer returns to the order
status page, it shows Payment expired.

OPEN/PENDING/AUTHORIZED:
The order-confirmed page shows that Mollie is still confirming/waiting.
It does not start fulfilment.

## Dynamic payment methods

The checkout does not blindly hard-code enabled methods.

Apps Script calls Mollie's:
GET /v2/methods

using:
- the secure server-side order total;
- EUR;
- the customer's billing country.

Mollie returns the methods currently available for the profile/amount/country.

We then filter that list to the methods you currently want to permit in
catalog.js:

```js
"allowedMethods": [
  "ideal",
  "bancontact",
  "creditcard",
  "paybybank",
  "paypal",
  "banktransfer"
]
```

If you decide you do not want one of those, remove it from this array.

## Shipping

Shipping behaviour is unchanged:

```js
"countryRates": {
  "NL": 6.96
}
```

Known rate:
checkout can calculate final total and offer payment methods.

Unknown rate:
no Mollie payment is created.
The customer submits a shipping quote request and pays later through a secure
Mollie Payment Link after you calculate shipping.

## catalog.js must be published

Apps Script reads the published catalog for secure prices and shipping.

It must be available at:

https://pranavdj09-pixel.github.io/thewhitebutterflies/catalog.js

before payment creation works.

## Files

ADD:
- catalog.js
- order-requested.html

REPLACE:
- index.html
- cart.js
- checkout.html
- order-confirmed.html
- quiz.html
- six product pages
- Apps Script Code.gs

## Apps Script URL placeholders

Search for:

PASTE_YOUR_CURRENT_APPS_SCRIPT_EXEC_URL_HERE

and replace it with your real `/exec` URL in:
- checkout.html
- order-confirmed.html
- quiz.html

Verify index.html also uses the correct Apps Script URL for its contact form.

## Deployment order

1. Put current /exec URL into website files.
2. Push website files, INCLUDING catalog.js, to GitHub.
3. Confirm catalog.js opens publicly.
4. Replace Apps Script Code.gs.
5. Save.
6. Run authorizeOrderThreadReplies once if Gmail permission has not yet been granted.
7. Deploy -> Manage deployments -> Edit -> New version -> Deploy.
8. Test with Mollie test mode.

## Expected test

Netherlands:
- shipping €6.96;
- payment methods load from Mollie;
- choose ONE method on The White Butterflies;
- click Continue securely;
- actual payment happens at Mollie;
- cancel/fail -> back to The White Butterflies;
- paid -> back to The White Butterflies;
- only paid triggers fulfilment/customer paid confirmation/invoice.

// ============================================================
// THE WHITE BUTTERFLIES — SHARED CART
//
// Put this file in the SAME folder as index.html
//
// index.html:
//   <script src="./cart.js"></script>
//
// product pages inside /products:
//   <script src="../cart.js"></script>
// ============================================================

(() => {
  const CART_KEY = 'twb_cart_v1';
  const SHIPPING_FLAT = 6.96;

  // This lets cart.js reliably find index.html
  // whether it is loaded from the homepage
  // or from a page inside /products.
  const scriptURL = document.currentScript
    ? new URL(document.currentScript.src)
    : new URL('cart.js', window.location.href);

  const SITE_ROOT = new URL('./', scriptURL);
  const CHECKOUT_URL = new URL('checkout.html', SITE_ROOT).href;

  // ------------------------------------------------------------
  // GLOBAL HELPERS
  // ------------------------------------------------------------

  window.$ =
    window.$ ||
    ((selector, context = document) =>
      context.querySelector(selector));

  window.$$ =
    window.$$ ||
    ((selector, context = document) =>
      Array.from(context.querySelectorAll(selector)));

  window.formatEUR =
    window.formatEUR ||
    function formatEUR(number) {
      return '€' + Number(number).toFixed(2);
    };

  // ------------------------------------------------------------
  // CART DATA
  // ------------------------------------------------------------

  window.cart = {
    items: [],

    load() {
      try {
        this.items = JSON.parse(
          localStorage.getItem(CART_KEY) || '[]'
        );

        if (!Array.isArray(this.items)) {
          this.items = [];
        }
      } catch (error) {
        console.warn('Could not load cart:', error);
        this.items = [];
      }
    },

    save() {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(this.items)
      );

      window.updateCartUI();
    },

    add(product) {
      const existing = this.items.find(
        item => item.id === product.id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        this.items.push({
          ...product,
          price: Number(product.price),
          qty: 1
        });
      }

      this.save();
    },

    remove(id) {
      this.items = this.items.filter(
        item => item.id !== id
      );

      this.save();
    },

    setQty(id, qty) {
      const item = this.items.find(
        item => item.id === id
      );

      if (!item) return;

      qty = Number(qty);

      if (qty <= 0) {
        this.remove(id);
        return;
      }

      item.qty = Math.floor(qty);
      this.save();
    },

    totals() {
      const subtotal = this.items.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
          Number(item.qty),
        0
      );

      const shipping =
        this.items.length
          ? SHIPPING_FLAT
          : 0;

      const vat = 0;

      const total =
        subtotal +
        shipping +
        vat;

      return {
        subtotal,
        shipping,
        vat,
        total
      };
    }
  };

  // ------------------------------------------------------------
  // CREATE CART DRAWER IF PAGE DOESN'T ALREADY HAVE ONE
  // ------------------------------------------------------------

  function ensureCartDrawer() {
    if (
      document.getElementById('cartDrawer')
    ) {
      return;
    }

    const drawer =
      document.createElement('aside');

    drawer.id = 'cartDrawer';

    drawer.className =
      'fixed top-0 right-0 h-full w-full sm:w-[420px] ' +
      'bg-white shadow-2xl translate-x-full ' +
      'transition-transform duration-300 z-[60]';

    drawer.innerHTML = `
      <div class="flex items-center justify-between p-4 border-b">

        <h3 class="font-serif text-2xl">
          Your Bag
        </h3>

        <button
          id="closeCart"
          type="button"
          class="text-butterfly-600 hover:text-butterfly-900"
        >
          Close
        </button>

      </div>

      <div
        id="cartItems"
        class="p-4 divide-y max-h-[60vh] overflow-auto"
      >
      </div>

      <div class="p-4 border-t space-y-3">

        <div class="flex items-center justify-between">
          <span>Subtotal</span>
          <span id="cartSubtotal">
            €0.00
          </span>
        </div>

        <div
          class="flex items-center justify-between text-sm text-butterfly-500"
        >
          <span>Shipping</span>
          <span id="cartShipping">
            Calculated at checkout
          </span>
        </div>

        <div
          class="flex items-center justify-between font-medium text-lg"
        >
          <span>Total</span>
          <span id="cartTotal">
            €0.00
          </span>
        </div>

        <button
          id="toCheckout"
          type="button"
          class="block w-full text-center px-4 py-3 rounded-full bg-butterfly-900 text-white hover:opacity-90"
        >
          Proceed to Checkout
        </button>

      </div>
    `;

    document.body.appendChild(drawer);
  }

  // ------------------------------------------------------------
  // OPEN / CLOSE CART
  // ------------------------------------------------------------

  window.openCartDrawer =
    function openCartDrawer() {
      const drawer =
        document.getElementById(
          'cartDrawer'
        );

      if (drawer) {
        drawer.style.transform =
          'translateX(0)';
      }
    };

  window.closeCartDrawer =
    function closeCartDrawer() {
      const drawer =
        document.getElementById(
          'cartDrawer'
        );

      if (drawer) {
        drawer.style.transform =
          'translateX(100%)';
      }
    };

  // ------------------------------------------------------------
  // UPDATE CART UI
  // ------------------------------------------------------------

  window.updateCartUI =
    function updateCartUI() {

      // Update cart badge everywhere
      document
        .querySelectorAll(
          '#cartCount, [data-cart-count]'
        )
        .forEach(element => {

          element.textContent =
            window.cart.items.reduce(
              (sum, item) =>
                sum +
                Number(item.qty),
              0
            );
        });

      const list =
        document.getElementById(
          'cartItems'
        );

      if (!list) return;

      // Empty cart
      if (!window.cart.items.length) {

        list.innerHTML = `
          <p class="text-butterfly-500 p-4">
            Your bag is empty.
          </p>
        `;

      } else {

        list.innerHTML = '';

        window.cart.items.forEach(
          item => {

            const row =
              document.createElement(
                'div'
              );

            row.className =
              'py-3 flex items-center justify-between gap-3';

            row.innerHTML = `
              <div>

                <p class="font-medium">
                  ${item.name}
                </p>

                <p class="text-sm text-butterfly-500">
                  ${item.size || ''}
                </p>

                <div
                  class="mt-1 flex items-center gap-2 text-sm"
                >

                  <button
                    type="button"
                    class="px-2 border"
                    data-cart-action="dec"
                    data-cart-id="${item.id}"
                  >
                    −
                  </button>

                  <span>
                    ${item.qty}
                  </span>

                  <button
                    type="button"
                    class="px-2 border"
                    data-cart-action="inc"
                    data-cart-id="${item.id}"
                  >
                    +
                  </button>

                </div>
              </div>

              <div class="text-right">

                <p>
                  ${window.formatEUR(
                    Number(item.price) *
                    Number(item.qty)
                  )}
                </p>

                <button
                  type="button"
                  class="text-xs text-red-600 mt-1"
                  data-cart-action="remove"
                  data-cart-id="${item.id}"
                >
                  Remove
                </button>

              </div>
            `;

            list.appendChild(row);
          }
        );
      }

      const totals =
        window.cart.totals();

      const subtotal =
        document.getElementById(
          'cartSubtotal'
        );

      const total =
        document.getElementById(
          'cartTotal'
        );

      if (subtotal) {
        subtotal.textContent =
          window.formatEUR(
            totals.subtotal
          );
      }

      if (total) {
        total.textContent =
          window.formatEUR(
            totals.total
          );
      }
    };

  // ------------------------------------------------------------
  // CHECKOUT SUMMARY
  // ------------------------------------------------------------

  function renderCheckoutSummary() {

    const checkout =
      document.getElementById(
        'checkout'
      );

    const summary =
      document.getElementById(
        'summary'
      );

    if (!checkout || !summary) {
      return false;
    }

    if (!window.cart.items.length) {

      summary.innerHTML = `
        <p class="text-butterfly-500">
          Your bag is empty.
        </p>
      `;

      return false;
    }

    const totals =
      window.cart.totals();

    summary.innerHTML = [

      `<h3 class="font-medium mb-2">
        Order Summary
      </h3>`,

      `<ul class="space-y-1">`,

      ...window.cart.items.map(
        item => `
          <li>
            ${item.qty}
            ×
            ${item.name}
            —
            ${window.formatEUR(
              Number(item.price) *
              Number(item.qty)
            )}
          </li>
        `
      ),

      `</ul>`,

      `<p class="mt-3">
        Shipping (flat):
        ${window.formatEUR(
          totals.shipping
        )}
      </p>`,

      `<p class="font-medium text-lg mt-1">
        Total:
        ${window.formatEUR(
          totals.total
        )}
      </p>`

    ].join('');

    checkout.classList.remove(
      'hidden'
    );

    return true;
  }

  window.renderCheckoutSummary =
    renderCheckoutSummary;

  // ------------------------------------------------------------
  // GLOBAL CLICK HANDLING
  // ------------------------------------------------------------

  document.addEventListener(
    'click',
    event => {

      // --------------------------------
      // OPEN CART
      // --------------------------------

      const openButton =
        event.target.closest(
          '#openCart, [data-open-cart]'
        );

      if (openButton) {

        event.preventDefault();

        window.openCartDrawer();

        return;
      }

      // --------------------------------
      // CLOSE CART
      // --------------------------------

      if (
        event.target.closest(
          '#closeCart'
        )
      ) {

        event.preventDefault();

        window.closeCartDrawer();

        return;
      }

      // --------------------------------
      // ADD PRODUCT
      // --------------------------------

      const addButton =
        event.target.closest(
          '.add-to-cart, #addProduct, [data-add-to-cart]'
        );

      if (addButton) {

        event.preventDefault();

        const price =
          Number(
            addButton.dataset.price
          );

        if (
          !Number.isFinite(price)
        ) {

          console.error(
            'Invalid product price:',
            addButton.dataset.price
          );

          return;
        }

        window.cart.add({
          id:
            addButton.dataset.id,

          name:
            addButton.dataset.name,

          price,

          size:
            addButton.dataset.size ||
            ''
        });

        // Change text briefly
        if (
          addButton.id ===
          'addProduct'
        ) {

          const oldText =
            addButton.textContent;

          addButton.textContent =
            'Added to Cart';

          setTimeout(() => {

            addButton.textContent =
              oldText;

          }, 1000);
        }

        window.openCartDrawer();

        return;
      }

      // --------------------------------
      // CART QUANTITY / REMOVE
      // --------------------------------

      const cartAction =
        event.target.closest(
          '[data-cart-action]'
        );

      if (cartAction) {

        const id =
          cartAction.dataset.cartId;

        const item =
          window.cart.items.find(
            product =>
              product.id === id
          );

        if (!item) return;

        if (
          cartAction.dataset.cartAction ===
          'inc'
        ) {

          window.cart.setQty(
            id,
            Number(item.qty) + 1
          );
        }

        if (
          cartAction.dataset.cartAction ===
          'dec'
        ) {

          window.cart.setQty(
            id,
            Number(item.qty) - 1
          );
        }

        if (
          cartAction.dataset.cartAction ===
          'remove'
        ) {

          window.cart.remove(id);
        }

        return;
      }

      // --------------------------------
      // PROCEED TO CHECKOUT
      // --------------------------------

      if (
        event.target.closest(
          '#toCheckout'
        )
      ) {

        event.preventDefault();

        if (
          !window.cart.items.length
        ) {

          alert(
            'Your cart is empty. Please add an item before checking out.'
          );

          return;
        }

        window.closeCartDrawer();

        // If we're already on index.html
        if (
          document.getElementById(
            'checkout'
          )
        ) {

          if (
            renderCheckoutSummary()
          ) {

            document
              .getElementById(
                'checkout'
              )
              .scrollIntoView({
                behavior: 'smooth'
              });

            history.replaceState(
              null,
              '',
              '#checkout'
            );
          }

        } else {

          // If we're on a product page,
          // go back to index.html checkout.
          // The cart stays in localStorage.
          window.location.href =
            CHECKOUT_URL;
        }
      }
    }
  );

  // ------------------------------------------------------------
  // INITIALISE CART
  // ------------------------------------------------------------

  function initCart() {

    ensureCartDrawer();

    window.cart.load();

    window.updateCartUI();

    // If customer arrives at:
    // index.html#checkout
    // from a product page,
    // automatically show checkout.
    if (
      window.location.hash ===
        '#checkout' &&
      document.getElementById(
        'checkout'
      ) &&
      window.cart.items.length
    ) {

      renderCheckoutSummary();

      setTimeout(() => {

        document
          .getElementById(
            'checkout'
          )
          ?.scrollIntoView();

      }, 0);
    }

    const year =
      document.getElementById(
        'year'
      );

    if (year) {
      year.textContent =
        new Date().getFullYear();
    }
  }

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initCart
    );

  } else {

    initCart();
  }

})();
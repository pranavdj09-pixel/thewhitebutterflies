// ============================================================
// THE WHITE BUTTERFLIES — SHARED CART
//
// Load catalog.js BEFORE cart.js.
// ============================================================

(() => {
  const CART_KEY = 'twb_cart_v1';

  const scriptURL = document.currentScript
    ? new URL(document.currentScript.src)
    : new URL('cart.js', window.location.href);

  const SITE_ROOT = new URL('./', scriptURL);
  const CHECKOUT_URL = new URL('checkout.html', SITE_ROOT).href;

  window.$ = window.$ || ((sel, ctx = document) => ctx.querySelector(sel));
  window.$$ = window.$$ || ((sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)));

  window.formatEUR = window.formatEUR || function formatEUR(value) {
    return '€' + Number(value || 0).toFixed(2);
  };

  window.cart = {
    items: [],

    load() {
      try {
        const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        const source = Array.isArray(raw) ? raw : [];
        const merged = new Map();

        source.forEach(rawItem => {
          const id = window.TWB_resolveProductId
            ? window.TWB_resolveProductId(rawItem.id)
            : rawItem.id;

          const product = window.TWB_getProduct
            ? window.TWB_getProduct(id)
            : null;

          const item = {
            ...rawItem,
            id,
            name: product?.cartName || rawItem.name,
            price:
              product?.price !== null &&
              product?.price !== undefined
                ? Number(product.price)
                : Number(rawItem.price),
            size: product?.volume || rawItem.size || '',
            qty: Math.max(1, Number(rawItem.qty) || 1)
          };

          const existing = merged.get(id);

          if (existing) {
            existing.qty += item.qty;
          } else {
            merged.set(id, item);
          }
        });

        this.items = Array.from(merged.values());
        localStorage.setItem(CART_KEY, JSON.stringify(this.items));

      } catch (err) {
        console.warn('Could not load cart:', err);
        this.items = [];
      }
    },

    save() {
      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
      window.updateCartUI();
    },

    clear() {
      this.items = [];
      this.save();
    },

    add(prod) {
      const id = window.TWB_resolveProductId
        ? window.TWB_resolveProductId(prod.id)
        : prod.id;

      const product = window.TWB_getProduct
        ? window.TWB_getProduct(id)
        : null;

      const normalized = {
        ...prod,
        id,
        name: product?.cartName || prod.name,
        price:
          product?.price !== null &&
          product?.price !== undefined
            ? Number(product.price)
            : Number(prod.price),
        size: product?.volume || prod.size || ''
      };

      if (!Number.isFinite(normalized.price)) {
        throw new Error('Invalid product price for ' + id);
      }

      const found = this.items.find(item => item.id === id);

      if (found) {
        found.qty += 1;
        found.name = normalized.name;
        found.price = normalized.price;
        found.size = normalized.size;
      } else {
        this.items.push({
          ...normalized,
          qty: 1
        });
      }

      this.save();
    },

    remove(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.save();
    },

    setQty(id, qty) {
      const item = this.items.find(entry => entry.id === id);
      if (!item) return;

      const next = Math.floor(Number(qty));

      if (!Number.isFinite(next) || next <= 0) {
        this.remove(id);
        return;
      }

      item.qty = next;
      this.save();
    },

    totals(countryCode = '') {
      const subtotal = this.items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.qty),
        0
      );

      const shippingInfo =
        countryCode && window.TWB_getShipping
          ? window.TWB_getShipping(countryCode)
          : { mode: 'unknown', amount: null, label: 'Calculated at checkout' };

      const shipping =
        shippingInfo.mode === 'fixed'
          ? Number(shippingInfo.amount)
          : null;

      const total =
        shipping === null
          ? subtotal
          : subtotal + shipping;

      return {
        subtotal,
        shipping,
        shippingMode: shippingInfo.mode,
        shippingLabel: shippingInfo.label,
        vat: 0,
        total
      };
    }
  };


  function ensureCartDrawer() {
    if (document.getElementById('cartDrawer')) return;

    const drawer = document.createElement('aside');

    drawer.id = 'cartDrawer';
    drawer.className =
      'fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl translate-x-full transition-transform duration-300 z-[60]';

    drawer.innerHTML = `
      <div class="flex items-center justify-between p-4 border-b">
        <h3 class="font-serif text-2xl">Your Bag</h3>
        <button id="closeCart" type="button"
          class="text-butterfly-600 hover:text-butterfly-900">
          Close
        </button>
      </div>

      <div id="cartItems" class="p-4 divide-y max-h-[60vh] overflow-auto"></div>

      <div class="p-4 border-t space-y-3">
        <div class="flex items-center justify-between">
          <span>Subtotal</span>
          <span id="cartSubtotal">€0.00</span>
        </div>

        <div class="flex items-start justify-between gap-4 text-sm text-butterfly-500">
          <span>Shipping</span>
          <span id="cartShipping" class="text-right">
            €6.96 within NL · EU varies
          </span>
        </div>

        <div class="flex items-center justify-between font-medium text-lg">
          <span>Items subtotal</span>
          <span id="cartTotal">€0.00</span>
        </div>

        <button id="toCheckout" type="button"
          class="block w-full text-center px-4 py-3 rounded-full bg-butterfly-900 text-white hover:opacity-90">
          Proceed to Checkout
        </button>
      </div>
    `;

    document.body.appendChild(drawer);
  }


  window.openCartDrawer = function () {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.style.transform = 'translateX(0)';
  };

  window.closeCartDrawer = function () {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.style.transform = 'translateX(100%)';
  };


  window.updateCartUI = function () {
    document.querySelectorAll('#cartCount, [data-cart-count]').forEach(el => {
      el.textContent = window.cart.items.reduce(
        (sum, item) => sum + Number(item.qty),
        0
      );
    });

    const list = document.getElementById('cartItems');

    if (list) {
      if (!window.cart.items.length) {
        list.innerHTML =
          '<p class="text-butterfly-500 p-4">Your bag is empty.</p>';
      } else {
        list.innerHTML = '';

        window.cart.items.forEach(item => {
          const row = document.createElement('div');
          row.className = 'py-3 flex items-center justify-between gap-3';

          row.innerHTML = `
            <div>
              <p class="font-medium">${item.name}</p>
              <p class="text-sm text-butterfly-500">${item.size || ''}</p>

              <div class="mt-1 flex items-center gap-2 text-sm">
                <button type="button" class="px-2 border"
                  data-cart-action="dec" data-cart-id="${item.id}">−</button>
                <span>${item.qty}</span>
                <button type="button" class="px-2 border"
                  data-cart-action="inc" data-cart-id="${item.id}">+</button>
              </div>
            </div>

            <div class="text-right">
              <p>${window.formatEUR(Number(item.price) * Number(item.qty))}</p>
              <button type="button" class="text-xs text-red-600 mt-1"
                data-cart-action="remove" data-cart-id="${item.id}">
                Remove
              </button>
            </div>
          `;

          list.appendChild(row);
        });
      }
    }

    const subtotal = window.cart.totals().subtotal;

    document.querySelectorAll('#cartSubtotal, #cartTotal').forEach(el => {
      el.textContent = window.formatEUR(subtotal);
    });
  };


  document.addEventListener('click', event => {
    const openButton = event.target.closest('#openCart, [data-open-cart]');

    if (openButton) {
      event.preventDefault();
      window.openCartDrawer();
      return;
    }

    if (event.target.closest('#closeCart')) {
      event.preventDefault();
      window.closeCartDrawer();
      return;
    }

    const addButton = event.target.closest(
      '.add-to-cart, #addProduct, [data-add-to-cart]'
    );

    if (addButton) {
      event.preventDefault();

      const id = window.TWB_resolveProductId
        ? window.TWB_resolveProductId(addButton.dataset.id)
        : addButton.dataset.id;

      const product = window.TWB_getProduct
        ? window.TWB_getProduct(id)
        : null;

      if (product?.comingSoon) return;

      const price =
        product?.price !== null &&
        product?.price !== undefined
          ? Number(product.price)
          : Number(addButton.dataset.price);

      window.cart.add({
        id,
        name: product?.cartName || addButton.dataset.name,
        price,
        size: product?.volume || addButton.dataset.size || ''
      });

      if (addButton.id === 'addProduct') {
        const oldText = addButton.textContent;
        addButton.textContent = 'Added to Cart';
        setTimeout(() => {
          addButton.textContent = oldText;
        }, 900);
      }

      window.openCartDrawer();
      return;
    }

    const action = event.target.closest('[data-cart-action]');

    if (action) {
      const id = action.dataset.cartId;
      const item = window.cart.items.find(entry => entry.id === id);
      if (!item) return;

      if (action.dataset.cartAction === 'inc') {
        window.cart.setQty(id, Number(item.qty) + 1);
      } else if (action.dataset.cartAction === 'dec') {
        window.cart.setQty(id, Number(item.qty) - 1);
      } else if (action.dataset.cartAction === 'remove') {
        window.cart.remove(id);
      }

      return;
    }

    if (event.target.closest('#toCheckout')) {
      event.preventDefault();

      if (!window.cart.items.length) {
        alert('Your cart is empty. Please add an item before checking out.');
        return;
      }

      window.closeCartDrawer();
      window.location.href = CHECKOUT_URL;
    }
  });


  function init() {
    ensureCartDrawer();
    window.cart.load();
    window.updateCartUI();

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

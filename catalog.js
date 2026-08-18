// ============================================================
// THE WHITE BUTTERFLIES — CATALOG
//
// This is now the PUBLIC single source of truth for:
// - product names / prices / volume / concentration
// - quiz product data
// - trial/discovery prices
// - discount configuration
// - country shipping configuration
// - Mollie hosted-checkout configuration
//
// Apps Script also fetches THIS canonical published file before accepting
// a payment, so browser-edited prices are ignored.
// ============================================================

/* TWB_CATALOG_DATA_START */
window.TWB_CATALOG = {
  "version": "2026-08-17",
  "currency": "EUR",
  "shipping": {
    "countryRates": {
      "NL": 6.96
    },
    "euFallbackMode": "quote",
    "nlMessage": "€6.96 shipping within the Netherlands.",
    "euMessage": "Shipping outside the Netherlands is quoted separately and may vary by destination."
  },
  "payments": {
    "checkoutMode": "mollie_hosted",
    "methodSelection": "website_method_only",
    "sensitiveDataHandler": "mollie",
    "knownShipping": "create_payment",
    "unknownShipping": "quote_then_payment_link",
    "allowedMethods": [
      "ideal",
      "bancontact",
      "creditcard",
      "paybybank",
      "paypal",
      "banktransfer"
    ]
  },
  "discounts": {
    "CHASKA": {
      "rate": 0.05,
      "firstOrderOnly": true
    }
  },
  "offers": {
    "trial": {
      "id": "quiz-trial",
      "price": 5.99,
      "volume": "10 ml",
      "credit": 5.99
    },
    "discovery": {
      "id": "personal-discovery-3x5",
      "price": 15.99,
      "volume": "3 × 5 ml",
      "credit": 6.99
    }
  },
  "aliases": {
    "nostalgia-30": "nostalgia-100",
    "tears-of-a-rose-30": "tears-of-a-rose-100",
    "godfather-30": "godfather-100",
    "the-man-30": "the-man-100",
    "the-woman-30": "the-woman-100"
  },
  "euCountries": [
    {
      "code": "AT",
      "name": "Austria"
    },
    {
      "code": "BE",
      "name": "Belgium"
    },
    {
      "code": "BG",
      "name": "Bulgaria"
    },
    {
      "code": "HR",
      "name": "Croatia"
    },
    {
      "code": "CY",
      "name": "Cyprus"
    },
    {
      "code": "CZ",
      "name": "Czechia"
    },
    {
      "code": "DK",
      "name": "Denmark"
    },
    {
      "code": "EE",
      "name": "Estonia"
    },
    {
      "code": "FI",
      "name": "Finland"
    },
    {
      "code": "FR",
      "name": "France"
    },
    {
      "code": "DE",
      "name": "Germany"
    },
    {
      "code": "GR",
      "name": "Greece"
    },
    {
      "code": "HU",
      "name": "Hungary"
    },
    {
      "code": "IE",
      "name": "Ireland"
    },
    {
      "code": "IT",
      "name": "Italy"
    },
    {
      "code": "LV",
      "name": "Latvia"
    },
    {
      "code": "LT",
      "name": "Lithuania"
    },
    {
      "code": "LU",
      "name": "Luxembourg"
    },
    {
      "code": "MT",
      "name": "Malta"
    },
    {
      "code": "NL",
      "name": "Netherlands"
    },
    {
      "code": "PL",
      "name": "Poland"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "RO",
      "name": "Romania"
    },
    {
      "code": "SK",
      "name": "Slovakia"
    },
    {
      "code": "SI",
      "name": "Slovenia"
    },
    {
      "code": "ES",
      "name": "Spain"
    },
    {
      "code": "SE",
      "name": "Sweden"
    }
  ],
  "products": {
    "nostalgia-100": {
      "quizId": "nostalgia",
      "name": "Nostalgia",
      "cartName": "Nostalgia — Eau de Parfum 100 ml",
      "concentration": "EDP",
      "concentrationLong": "Eau de Parfum",
      "volume": "100 ml",
      "price": 59.99,
      "collection": "white-butterflies",
      "page": "products/nostalgia-no-7.html",
      "image": "Nostalgia.png",
      "comingSoon": false,
      "quiz": {
        "direction": "feminine",
        "match": "Your choices lean toward warmth, intimacy and emotional depth. Nostalgia is woody, warm and quietly familiar, with jasmine air, cashmere woods, vanilla and dry cedar.",
        "scores": {
          "feeling": {
            "warm": 4,
            "fresh": 0,
            "bold": 1
          },
          "setting": {
            "evening": 4,
            "daylight": 0,
            "night": 2
          },
          "energy": {
            "day": 0,
            "night": 2,
            "both": 3
          },
          "season": {
            "spring": 1,
            "summer": 0,
            "autumn": 4,
            "winter": 3
          }
        }
      }
    },
    "k-100": {
      "quizId": "k",
      "name": "K.",
      "cartName": "K. — Eau de Parfum 100 ml",
      "concentration": "EDP",
      "concentrationLong": "Eau de Parfum",
      "volume": "100 ml",
      "price": 59.99,
      "collection": "white-butterflies",
      "page": "products/K.html",
      "image": "K.png",
      "comingSoon": false,
      "quiz": {
        "direction": "feminine",
        "match": "Your choices point toward something darker, sweeter and more magnetic. Dark chocolate, white musk and Indonesian patchouli sit over vanilla and sandalwood, with lemon keeping a little light above the darkness.",
        "scores": {
          "feeling": {
            "warm": 2,
            "fresh": 0,
            "bold": 5
          },
          "setting": {
            "evening": 3,
            "daylight": 0,
            "night": 5
          },
          "energy": {
            "day": 0,
            "night": 5,
            "both": 2
          },
          "season": {
            "spring": 0,
            "summer": 1,
            "autumn": 3,
            "winter": 5
          }
        }
      }
    },
    "tears-of-a-rose-100": {
      "quizId": "tears",
      "name": "Tears of A Rose",
      "cartName": "Tears of A Rose — Eau de Parfum 100 ml",
      "concentration": "EDP",
      "concentrationLong": "Eau de Parfum",
      "volume": "100 ml",
      "price": 59.99,
      "collection": "white-butterflies",
      "page": "products/tears-of-a-rose.html",
      "image": "Tears of A Rose.png",
      "comingSoon": false,
      "quiz": {
        "direction": "feminine",
        "match": "Your choices have a softer, more luminous emotional character. Watery rose, white musks and vanillin sit against a slightly bitter rose edge and skin-like warmth.",
        "scores": {
          "feeling": {
            "warm": 3,
            "fresh": 3,
            "bold": 1
          },
          "setting": {
            "evening": 3,
            "daylight": 4,
            "night": 1
          },
          "energy": {
            "day": 3,
            "night": 1,
            "both": 4
          },
          "season": {
            "spring": 5,
            "summer": 3,
            "autumn": 2,
            "winter": 1
          }
        }
      }
    },
    "godfather-100": {
      "quizId": "godfather",
      "name": "The Godfather (No. 1)",
      "cartName": "The Godfather (No. 1) — Eau de Toilette 100 ml",
      "concentration": "EDT",
      "concentrationLong": "Eau de Toilette",
      "volume": "100 ml",
      "price": 64.99,
      "collection": "numbered",
      "page": "products/the-godfather-no-1.html",
      "image": "The Godfather.png",
      "comingSoon": false,
      "quiz": {
        "direction": "masculine",
        "match": "The Godfather is the darker masculine structure in the house: bergamot over leather, spice and woods, grounded by amber, vanilla and resin.",
        "scores": {
          "feeling": {
            "warm": 4,
            "fresh": 0,
            "bold": 5
          },
          "setting": {
            "evening": 4,
            "daylight": 0,
            "night": 5
          },
          "energy": {
            "day": 0,
            "night": 5,
            "both": 3
          },
          "season": {
            "spring": 1,
            "summer": 0,
            "autumn": 5,
            "winter": 5
          }
        }
      }
    },
    "the-man-100": {
      "quizId": "no111",
      "name": "No. 111",
      "cartName": "No. 111 — Eau de Parfum 100 ml",
      "concentration": "EDP",
      "concentrationLong": "Eau de Parfum",
      "volume": "100 ml",
      "price": 74.99,
      "collection": "numbered",
      "page": "products/the-man.html",
      "image": "The Man.png",
      "comingSoon": false,
      "quiz": {
        "direction": "masculine",
        "match": "No. 111 is the fresher masculine structure in the house: bergamot and lemon with clary sage, vetiver and leather, drying into ambroxan and skin-like warmth.",
        "scores": {
          "feeling": {
            "warm": 1,
            "fresh": 5,
            "bold": 2
          },
          "setting": {
            "evening": 1,
            "daylight": 5,
            "night": 1
          },
          "energy": {
            "day": 5,
            "night": 0,
            "both": 4
          },
          "season": {
            "spring": 4,
            "summer": 5,
            "autumn": 1,
            "winter": 0
          }
        }
      }
    },
    "the-woman-100": {
      "quizId": "no2309",
      "name": "No. 2309",
      "cartName": "No. 2309 — Extrait 100 ml",
      "concentration": "Extrait",
      "concentrationLong": "Extrait",
      "volume": "100 ml",
      "price": 74.99,
      "collection": "numbered",
      "page": "products/the-woman-no-2309.html",
      "image": "The Woman 100 ml.png",
      "comingSoon": false,
      "quiz": {
        "direction": "feminine",
        "match": "Your choices land between brightness and richness. Lemon and jammy red fruit open into jasmine, cashmere, rosy amber, white musks, vanilla and ambroxan.",
        "scores": {
          "feeling": {
            "warm": 3,
            "fresh": 2,
            "bold": 4
          },
          "setting": {
            "evening": 3,
            "daylight": 3,
            "night": 4
          },
          "energy": {
            "day": 2,
            "night": 3,
            "both": 5
          },
          "season": {
            "spring": 3,
            "summer": 4,
            "autumn": 3,
            "winter": 1
          }
        }
      }
    },
    "the-woman-summer-100": {
      "quizId": "no2309summer",
      "name": "No. 2309 — Summer Edition",
      "cartName": "No. 2309 — Summer Edition 100 ml",
      "concentration": "Extrait",
      "concentrationLong": "Extrait",
      "volume": "100 ml",
      "price": null,
      "collection": "numbered",
      "page": null,
      "image": "The Woman 100 ml.png",
      "comingSoon": true,
      "quiz": {
        "direction": "feminine",
        "match": "Notes: Lemon · Mandarin · Osmanthus · Jasmine · Cashmere · Rosy Amber · White Musk · Vanilla · Ambroxan",
        "scores": {
          "feeling": {
            "warm": 2,
            "fresh": 5,
            "bold": 2
          },
          "setting": {
            "evening": 1,
            "daylight": 5,
            "night": 0
          },
          "energy": {
            "day": 4,
            "night": 1,
            "both": 5
          },
          "season": {
            "spring": 4,
            "summer": 5,
            "autumn": 1,
            "winter": 0
          }
        }
      }
    },
    "rainy-night-100": {
      "quizId": "rainynight",
      "name": "Rainy Night",
      "cartName": "Rainy Night — 100 ml",
      "concentration": "",
      "concentrationLong": "",
      "volume": "100 ml",
      "price": null,
      "collection": "white-butterflies",
      "page": null,
      "image": "",
      "comingSoon": true,
      "quiz": {
        "direction": "feminine",
        "match": "",
        "scores": {
          "feeling": {
            "warm": 2,
            "fresh": 5,
            "bold": 1
          },
          "setting": {
            "evening": 4,
            "daylight": 1,
            "night": 5
          },
          "energy": {
            "day": 1,
            "night": 5,
            "both": 3
          },
          "season": {
            "spring": 2,
            "summer": 2,
            "autumn": 3,
            "winter": 4
          }
        }
      }
    }
  }
};
/* TWB_CATALOG_DATA_END */

(() => {
  const STORE = window.TWB_CATALOG;

  function resolveProductId(id) {
    return STORE.aliases[id] || id;
  }

  function getProduct(id) {
    return STORE.products[resolveProductId(id)] || null;
  }

  function formatEUR(value) {
    if (value === null || value === undefined || value === '') return '';
    return '€' + Number(value).toFixed(2);
  }

  function getCountry(code) {
    return STORE.euCountries.find(country => country.code === code) || null;
  }

  function getShipping(code) {
    const normalized = String(code || '').toUpperCase();
    const fixed = STORE.shipping.countryRates[normalized];

    if (fixed !== undefined && fixed !== null) {
      return {
        mode: 'fixed',
        amount: Number(fixed),
        label: formatEUR(fixed)
      };
    }

    if (getCountry(normalized)) {
      return {
        mode: 'quote',
        amount: null,
        label: 'Quoted separately'
      };
    }

    return {
      mode: 'unsupported',
      amount: null,
      label: 'Contact us'
    };
  }

  function productMeta(product) {
    if (!product) return '';
    return [product.concentrationLong || product.concentration, product.volume]
      .filter(Boolean)
      .join(' · ');
  }

  function syncButton(button) {
    const id = resolveProductId(button.dataset.id || '');
    const product = getProduct(id);
    if (!product) return;

    button.dataset.id = id;
    button.dataset.name = product.cartName;
    button.dataset.size = product.volume;

    if (product.price !== null && product.price !== undefined) {
      button.dataset.price = String(product.price);
    }

    const scope = button.closest('article') || button.closest('main') || document;

    const markedPrice = scope.querySelector(`[data-catalog-price="${id}"]`);
    if (markedPrice && product.price !== null) {
      markedPrice.textContent = formatEUR(product.price);
    }

    const markedMeta = scope.querySelector(`[data-catalog-meta="${id}"]`);
    if (markedMeta) {
      markedMeta.textContent = productMeta(product);
    }

    // Homepage cards did not originally carry catalog markers.
    // Update the obvious price/meta elements there as a compatibility layer.
    if (scope.tagName === 'ARTICLE') {
      const priceEl = Array.from(scope.querySelectorAll('span'))
        .find(el => /^€\s*\d/.test(el.textContent.trim()));

      if (priceEl && product.price !== null) {
        priceEl.textContent = formatEUR(product.price);
      }

      const metaEl = Array.from(scope.querySelectorAll('span'))
        .find(el => /100\s*ml/i.test(el.textContent) && !/^€/.test(el.textContent.trim()));

      if (metaEl) {
        metaEl.textContent = productMeta(product);
      }
    }
  }

  function syncCatalogDom() {
    document
      .querySelectorAll('.add-to-cart[data-id], #addProduct[data-id], [data-add-to-cart][data-id]')
      .forEach(syncButton);

    document.querySelectorAll('[data-catalog-price]').forEach(el => {
      const product = getProduct(el.dataset.catalogPrice);
      if (product && product.price !== null) el.textContent = formatEUR(product.price);
    });

    document.querySelectorAll('[data-catalog-meta]').forEach(el => {
      const product = getProduct(el.dataset.catalogMeta);
      if (product) el.textContent = productMeta(product);
    });
  }

  window.TWB_STORE = STORE; // backwards compatibility with the earlier catalog build
  window.TWB_resolveProductId = resolveProductId;
  window.TWB_getProduct = getProduct;
  window.TWB_catalogFormatEUR = formatEUR;
  window.TWB_productMeta = productMeta;
  window.TWB_getShipping = getShipping;
  window.TWB_getCountry = getCountry;
  window.TWB_syncCatalogDOM = syncCatalogDom;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncCatalogDom);
  } else {
    syncCatalogDom();
  }
})();

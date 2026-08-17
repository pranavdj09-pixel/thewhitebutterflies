THE WHITE BUTTERFLIES — QUIZ → SAMPLE FUNNEL

FILES
-----
Replace:
- quiz.html

Add:
- quiz-result.html

catalog.js and cart.js are included in this ZIP only so the preview bundle is self-contained.
If your live versions are already current, you do not need to replace them.

BEFORE PUSHING
--------------
In quiz-result.html search for:

PASTE_YOUR_CURRENT_APPS_SCRIPT_EXEC_URL_HERE

Replace it with your current Google Apps Script /exec URL.

FUNNEL
------
Quiz
→ dedicated result page
→ one dominant recommendation
→ direct checkout

CLEAR MATCH:
- 10 ml Try Your Match (€5.99) is the primary CTA.
- Clicking it adds the exact matched trial and goes straight to checkout.
- Personal Discovery and full bottle are visually secondary.

CLOSE MATCH:
- If winner vs runner-up score lead is 0–2 points, Personal Discovery becomes primary.
- The page explicitly explains that the answers sit between profiles.
- The strongest 10 ml trial remains a secondary option.

COMING SOON:
- Personal Discovery becomes primary automatically.

EMAIL
-----
Email capture is deliberately BELOW the purchase path.
Users do not have to give an email before seeing their result.

No Apps Script logic change is required for this funnel.


FIXES IN THIS VERSION
---------------------
- quiz-result.html no longer loads cart.js.
  cart.js was injecting the full cart drawer into the result page, and because
  this page does not use Tailwind, the drawer appeared as raw unstyled content.
- The result page now writes the chosen trial/discovery item directly to the
  existing localStorage cart and immediately sends the user to checkout.
- The left side displays ONLY the real product image from catalog.js.
- No fake bottle, no "Coming Soon" placeholder, no decorative card/glow.
- If a real image is missing or fails to load, the image area disappears
  entirely instead of inventing a visual.

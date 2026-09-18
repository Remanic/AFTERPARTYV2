# AFTER PARTY — D2C site

Static, no build step. Four pages plus shared assets.

```
index.html     Landing: hero, the three flavours, where to buy, proof
product.html   The range in full + the pack explorer (every side of the carton)
story.html     Research, positioning, who it's for, competition
order.html     Order page: pick packs, quantities, delivery, checkout
styles.css     All styling
app.js         Flavour data, carton rendering, cart, order flow
logo.png       Brand logo
vercel.json    Static config
```

All files sit flat at the repository root — no subfolders. Keep it that way; the pages reference `styles.css`, `app.js` and `logo.png` as siblings.

## Deploy

Drop this whole folder on vercel.com (Add New → Project → deploy folder), Framework Preset **Other**, Build Command and Output Directory empty. Or:

```bash
npm i -g vercel
vercel --prod
```

Navigation between pages is plain relative links, so it works the same locally and on Vercel.

## Things to set before you go live

1. **WhatsApp number.** `app.js`, in `initOrder()` — replace `910000000000` in the `wa.me` link with your real number in international format (91 + 10 digits).
2. **Prices.** Placeholders until you set them: Peanuts ₹99 (145 g carton, 3 flavours), Chips ₹59 (60 g, Peri Peri / Barbeque), Makhana ₹99 (75 g, Jalapeño / Tandoori Tikka), Trail Mix ₹129 (80 g), Loaded Nachos ₹69 (60 g), Chocolate-Banana Bites ₹149 (120 g), Peanut Trio ₹279, House Party Pack ₹499, free delivery over ₹499. Products live in the `P` array, bundles in `BUNDLES`, the threshold in `FREE_AT` — all in `app.js`.

### Adding a product or a flavour

`P` in `app.js` is the single source. A product with a `variants` array gets flavour chips on its card and one order line per flavour; a product without variants is a single SKU. Add an entry there and it appears on the landing page, the range page and the order page at once — no HTML to touch.

5. **Retailer links.** The four buttons on the landing and order pages link to each platform's homepage. Swap in your actual product or search URLs once the listings are live.
3. **Delivery promise.** "Six metros, two to four days" appears on `order.html`. Make it true or change it.
4. **Stockist claims.** The landing and order pages say you're on Instamart, Blinkit, BigBasket and Zepto. Only leave those up once the listings are actually live.

## How the cart works

Quantities are stored in `localStorage` under `ap_cart_v1`, so adding from the landing or range page carries through to the order page and survives a refresh. Placing an order opens a pre-filled WhatsApp message with the line items, total and the name, phone and address fields. No payment gateway is wired up — the confirmation and payment link happen in that conversation.

## Editing the product

Everything about the three flavours — colours, copy, nutrition, ingredients, claims, side-panel lines — lives in the `F` array at the top of `app.js`. The cartons are drawn in HTML and CSS from that data, so one edit updates the hero, the cards, the order page and the pack explorer at once.

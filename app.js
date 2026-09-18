/* ============ AFTER PARTY — shared app ============ */
(function () {
  "use strict";

  var LOGO = "logo.png";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- the range: seven SKUs across three categories ---------------- */
  var SKU = [
    { k:"peanuts-sweet", cat:"Peanuts", flavour:"Classic Sweet", price:159, size:"145 g",
      img:"pack-classic-sweet.png", tint:"#C4161C",
      claims:"Plant protein · Low sodium · High fibre",
      taste:"Roasted peanuts with a classic sweet crunch. The one the whole table reaches for first, and the one that empties fastest.",
      func:"Plant protein and fibre from the peanut itself, with sodium kept deliberately low, so a second handful doesn't cost you the morning." },

    { k:"peanuts-tam", cat:"Peanuts", flavour:"Tamarind Chilli", price:159, size:"145 g",
      img:"pack-tamarind-chilli.png", tint:"#A1121F",
      claims:"Electrolytes · Plant protein · Gut friendly",
      taste:"Tangy tamarind, a proper chilli kick, and the imli-chaat flavour you grew up on. Sour enough to cut through a long night.",
      func:"The only one carrying the electrolyte claim, alongside tamarind as a traditional digestive. The flavour to reach for when the night ran heavy." },

    { k:"makhana-jal", cat:"Makhana", flavour:"Cheesy Jalapeño", price:199, size:"145 g",
      img:"pack-cheesy-jalapeno.png", tint:"#E5A70F",
      claims:"Plant protein · Low sodium · High fibre",
      taste:"Roasted fox nuts with a cheesy jalapeño coating. Light and airy, which is how a whole box disappears without feeling like one.",
      func:"Makhana is naturally light on oil and high in fibre, so it fills you up without the grease that makes the next morning worse." },

    { k:"makhana-tan", cat:"Makhana", flavour:"Tandoori Tikka", price:199, size:"145 g",
      img:"pack-tandoori-tikka.png", tint:"#57249B",
      claims:"Plant protein · Low sodium · Crispy goodness",
      taste:"Smoky tandoori masala over roasted makhana. Tastes like the starter everybody fights over, in a box you can finish in bed.",
      func:"Fibre-led and light on oil, seasoned with real spices rather than a flavour system. The one for people who read the ingredient list." },

    { k:"chips-bbq", cat:"Chips", flavour:"Barbecue", price:149, size:"90 g",
      img:"pack-barbecue.png", tint:"#12657F",
      claims:"Bold flavour · No artificial colours · Crispy goodness",
      taste:"Deep, sweet-smoky barbecue on a ridged crisp that actually snaps. The most familiar thing in the range, and the easiest first buy.",
      func:"Bold enough to end the 1 am craving that would otherwise become a delivery order at twice the price and three times the grease." },

    { k:"chips-peri", cat:"Chips", flavour:"Peri Peri Lime", price:149, size:"96 g",
      img:"pack-peri-peri-lime.png", tint:"#D9611A",
      claims:"Spicy kick · Zesty goodness · Crispy goodness",
      taste:"Peri peri heat with a sharp lime finish. Sour and hot, which is exactly what a dulled palate wants at the end of a night.",
      func:"Citrus and chilli cut through a heavy evening better than anything creamy or plain salted. Real ingredients, no artificial colours." }
  ];
  window.AP_SKUS = SKU;

  /* the pack is a photograph of the real carton */
  function pack(s) {
    return '<div class="cart photo"><img src="' + s.img + '" alt="AFTER PARTY ' + s.flavour + ' ' + s.cat + ', ' + s.size + ' box" loading="lazy" /></div>';
  }
  window.AP_PACK = pack;

  function bySku(key) {
    for (var i = 0; i < SKU.length; i++) if (SKU[i].k === key) return SKU[i];
    return SKU[0];
  }

  /* ---------------- cart ---------------- */
  var KEY = "ap_cart_v2";
  function readCart() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function writeCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} paintCount(); }
  function cartCount() { var c = readCart(), n = 0; for (var k in c) if (c.hasOwnProperty(k)) n += c[k]; return n; }
  function paintCount() {
    var el = document.querySelectorAll("[data-cartcount]"), n = cartCount();
    for (var i = 0; i < el.length; i++) el[i].textContent = n ? "Order (" + n + ")" : "Order";
  }

  /* ---------------- range grid ---------------- */
  function initRange() {
    var boxes = document.querySelectorAll("[data-range]");
    if (!boxes.length) return;

    function card(sku, full) {
      return '<article class="sku" data-key="' + sku.k + '">' +
        '<div class="cartbox">' + pack(sku) + "</div>" +
        '<p class="cat" style="color:' + sku.tint + '">' + sku.cat + "</p>" +
        "<h3>" + sku.flavour + "</h3>" +
        '<p class="claims-line">' + sku.claims + "</p>" +
        "<p>" + sku.taste + "</p>" +
        (full ? '<p class="vtaste">' + sku.func + "</p>" : "") +
        '<div class="price">&#8377;' + sku.price + ' <small>' + sku.size + ' box</small>' +
        '<button class="add" data-add="' + sku.k + '">Add to order</button></div></article>';
    }

    for (var b = 0; b < boxes.length; b++) {
      var full = boxes[b].getAttribute("data-range") === "full", h = "";
      for (var i = 0; i < SKU.length; i++) h += card(SKU[i], full);
      boxes[b].innerHTML = h;
      boxes[b].addEventListener("click", function (e) {
        var btn = e.target.closest("button.add");
        if (!btn) return;
        var c = readCart(), key = btn.getAttribute("data-add");
        c[key] = (c[key] || 0) + 1;
        writeCart(c);
        btn.textContent = "Added \u2713";
        setTimeout(function () { btn.textContent = "Add to order"; }, 1100);
        if (!reduce) { var cd = btn.closest(".sku"); cd.classList.remove("shake"); void cd.offsetWidth; cd.classList.add("shake"); }
      });
    }
  }

  /* ---------------- order page ---------------- */
  var BUNDLES = [
    { key:"trio", name:"The Trio", sub:"One box each of Peanuts, Makhana and Chips. The easiest way to find your one.", price:449, art:bySku("peanuts-tam") },
    { key:"party", name:"House Party Pack", sub:"All six flavours. Stock the shelf before the weekend and stop thinking about it.", price:899, art:bySku("chips-bbq") }
  ];
  var FREE_AT = 499;

  function initOrder() {
    var list = document.getElementById("pick");
    if (!list) return;

    var lines = [];
    for (var i = 0; i < SKU.length; i++) {
      lines.push({ key:SKU[i].k, name:SKU[i].cat + " · " + SKU[i].flavour,
                   sub:SKU[i].size + " box · " + SKU[i].taste.split(".")[0] + ".",
                   price:SKU[i].price, art:pack(SKU[i]) });
    }
    for (var b = 0; b < BUNDLES.length; b++) {
      lines.push({ key:BUNDLES[b].key, name:BUNDLES[b].name, sub:BUNDLES[b].sub,
                   price:BUNDLES[b].price, art:pack(BUNDLES[b].art), bundle:true });
    }

    var cart = readCart(), h = "";
    for (var j = 0; j < lines.length; j++) {
      var L = lines[j];
      h += '<div class="pickrow' + (L.bundle ? " bundle" : "") + '" data-key="' + L.key + '">' +
        '<div class="cartbox">' + L.art + "</div>" +
        "<div><h3>" + L.name + "</h3><p>" + L.sub + "</p><p class='rowprice'>&#8377;" + L.price + "</p></div>" +
        '<div class="qty"><button data-step="-1" aria-label="Remove one ' + L.name + '">–</button>' +
        '<output data-q="' + L.key + '">' + (cart[L.key] || 0) + "</output>" +
        '<button data-step="1" aria-label="Add one ' + L.name + '">+</button></div></div>';
    }
    list.innerHTML = h;

    function priceOf(k) { for (var i = 0; i < lines.length; i++) if (lines[i].key === k) return lines[i].price; return 0; }
    function nameOf(k) { for (var i = 0; i < lines.length; i++) if (lines[i].key === k) return lines[i].name; return k; }

    function paint() {
      var c = readCart(), sub = 0, items = 0, out = [];
      for (var k in c) {
        if (!c.hasOwnProperty(k) || !c[k]) continue;
        sub += priceOf(k) * c[k]; items += c[k];
        out.push(c[k] + " x " + nameOf(k));
      }
      var ship = (sub === 0 || sub >= FREE_AT) ? 0 : 49;
      document.getElementById("sumitems").textContent = items ? items + (items === 1 ? " item" : " items") : "Nothing yet";
      document.getElementById("sumsub").textContent = "\u20B9" + sub;
      document.getElementById("sumship").textContent = sub === 0 ? "—" : (ship ? "\u20B9" + ship : "Free");
      document.getElementById("sumtot").textContent = "\u20B9" + (sub + ship);
      document.getElementById("freebar").style.width = Math.min(100, Math.round(sub / FREE_AT * 100)) + "%";
      document.getElementById("freenote").textContent = sub >= FREE_AT ? "Delivery is on us." : "Add \u20B9" + (FREE_AT - sub) + " more for free delivery.";
      var place = document.getElementById("place");
      place.setAttribute("aria-disabled", items ? "false" : "true");
      place.style.opacity = items ? "1" : ".5";
      window.AP_ORDER_LINES = out; window.AP_ORDER_TOTAL = sub + ship;
      var os = document.querySelectorAll("[data-q]");
      for (var i = 0; i < os.length; i++) os[i].textContent = c[os[i].getAttribute("data-q")] || 0;
      paintCount();
    }

    list.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-step]");
      if (!btn) return;
      var key = btn.closest(".pickrow").getAttribute("data-key"), c = readCart();
      c[key] = Math.max(0, (c[key] || 0) + parseInt(btn.getAttribute("data-step"), 10));
      if (!c[key]) delete c[key];
      writeCart(c); paint();
    });
    paint();

    document.getElementById("place").addEventListener("click", function (e) {
      e.preventDefault();
      if (!window.AP_ORDER_LINES || !window.AP_ORDER_LINES.length) return;
      var nm = (document.getElementById("fname") || {}).value || "",
          ph = (document.getElementById("fphone") || {}).value || "",
          ad = (document.getElementById("faddr") || {}).value || "";
      var msg = "AFTER PARTY order\n" + window.AP_ORDER_LINES.join("\n") + "\nTotal: \u20B9" + window.AP_ORDER_TOTAL +
        (nm ? "\nName: " + nm : "") + (ph ? "\nPhone: " + ph : "") + (ad ? "\nAddress: " + ad : "");
      window.open("https://wa.me/910000000000?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------------- misc ---------------- */
  function initBits() {
    var hs = document.getElementById("herostack");
    if (hs) hs.innerHTML = '<div class="cartbox">' + pack(bySku("makhana-tan")) + '</div><div class="cartbox">' + pack(bySku("peanuts-tam")) + "</div>";
    var minis = document.querySelectorAll("[data-mini]");
    for (var i = 0; i < minis.length; i++) {
      var k = minis[i].getAttribute("data-mini");
      for (var j = 0; j < SKU.length; j++) if (SKU[j].k === k) minis[i].innerHTML = pack(SKU[j]);
    }
    var bars = document.getElementById("bars");
    if (bars) {
      if ("IntersectionObserver" in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
        }, { threshold:.35 });
        io.observe(bars);
      } else bars.classList.add("in");
    }
    paintCount();
  }

  /* ---------------- time dial: four designed palettes ---------------- */
  var STOPS = [
    { id:"night", label:"1:47", ampm:"am", cap:"deep night",
      bg:"#150A1F", surface:"#241035", text:"#F8F1E2", muted:"#BCA4CF",
      accent:"#FFD21E", accentInk:"#FFD21E", onAccent:"#23102E", accent2:"#FF6B6B",
      line:"248,241,226", lineA:".15", shadow:"0 18px 40px rgba(0,0,0,.38)" },
    { id:"late", label:"4:30", ampm:"am", cap:"last one home",
      bg:"#1E1138", surface:"#2C1A4A", text:"#F4EEE4", muted:"#B6A8DC",
      accent:"#FFC24B", accentInk:"#FFCE6E", onAccent:"#201234", accent2:"#FF8FA3",
      line:"244,238,228", lineA:".16", shadow:"0 18px 40px rgba(0,0,0,.34)" },
    { id:"dawn", label:"6:30", ampm:"am", cap:"first light",
      bg:"#FBE7D0", surface:"#FFF7EC", text:"#33162C", muted:"#6E4A55",
      accent:"#C2410C", accentInk:"#A8360A", onAccent:"#FFF7EC", accent2:"#B01B5B",
      line:"51,22,44", lineA:".18", shadow:"0 16px 34px rgba(51,22,44,.16)" },
    { id:"morning", label:"8:00", ampm:"am", cap:"wide awake",
      bg:"#F8F2E6", surface:"#FFFFFF", text:"#2A1030", muted:"#665069",
      accent:"#6D1A9C", accentInk:"#5E1587", onAccent:"#FFFFFF", accent2:"#C0392B",
      line:"42,16,48", lineA:".16", shadow:"0 14px 30px rgba(42,16,48,.13)" }
  ];

  function initDial() {
    var slider = document.getElementById("time");
    if (!slider) return;
    var root = document.documentElement, clock = document.getElementById("clock"),
        capEl = document.getElementById("dialcap"), themeMeta = document.querySelector("meta[name=theme-color]");
    slider.min = 0; slider.max = STOPS.length - 1; slider.step = 1;

    function apply(i) {
      var s = STOPS[i], st = root.style;
      st.setProperty("--bg", s.bg); st.setProperty("--surface", s.surface);
      st.setProperty("--text", s.text); st.setProperty("--muted", s.muted);
      st.setProperty("--accent", s.accent); st.setProperty("--accent-ink", s.accentInk);
      st.setProperty("--on-accent", s.onAccent); st.setProperty("--accent2", s.accent2);
      st.setProperty("--line", "rgba(" + s.line + "," + s.lineA + ")");
      st.setProperty("--shadow", s.shadow);
      if (clock) clock.innerHTML = s.label + '<span style="font-size:.62em"> ' + s.ampm + "</span>";
      if (capEl) capEl.textContent = s.cap;
      if (themeMeta) themeMeta.setAttribute("content", s.bg);
      root.setAttribute("data-phase", s.id);
      try { sessionStorage.setItem("ap_time", i); } catch (e) {}
    }
    var saved = null;
    try { saved = sessionStorage.getItem("ap_time"); } catch (e) {}
    var start = saved === null ? 0 : Math.max(0, Math.min(STOPS.length - 1, parseInt(saved, 10) || 0));
    slider.value = start;
    slider.addEventListener("input", function () { apply(parseInt(slider.value, 10)); });
    apply(start);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBits(); initRange(); initOrder(); initDial();
  });
})();

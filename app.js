/* ============ AFTER PARTY — shared app ============ */
(function () {
  "use strict";

  var LOGO = "logo.png";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- icons ---------------- */
  var ICON = {
    plant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V11"/><path d="M12 11C12 7 9 4 5 4c0 4 3 7 7 7z"/><path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 3.5-1 5 .5 7.5C14 7 16 8.2 16 8.2c3 3.2 2.4 8-1.6 10.4a6.4 6.4 0 0 1-8.6-9C7.6 7.4 10.6 6 12 2z"/></svg>',
    fibre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4z"/><path d="M12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/><path d="M12 14c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4z"/><path d="M12 14c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/></svg>',
    salt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3.2 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 1.8-5 5-9z"/><path d="M8.5 15.5l7-7"/></svg>',
    gut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v6a4 4 0 0 0 8 0 3 3 0 0 1 6 0v4a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4"/></svg>',
    real: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4 0-7-3-7-7 0-5 4-9 9-11 1 6-1 10-5 12"/><path d="M5 21c1-5 4-8 8-10"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    crisp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9c3-3 5 1 8-2s5 1 8-2v10c-3 3-5-1-8 2s-5-1-8 2z"/></svg>'
  };

  /* ---------------- the six SKUs: three categories, two flavours each ---------------- */
  var SKU = [
    { k:"peanuts-sweet", cat:"Peanuts", flavour:"Classic Sweet", price:159, size:"145 g",
      bg:"#C4161C", conf:["peanut","splat","peanut","crown","peanut"],
      right:"CRUNCH<br>RESET<br>REPEAT",
      claims:[["plant","PLANT<br>PROTEIN"],["salt","LOW<br>SODIUM"],["fibre","HIGH<br>FIBRE"]],
      taste:"Roasted peanuts with a classic sweet crunch. The one the whole table reaches for first, and the one that empties fastest.",
      func:"Plant protein and fibre from the peanut itself, with sodium kept deliberately low, so a second handful doesn't cost you the morning." },

    { k:"peanuts-tam", cat:"Peanuts", flavour:"Tamarind Chilli", price:159, size:"145 g",
      bg:"#7A1030", conf:["chilli","peanut","tamarind","splat","peanut"],
      right:"SNACK NOW<br>RECOVER<br>TOMORROW",
      claims:[["plant","PLANT<br>PROTEIN"],["gut","GUT<br>FRIENDLY"],["fibre","HIGH<br>FIBRE"]],
      taste:"Tangy tamarind, a proper chilli kick, and the imli-chaat flavour you grew up on. Sour enough to cut through a long night.",
      func:"Tamarind is a traditional digestive, so this is the one to reach for when the night ran heavier than planned. Plant protein and fibre underneath." },

    { k:"makhana-jal", cat:"Makhana", flavour:"Cheesy Jalapeño", price:199, size:"145 g",
      bg:"#E5A70F", conf:["chilli","splat","peanut","crown","chilli"],
      right:"SNACK NOW<br>RECOVER<br>REPEAT",
      claims:[["plant","PLANT<br>PROTEIN"],["salt","LOW<br>SODIUM"],["fibre","HIGH<br>FIBRE"]],
      taste:"Roasted fox nuts with a cheesy jalapeño coating. Light and airy, which is how a whole box disappears without feeling like one.",
      func:"Makhana is naturally light on oil and high in fibre, so it fills you up without the grease that makes the next morning worse." },

    { k:"makhana-tan", cat:"Makhana", flavour:"Tandoori Tikka", price:199, size:"145 g",
      bg:"#57249B", conf:["chilli","splat","peanut","crown","chilli"],
      right:"SNACK<br>RECOVER<br>REPEAT",
      claims:[["plant","PLANT<br>PROTEIN"],["real","REAL<br>INGREDIENTS"],["fibre","HIGH<br>FIBRE"]],
      taste:"Smoky tandoori masala over roasted makhana. Tastes like the starter everybody fights over, in a box you can finish in bed.",
      func:"Fibre-led and light on oil, seasoned with real spices rather than a flavour system. The one for people who read the ingredient list." },

    { k:"chips-bbq", cat:"Chips", flavour:"Barbecue", price:149, size:"145 g",
      bg:"#12657F", conf:["splat","chilli","peanut","crown","splat"],
      right:"CHIPS<br>CRUNCH<br>RECOVER<br>REPEAT",
      claims:[["flame","BOLD<br>FLAVOUR"],["crisp","CRISPY<br>GOODNESS"],["real","REAL<br>INGREDIENTS"]],
      taste:"Deep, sweet-smoky barbecue on a crisp that actually snaps. The most familiar thing in the range, and the easiest first buy.",
      func:"Bold enough to end the 1 am craving that would otherwise become a delivery order at twice the price and three times the grease." },

    { k:"chips-peri", cat:"Chips", flavour:"Peri Peri Lime", price:149, size:"145 g",
      bg:"#D9611A", conf:["chilli","splat","chilli","crown","peanut"],
      right:"CRUNCH<br>RECOVER<br>REPEAT",
      claims:[["flame","BOLD<br>FLAVOUR"],["crisp","ZESTY<br>KICK"],["real","REAL<br>INGREDIENTS"]],
      taste:"Peri peri heat with a sharp lime finish. Sour and hot, which is exactly what a dulled palate wants at the end of a night.",
      func:"Citrus and chilli cut through a heavy evening better than anything creamy or plain salted. Real ingredients, no artificial colours." }
  ];

  /* grouped into the three families in the product architecture */
  var P = [
    { key:"peanuts", name:"Peanuts", size:"145 g box", price:159,
      blurb:"Where the brand started. Roasted peanuts, plant protein and fibre, in the two flavours people kept coming back to.",
      variants:[SKU[0], SKU[1]] },
    { key:"makhana", name:"Makhana", size:"145 g box", price:199,
      blurb:"Roasted fox nuts. Light, high in fibre and easy on the stomach — the box you can finish without regretting it.",
      variants:[SKU[2], SKU[3]] },
    { key:"chips", name:"Chips", size:"145 g box", price:149,
      blurb:"The craving everybody actually has at 1 am, made properly. Bold seasoning, real ingredients, no artificial colours.",
      variants:[SKU[4], SKU[5]] }
  ];
  window.AP_PRODUCTS = P;
  window.AP_SKUS = SKU;

  /* ---------------- pack artwork ---------------- */
  var CONF = {
    peanut: '<svg viewBox="0 0 30 22" aria-hidden="true"><g transform="translate(15 11)"><ellipse cx="-6" cy="0" rx="8.4" ry="7.4" fill="#E0A45C"/><ellipse cx="6" cy="0" rx="8.4" ry="7.4" fill="#E0A45C"/><ellipse cx="-6" cy="-1.8" rx="3.4" ry="2.2" fill="#F5CE92"/></g></svg>',
    chilli: '<svg viewBox="0 0 30 26" aria-hidden="true"><path d="M7 4c5-3 13-1 17 5 3 5 1 12-5 14-5 1.6-9-1-10-6-.8-4 .5-8-2-13z" fill="#E01E26"/><path d="M6 3c2-2 5-2 7 0-2 1-4 2-5 4-1-2-1-3-2-4z" fill="#2FA36B"/></svg>',
    tamarind: '<svg viewBox="0 0 26 34" aria-hidden="true"><path d="M13 1c5 4 8 10 7 17-1 8-6 15-9 15s-6-5-6-12S8 5 13 1z" fill="#8A5A2B"/><circle cx="12" cy="12" r="3.4" fill="#6B4320"/><circle cx="13" cy="21" r="3.4" fill="#6B4320"/></svg>',
    crown: '<svg viewBox="0 0 30 24" aria-hidden="true"><path d="M3 20 5 5l6 6 4-9 4 9 6-6 2 15z" fill="#FFD21E"/></svg>',
    splat: '<svg viewBox="0 0 30 26" aria-hidden="true"><path d="M4 12c3-6 9-9 14-7 4 1.6 6 5 11 5-3 3-4 7-9 9s-12 1-16-7z" fill="rgba(255,255,255,.16)"/></svg>'
  };
  var CONF_POS = [[3,7,7,-18],[88,5,6,14],[1,36,8,8],[91,32,7,-12],[5,68,7,16],[89,64,8,-8],[8,88,6,-6],[86,89,7,12]];

  function confetti(list) {
    var h = "";
    for (var i = 0; i < list.length && i < CONF_POS.length; i++) {
      var p = CONF_POS[i];
      h += '<div class="conf" style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + p[2] + 'cqw;transform:rotate(' + p[3] + 'deg)">' + (CONF[list[i]] || CONF.peanut) + "</div>";
    }
    return h;
  }
  /* what you see through the window changes with the product */
  var FILL = {
    Peanuts:  { body:"#C9813A", hi:"#EBB169", lo:"#A8641F" },
    Makhana:  { body:"#EFE0BC", hi:"#FFF8E8", lo:"#B39A63" },
    Chips:    { body:"#E8A33D", hi:"#F6C976", lo:"#B9741D" }
  };

  function windowArt(cat, cls) {
    var c = FILL[cat] || FILL.Peanuts, g = "";
    if (cat === "Makhana") {
      var mk = [[18,16,1],[48,10,1.12],[80,17,.95],[33,36,1.05],[66,34,.92],[15,54,1],[49,57,1.08],[83,52,.95]];
      for (var i = 0; i < mk.length; i++) {
        var m = mk[i];
        g += '<g transform="translate(' + m[0] + " " + m[1] + ") scale(" + m[2] + ')">' +
          '<circle cx="0" cy="0" r="9" fill="' + c.body + '" stroke="' + c.lo + '" stroke-width=".7"/>' +
          '<circle cx="-4.6" cy="-5" r="4.6" fill="' + c.body + '" stroke="' + c.lo + '" stroke-width=".7"/>' +
          '<circle cx="5.2" cy="-3.6" r="4" fill="' + c.body + '" stroke="' + c.lo + '" stroke-width=".7"/>' +
          '<circle cx="0" cy="0" r="8.4" fill="' + c.body + '"/>' +
          '<circle cx="-4.6" cy="-5" r="4" fill="' + c.body + '"/>' +
          '<circle cx="5.2" cy="-3.6" r="3.4" fill="' + c.body + '"/>' +
          '<ellipse cx="-2.6" cy="-2" rx="3.4" ry="2.6" fill="' + c.hi + '"/>' +
          '<path d="M-3 4.4q3 2.4 6.4 0" stroke="' + c.lo + '" stroke-width=".8" fill="none" opacity=".7"/></g>';
      }
    } else if (cat === "Chips") {
      /* a ruffled disc, built from alternating lobes so it reads as a wavy crisp */
      var wavy = function (rOut, rIn) {
        var n = 9, sq = 0.78, d = "", a0 = 0;
        var px = (rIn * Math.cos(a0)).toFixed(2), py = (rIn * Math.sin(a0) * sq).toFixed(2);
        d = "M" + px + " " + py;
        for (var t = 1; t <= n; t++) {
          var aMid = 2 * Math.PI * (t - 0.5) / n, aEnd = 2 * Math.PI * t / n;
          var cx = (rOut * Math.cos(aMid)).toFixed(2), cy = (rOut * Math.sin(aMid) * sq).toFixed(2);
          var ex = (rIn * Math.cos(aEnd)).toFixed(2), ey = (rIn * Math.sin(aEnd) * sq).toFixed(2);
          d += "Q" + cx + " " + cy + " " + ex + " " + ey;
        }
        return d + "Z";
      };
      var ch = [[19,16,-16,1],[53,11,12,1.1],[82,19,24,.92],[31,40,6,1.05],[67,42,-14,.95],[17,58,16,.9],[52,60,-6,1]];
      for (var j = 0; j < ch.length; j++) {
        var k = ch[j];
        g += '<g transform="translate(' + k[0] + " " + k[1] + ") rotate(" + k[2] + ") scale(" + k[3] + ')">' +
          '<path d="' + wavy(12, 8.6) + '" fill="' + c.body + '"/>' +
          '<path d="' + wavy(8.2, 5.6) + '" fill="' + c.hi + '" opacity=".55"/>' +
          '<circle cx="-3.4" cy="-1.4" r="1.15" fill="' + c.lo + '"/>' +
          '<circle cx="3.2" cy="1.6" r="1" fill="' + c.lo + '"/>' +
          '<circle cx="1" cy="-3" r=".8" fill="' + c.lo + '" opacity=".8"/></g>';
      }
    } else {
      var pn = [[18,14,-14],[50,9,12],[82,16,20],[33,33,5],[67,35,-10],[16,52,16],[50,56,-4],[84,50,10]];
      for (var n = 0; n < pn.length; n++) {
        var q = pn[n];
        g += '<g transform="translate(' + q[0] + " " + q[1] + ") rotate(" + q[2] + ')">' +
          '<ellipse cx="-5" cy="0" rx="7.6" ry="6.7" fill="' + c.body + '"/><ellipse cx="5" cy="0" rx="7.6" ry="6.7" fill="' + c.body + '"/>' +
          '<ellipse cx="-5" cy="-1.7" rx="3.2" ry="2.1" fill="' + c.hi + '"/><ellipse cx="5" cy="1.5" rx="2.6" ry="1.8" fill="' + c.lo + '"/></g>';
      }
    }
    return '<svg class="' + (cls || "") + '" viewBox="0 0 100 70" aria-hidden="true">' + g + "</svg>";
  }

  function claimRow(list) {
    var h = "";
    for (var i = 0; i < list.length; i++) h += "<span>" + ICON[list[i][0]] + "<b style='font-weight:700'>" + list[i][1] + "</b></span>";
    return h;
  }
  function pack(s) {
    var two = s.flavour.length > 13 ? " two" : "";
    return '<div class="cart face-front" style="--fbg:' + s.bg + ';--facc:' + s.bg + ';">' + confetti(s.conf) +
      '<div class="fhead">' +
        '<div class="vt l">FOR<br>THE<br>HOUR<br>AFTER<u></u></div>' +
        '<div class="jarwrap">' +
          '<div class="ribbon">GOOD<br>SNACKS<br>BETTER<br>TOMORROWS<i>&#9889;</i></div>' +
          '<div class="neck">' + windowArt(s.cat) + "</div>" +
          '<div class="jar">' + windowArt(s.cat, "pnts") +
            '<img class="lg" src="' + LOGO + '" alt="" />' +
            '<div class="flav' + two + '">' + s.flavour + "</div>" +
            '<div class="arach">' + s.cat.toUpperCase() + "</div>" +
            '<div class="claims">' + claimRow(s.claims) + "</div>" +
            '<div class="netwt">Net Wt. ' + s.size + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="vt r">' + s.right + "<u></u></div>" +
      "</div></div>";
  }
  window.AP_PACK = pack;

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

    function card(p, idx) {
      var chips = "";
      for (var i = 0; i < p.variants.length; i++) {
        chips += '<button class="fchip" data-p="' + idx + '" data-v="' + i + '" aria-pressed="' + (i === 0) + '">' + p.variants[i].flavour + "</button>";
      }
      return '<article class="sku" data-p="' + idx + '">' +
        '<div class="cartbox" data-art="' + idx + '">' + pack(p.variants[0]) + "</div>" +
        "<h3>" + p.name + "</h3>" +
        '<p class="small" style="margin:-4px 0 0">' + p.size + " · " + p.variants.length + " flavours</p>" +
        "<p>" + p.blurb + "</p>" +
        '<p class="vtaste" data-vt="' + idx + '">' + p.variants[0].taste + "</p>" +
        '<div class="fchips" role="group" aria-label="' + p.name + ' flavours">' + chips + "</div>" +
        '<div class="price">&#8377;' + p.price + '<button class="add" data-p="' + idx + '">Add to order</button></div></article>';
    }

    for (var b = 0; b < boxes.length; b++) {
      var full = boxes[b].getAttribute("data-range") === "full", h = "";
      for (var i = 0; i < P.length; i++) h += card(P[i], i);
      boxes[b].innerHTML = h;
      wire(boxes[b], full);
    }

    function wire(box, isFull) {
      var chosen = {};
      box.addEventListener("click", function (e) {
        var chip = e.target.closest(".fchip");
        if (chip) {
          var pi = +chip.getAttribute("data-p"), vi = +chip.getAttribute("data-v"), p = P[pi], card2 = chip.closest(".sku");
          chosen[pi] = vi;
          card2.querySelector('[data-art="' + pi + '"]').innerHTML = pack(p.variants[vi]);
          var vt = card2.querySelector('[data-vt="' + pi + '"]');
          if (vt) vt.textContent = isFull ? p.variants[vi].func : p.variants[vi].taste;
          var sibs = card2.querySelectorAll(".fchip");
          for (var i = 0; i < sibs.length; i++) sibs[i].setAttribute("aria-pressed", i === vi);
          return;
        }
        var btn = e.target.closest("button.add");
        if (!btn) return;
        var pidx = +btn.getAttribute("data-p"), prod = P[pidx];
        var c = readCart(), key = prod.variants[chosen[pidx] || 0].k;
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
    { key:"trio", name:"The Trio", sub:"One box each of Peanuts, Makhana and Chips. The easiest way to find your one.", price:449, art:SKU[1] },
    { key:"party", name:"House Party Pack", sub:"All six flavours. Stock the shelf before the weekend and stop thinking about it.", price:899, art:SKU[3] }
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
    if (hs) hs.innerHTML = '<div class="cartbox">' + pack(SKU[3]) + '</div><div class="cartbox">' + pack(SKU[1]) + "</div>";
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

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
    peanut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 4.5a4 4 0 0 1 3 6.6 4.4 4.4 0 1 1-6.6 5.6A4.6 4.6 0 0 1 6 9.2 4 4 0 0 1 9 4.5z" transform="translate(3 0)"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>'
  };

  /* ---------------- flavours ---------------- */
  var F = [
    {
      key: "sweet", name: "Classic Sweet", bg: "#0E0E10", acc: "#E01E26", price: 99,
      frontR: "CRUNCH<br>RESET<br>REPEAT",
      claims: [["plant", "PLANT<br>PROTEIN"], ["salt", "LOW<br>SODIUM"], ["fibre", "HIGH<br>FIBRE"]],
      confetti: ["peanut", "peanut", "splat", "peanut", "splat", "peanut"],
      desc: "Crunchy peanuts with a classic sweet twist, made for late nights, good times and better tomorrows.",
      n: [["Energy", "567 kcal"], ["Protein", "24 g"], ["Total Fat", "42 g"], ["Saturated Fat", "6 g"], ["Carbohydrate", "23 g"], ["Total Sugars", "12 g"], ["Dietary Fibre", "8 g"], ["Sodium", "320 mg", 1]],
      ing: "Peanuts, Sugar, Salt, Natural Flavouring.",
      left: { big: "LATE<br>NIGHTS<br><em>GREAT<br>SNACKS</em>", list: [["peanut", "REAL PEANUTS"], ["plant", "PLANT PROTEIN"], ["salt", "LOW SODIUM"], ["fibre", "HIGH FIBRE"]], sign: "SNACK NOW.<br>THANK YOURSELF LATER." },
      right: { big: "GOOD<br>DRINKS<br>GREAT<br>COMPANY<br><em>BETTER<br>SNACKS</em>", sign: "FOR<br>WHATEVER'S<br>NEXT." },
      taste: "A glassy sweet shell over a properly roasted peanut. The one everybody reaches for first, and the one that disappears fastest at a house party.",
      func: "24 g protein and 8 g fibre per 100 g, and the lowest sodium in the range at 320 mg. The flavour you can eat a lot of.",
      tm: [["Sweet", 5], ["Heat", 0], ["Crunch", 5]], fm: [["Plant protein", 4], ["Fibre", 5], ["Low sodium", 5]]
    },
    {
      key: "tam", name: "Tamarind Chilli", bg: "#4A1273", acc: "#7A1FA8", price: 99,
      frontR: "SPICY<br>CONVERSATIONS<br>SWEETER<br>TOMORROWS",
      claims: [["plant", "PLANT<br>PROTEIN"], ["flame", "BOLD<br>FLAVOUR"], ["fibre", "HIGH<br>FIBRE"]],
      confetti: ["chilli", "peanut", "tamarind", "splat", "peanut", "chilli", "peanut"],
      desc: "Bold peanuts with a tangy tamarind kick and a spicy twist, made for late nights, big conversations and brighter tomorrows.",
      n: [["Energy", "580 kcal"], ["Protein", "24 g"], ["Total Fat", "41 g"], ["Saturated Fat", "5 g"], ["Carbohydrate", "25 g"], ["Total Sugars", "11 g"], ["Dietary Fibre", "7 g"], ["Sodium", "310 mg", 1]],
      ing: "Peanuts, Tamarind, Spices (Chilli, Pepper), Sugar, Salt, Natural Flavours.",
      left: { big: "SAME<br>CREW<br><em>DIFFERENT<br>CRAVINGS</em>", list: [["peanut", "REAL PEANUTS"], ["plant", "PLANT PROTEIN"], ["bolt", "ELECTROLYTES"]], sign: "SNACK NOW.<br>RECOVER TOMORROW." },
      right: { big: "TANGY<br>SPICY<br><em>TOTALLY<br>WORTH IT</em>", sign: "FOR<br>WHATEVER'S<br>NEXT." },
      taste: "Sour, hot and nostalgic. Imli and chilli over roasted peanuts, somewhere between a chaat stall and a bar snack.",
      func: "The one that carries the electrolyte claim, alongside 24 g protein per 100 g. Sourness and chilli also mask mineral bitterness, which is why this is the hero flavour rather than a line extension.",
      tm: [["Sweet", 2], ["Heat", 4], ["Crunch", 4]], fm: [["Plant protein", 4], ["Electrolytes", 4], ["Fibre", 4]]
    },
    {
      key: "smoky", name: "Smoky Chipotle", bg: "#0C4032", acc: "#12634B", price: 99,
      frontR: "SMOKE<br>HITS<br>DIFFERENT",
      claims: [["plant", "PLANT<br>PROTEIN"], ["flame", "BOLD<br>FLAVOUR"], ["fibre", "HIGH<br>FIBRE"]],
      confetti: ["chilli", "peanut", "chilli", "splat", "peanut", "chilli"],
      desc: "Smoky, savoury peanuts with a chipotle kick, made for late nights, bold flavours and brighter tomorrows.",
      n: [["Energy", "578 kcal"], ["Protein", "25 g"], ["Total Fat", "41 g"], ["Saturated Fat", "6 g"], ["Carbohydrate", "22 g"], ["Total Sugars", "6 g"], ["Dietary Fibre", "6 g"], ["Sodium", "380 mg", 1]],
      ing: "Peanuts, Chipotle, Spices, Salt, Natural Flavours.",
      left: { big: "GOOD<br>DRINKS<br><em>BOLDER<br>SNACKS</em>", list: [["peanut", "REAL PEANUTS"], ["plant", "PLANT PROTEIN"], ["fibre", "HIGH FIBRE"]], sign: "SNACK NOW.<br>BRIGHTER MORNINGS." },
      right: { big: "SAME<br>NIGHTS<br><em>MORE<br>FLAVOUR</em>", sign: "FOR<br>WHATEVER'S<br>NEXT." },
      taste: "Dry smoke and a slow chipotle burn. The least sweet of the three at 6 g sugar per 100 g, and the one that actually goes with a drink.",
      func: "Highest protein in the range at 25 g per 100 g and the lowest sugar. Sodium runs highest at 380 mg, which is the trade you make for the smoke.",
      tm: [["Sweet", 1], ["Heat", 4], ["Crunch", 4]], fm: [["Plant protein", 5], ["Fibre", 4], ["Low sugar", 5]]
    }
  ];
  window.AP_FLAVOURS = F;

  /* ---------------- the wider range ---------------- */
  var P = [
    { key:"peanuts", type:"carton", name:"Peanuts", sub:"Three flavours · 145 g", price:99,
      blurb:"The original. Roasted peanuts with 24 g of plant protein per 100 g, in Classic Sweet, Tamarind Chilli or Smoky Chipotle.",
      link:"product.html", cta:"Pick a flavour" },
    { key:"trail", type:"pouch", name:"Spicy-Sweet Trail Mix", sub:"80 g pouch", price:129,
      bg:"#B4136B", acc:"#FFD21E", confetti:["peanut","chilli","splat","peanut","chilli"],
      blurb:"Jaggery-chilli peanuts, roasted makhana and dried mango. Built to be passed around a table at 2 am.",
      claims:[["plant","PLANT PROTEIN"],["fibre","HIGH FIBRE"],["bolt","ELECTROLYTES"]] },
    { key:"nachos", type:"pouch", name:"Loaded Nachos", sub:"60 g pouch", price:99,
      bg:"#C4520E", acc:"#FFD21E", confetti:["chilli","splat","peanut","chilli"],
      blurb:"Baked corn chips with a loaded masala seasoning. Tastes like a street-side plate, without the oil slick.",
      claims:[["flame","BOLD FLAVOUR"],["salt","BAKED, NOT FRIED"],["fibre","HIGH FIBRE"]] },
    { key:"bites", type:"pouch", name:"Chocolate-Banana Bites", sub:"120 g pouch", price:149,
      bg:"#4A2C1A", acc:"#FFD21E", confetti:["peanut","splat","peanut","splat"],
      blurb:"Dense cocoa and banana bites with plant protein and no caffeine, for the nights that end on something sweet.",
      claims:[["plant","PLANT PROTEIN"],["fibre","HIGH FIBRE"],["salt","NO CAFFEINE"]] }
  ];
  window.AP_PRODUCTS = P;

  /* ---------------- carton art ---------------- */
  function peanutSVG(w) {
    return '<svg viewBox="0 0 30 22" width="' + w + '" aria-hidden="true"><g transform="translate(15 11)">' +
      '<ellipse cx="-6" cy="0" rx="8.4" ry="7.4" fill="#D98E3C"/><ellipse cx="6" cy="0" rx="8.4" ry="7.4" fill="#D98E3C"/>' +
      '<ellipse cx="-6" cy="-1.8" rx="3.4" ry="2.2" fill="#F0B968"/><ellipse cx="6" cy="1.6" rx="2.8" ry="1.9" fill="#B9762C"/></g></svg>';
  }
  var CONF = {
    peanut: '<svg viewBox="0 0 30 22" aria-hidden="true"><g transform="translate(15 11)"><ellipse cx="-6" cy="0" rx="8.4" ry="7.4" fill="#E0A45C"/><ellipse cx="6" cy="0" rx="8.4" ry="7.4" fill="#E0A45C"/><ellipse cx="-6" cy="-1.8" rx="3.4" ry="2.2" fill="#F5CE92"/></g></svg>',
    chilli: '<svg viewBox="0 0 30 26" aria-hidden="true"><path d="M7 4c5-3 13-1 17 5 3 5 1 12-5 14-5 1.6-9-1-10-6-.8-4 .5-8-2-13z" fill="#E01E26"/><path d="M6 3c2-2 5-2 7 0-2 1-4 2-5 4-1-2-1-3-2-4z" fill="#2FA36B"/></svg>',
    tamarind: '<svg viewBox="0 0 26 34" aria-hidden="true"><path d="M13 1c5 4 8 10 7 17-1 8-6 15-9 15s-6-5-6-12S8 5 13 1z" fill="#8A5A2B"/><circle cx="12" cy="12" r="3.4" fill="#6B4320"/><circle cx="13" cy="21" r="3.4" fill="#6B4320"/></svg>',
    splat: '<svg viewBox="0 0 30 26" aria-hidden="true"><path d="M4 12c3-6 9-9 14-7 4 1.6 6 5 11 5-3 3-4 7-9 9s-12 1-16-7z" fill="rgba(255,255,255,.14)"/></svg>'
  };
  var CONF_POS = [
    [3, 6, 7, -18], [88, 4, 6, 14], [1, 34, 8, 8], [92, 30, 7, -12],
    [4, 66, 7, 16], [90, 62, 8, -8], [7, 86, 6, -6], [86, 88, 7, 12]
  ];

  function confetti(f) {
    var h = "";
    for (var i = 0; i < f.confetti.length && i < CONF_POS.length; i++) {
      var p = CONF_POS[i], art = CONF[f.confetti[i]] || CONF.peanut;
      h += '<div class="conf" style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + p[2] + 'cqw;transform:rotate(' + p[3] + 'deg)">' + art + "</div>";
    }
    return h;
  }
  function jarPeanuts(cls) {
    var g = "", spots = [[18, 14, -14], [50, 9, 12], [82, 16, 20], [33, 33, 5], [67, 35, -10], [16, 52, 16], [50, 56, -4], [84, 50, 10]];
    for (var i = 0; i < spots.length; i++) {
      var s = spots[i];
      g += '<g transform="translate(' + s[0] + " " + s[1] + ") rotate(" + s[2] + ')">' +
        '<ellipse cx="-5" cy="0" rx="7.6" ry="6.7" fill="#C9813A"/><ellipse cx="5" cy="0" rx="7.6" ry="6.7" fill="#C9813A"/>' +
        '<ellipse cx="-5" cy="-1.7" rx="3.2" ry="2.1" fill="#EBB169"/><ellipse cx="5" cy="1.5" rx="2.6" ry="1.8" fill="#A8641F"/></g>';
    }
    return '<svg class="' + (cls || "") + '" viewBox="0 0 100 70" aria-hidden="true">' + g + "</svg>";
  }
  function claimRow(list) {
    var h = "";
    for (var i = 0; i < list.length; i++) h += "<span>" + ICON[list[i][0]] + "<b style='font-weight:700'>" + list[i][1] + "</b></span>";
    return h;
  }
  function styleVars(f) { return "--fbg:" + f.bg + ";--facc:" + f.acc + ";"; }

  function front(f) {
    var two = f.name.split(" ").length > 1 && f.name.length > 14 ? " two" : "";
    return '<div class="cart face-front" style="' + styleVars(f) + '">' + confetti(f) +
      '<div class="fhead">' +
      '<div class="vt l">FOR<br>THE<br>HOUR<br>AFTER<u></u></div>' +
      '<div class="jarwrap">' +
      '<div class="ribbon">GOOD<br>SNACKS<br>BETTER<br>TOMORROWS<i>&#9889;</i></div>' +
      '<div class="neck">' + jarPeanuts() + "</div>" +
      '<div class="jar">' + jarPeanuts("pnts") +
      '<img class="lg" src="' + LOGO + '" alt="" />' +
      '<div class="flav' + two + '">' + f.name + "</div>" +
      '<div class="arach">PEANUTS / ARACHIDES</div>' +
      '<div class="claims">' + claimRow(f.claims) + "</div>" +
      '<div class="netwt">Net Wt. 145 g</div>' +
      "</div></div>" +
      '<div class="vt r">' + f.frontR + "<u></u></div>" +
      "</div></div>";
  }

  function back(f) {
    var rows = "", bars = "";
    for (var i = 0; i < f.n.length; i++) rows += "<div" + (f.n[i][2] ? ' class="e"' : "") + "><span>" + f.n[i][0] + "</span><b>" + f.n[i][1] + "</b></div>";
    for (var b = 0; b < 26; b++) bars += "<i></i>";
    return '<div class="cart face-back" style="' + styleVars(f) + '">' + confetti(f) +
      '<img class="lg" src="' + LOGO + '" alt="" />' +
      '<div class="bk-tag">GOOD SNACKS<br>BETTER TOMORROWS</div>' +
      '<div class="bk-desc">' + f.desc + "</div>" +
      '<div class="ntab"><h5>NUTRITION INFORMATION</h5><span class="per">Approx. values per 100 g</span>' + rows + "</div>" +
      '<div class="bk-block"><b>Ingredients:</b> ' + f.ing + "</div>" +
      '<div class="bk-block"><b>Allergen Information:</b> Contains Peanuts.</div>' +
      '<div class="bk-block">Store in a cool, dry place away from direct sunlight. Not for medicinal use.</div>' +
      '<div class="bk-fields"><div class="fl">Batch No.<span></span></div><div class="fl">Mfg. Date<span></span></div>' +
      '<div class="fl">Use By<span></span></div><div class="fl">MRP &#8377;<span></span></div></div>' +
      '<div class="bk-foot"><div class="bk-sign">LATE NIGHTS.<br>BETTER TOMORROWS.</div>' +
      '<div class="bcode">' + bars + '</div><div class="vegm"><i></i></div></div></div>';
  }

  function side(f, which) {
    var s = f[which], list = "";
    if (s.list) for (var i = 0; i < s.list.length; i++) list += "<li>" + ICON[s.list[i][0]] + "<span>" + s.list[i][1] + "</span></li>";
    return '<div class="cart face-side" style="' + styleVars(f) + '">' + confetti(f) +
      '<div class="big">' + s.big + "</div>" + (list ? "<ul>" + list + "</ul>" : "") +
      '<div class="sign">' + s.sign + "</div></div>";
  }
  function top(f) {
    return '<div class="cart face-top" style="' + styleVars(f) + '">' + confetti(f) +
      '<div><img src="' + LOGO + '" alt="" /><p>GOOD SNACKS<br>BETTER TOMORROWS</p></div></div>';
  }
  function pouchClaims(list){
    var h = "";
    for (var i=0;i<list.length;i++) h += "<span>" + ICON[list[i][0]] + "<b style='font-weight:700'>" + list[i][1] + "</b></span>";
    return h;
  }
  function pouch(p) {
    return '<div class="cart face-pouch" style="--fbg:' + p.bg + ';--facc:' + p.acc + ';--facc2:' + p.bg + ';">' + confetti(p) +
      '<div class="crimp"></div>' +
      '<div class="plabel">' +
        '<img class="lg" src="' + LOGO + '" alt="" />' +
        '<div class="pname">' + p.name + '</div>' +
        '<div class="psub">' + p.sub + '</div>' +
        '<div class="pclaims">' + pouchClaims(p.claims) + '</div>' +
      '</div>' +
      '<div class="pfoot">GOOD SNACKS · BETTER TOMORROWS</div>' +
      '<div class="crimp b"></div></div>';
  }
  function productArt(p) {
    if (p.type === "carton") return front(F[1]);
    return pouch(p);
  }

  window.AP_FACE = { front: front, back: back, side: side, top: top, pouch: pouch };

  /* ---------------- cart (shared across pages) ---------------- */
  var KEY = "ap_cart_v1";
  function readCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function writeCart(c) {
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { }
    paintCount();
  }
  function cartCount() {
    var c = readCart(), n = 0;
    for (var k in c) if (c.hasOwnProperty(k)) n += c[k];
    return n;
  }
  function paintCount() {
    var el = document.querySelectorAll("[data-cartcount]"), n = cartCount();
    for (var i = 0; i < el.length; i++) el[i].textContent = n ? "Order (" + n + ")" : "Order";
  }
  window.AP_CART = { read: readCart, write: writeCart, count: cartCount };

  /* ---------------- pips ---------------- */
  function pips(rows) {
    var h = "";
    for (var i = 0; i < rows.length; i++) {
      var dots = "";
      for (var d = 0; d < 5; d++) dots += "<i" + (d < rows[i][1] ? ' class="on"' : "") + "></i>";
      h += "<li>" + rows[i][0] + " <span>" + dots + "</span></li>";
    }
    return h;
  }

  /* ---------------- page: sku grid ---------------- */
  function initSkus() {
    var box = document.getElementById("skus");
    if (!box) return;
    var full = box.getAttribute("data-full") === "1", h = "";
    for (var s = 0; s < F.length; s++) {
      var f = F[s];
      h += '<article class="sku" data-key="' + f.key + '">' +
        '<div class="cartbox">' + front(f) + "</div>" +
        "<h3>" + f.name + "</h3>" +
        (full
          ? '<p data-taste>' + f.taste + "</p><p data-func hidden>" + f.func + "</p>" +
            '<ul class="meter" data-taste>' + pips(f.tm) + "</ul>" +
            '<ul class="meter" data-func hidden>' + pips(f.fm) + "</ul>"
          : "<p>" + f.taste + "</p>") +
        '<div class="price">&#8377;' + f.price + ' <small>145 g carton</small>' +
        '<button class="add" data-add="' + f.key + '">Add to order</button></div></article>';
    }
    box.innerHTML = h;

    var adds = box.querySelectorAll(".add");
    for (var a = 0; a < adds.length; a++) {
      adds[a].addEventListener("click", function () {
        var c = readCart(), k = this.getAttribute("data-add");
        c[k] = (c[k] || 0) + 1;
        writeCart(c);
        this.textContent = "Added ✓";
        var btn = this;
        setTimeout(function () { btn.textContent = "Add to order"; }, 1100);
        if (!reduce) {
          var card = btn.closest(".sku");
          card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
        }
      });
    }

    var bt = document.getElementById("btnTaste"), bf = document.getElementById("btnFunc");
    if (bt && bf) {
      var show = function (which) {
        bt.setAttribute("aria-pressed", which === "taste");
        bf.setAttribute("aria-pressed", which === "func");
        var t = box.querySelectorAll("[data-taste]"), u = box.querySelectorAll("[data-func]");
        for (var i = 0; i < t.length; i++) t[i].hidden = which !== "taste";
        for (var j = 0; j < u.length; j++) u[j].hidden = which !== "func";
      };
      bt.addEventListener("click", function () { show("taste"); });
      bf.addEventListener("click", function () { show("func"); });
    }
  }

  function initRange() {
    var box = document.getElementById("range");
    if (!box) return;
    var h = "";
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      h += '<article class="sku" data-key="' + p.key + '">' +
        '<div class="cartbox">' + productArt(p) + '</div>' +
        "<h3>" + p.name + "</h3>" +
        '<p class="small" style="margin:-4px 0 0">' + p.sub + "</p>" +
        "<p>" + p.blurb + "</p>" +
        '<div class="price">&#8377;' + p.price + " " +
        (p.link
          ? '<a class="add" href="' + p.link + '">' + p.cta + "</a>"
          : '<button class="add" data-add="' + p.key + '">Add to order</button>') +
        "</div></article>";
    }
    box.innerHTML = h;
    var adds = box.querySelectorAll("button.add");
    for (var a = 0; a < adds.length; a++) {
      adds[a].addEventListener("click", function () {
        var c = readCart(), k = this.getAttribute("data-add");
        c[k] = (c[k] || 0) + 1; writeCart(c);
        var btn = this; btn.textContent = "Added \u2713";
        setTimeout(function () { btn.textContent = "Add to order"; }, 1100);
        if (!reduce) { var card = btn.closest(".sku"); card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake"); }
      });
    }
  }

  /* ---------------- page: pack explorer ---------------- */
  var NOTE = {
    front: "The front does one job: make someone want it. Flavour name, the window on the peanuts, and the three claims small at the bottom where they belong.",
    back: "Everything a regulator and a curious buyer need. Nutrition per 100 g, ingredients, the peanut allergen warning, batch fields and the vegetarian mark.",
    left: "The side panel is what people read while holding it. Claims as icons, and a line that sets up the morning without ever mentioning a hangover.",
    right: "The other side talks about the occasion rather than the product. This is where the brand sounds like a person instead of a label.",
    top: "The top faces up in a delivery crate and in a dark-store bin. Logo and promise only, because nothing else is legible from above."
  };
  function initExplorer() {
    var stage = document.getElementById("stagebox");
    if (!stage) return;
    var faceBtns = document.querySelectorAll(".faces button"),
      note = document.getElementById("facenote"),
      names = document.getElementById("flavnames"),
      flav = document.getElementById("flav"),
      faceNow = "front", flavNow = 1;

    function render() {
      var f = F[flavNow];
      stage.innerHTML = faceNow === "front" ? front(f) : faceNow === "back" ? back(f) : faceNow === "top" ? top(f) : side(f, faceNow);
      stage.style.width = (faceNow === "left" || faceNow === "right") ? "min(46%,170px)" : (faceNow === "top" ? "min(94%,420px)" : "min(88%,340px)");
      note.textContent = NOTE[faceNow];
      var n = "";
      for (var i = 0; i < F.length; i++) n += i === flavNow ? "<b>" + F[i].name + "</b>" : "<span>" + F[i].name + "</span>";
      names.innerHTML = n;
      for (var b = 0; b < faceBtns.length; b++) faceBtns[b].setAttribute("aria-pressed", faceBtns[b].getAttribute("data-face") === faceNow);
    }
    for (var i = 0; i < faceBtns.length; i++) {
      faceBtns[i].addEventListener("click", function () { faceNow = this.getAttribute("data-face"); render(); });
    }
    flav.addEventListener("input", function () { flavNow = parseInt(flav.value, 10); render(); });
    render();
  }

  /* ---------------- page: order ---------------- */
  var BUNDLES = [
    { key: "sweet", name: "Classic Sweet", sub: "145 g carton · sweet, crunchy, the crowd-pleaser", price: 99, art: "sweet" },
    { key: "tam", name: "Tamarind Chilli", sub: "145 g carton · sour, hot, the hero flavour", price: 99, art: "tam" },
    { key: "smoky", name: "Smoky Chipotle", sub: "145 g carton · dry smoke, lowest sugar", price: 99, art: "smoky" },
    { key: "trail", name: "Spicy-Sweet Trail Mix", sub: "80 g pouch · jaggery chilli, makhana, dried mango", price: 129, art: "pouch:trail" },
    { key: "nachos", name: "Loaded Nachos", sub: "60 g pouch · baked corn chips, loaded masala", price: 99, art: "pouch:nachos" },
    { key: "bites", name: "Chocolate-Banana Bites", sub: "120 g pouch · cocoa, banana, plant protein, no caffeine", price: 149, art: "pouch:bites" },
    { key: "trio", name: "The Trio", sub: "One of each flavour. The easiest way to find your one.", price: 279, art: "tam" },
    { key: "party", name: "House Party Pack", sub: "Six cartons, mixed flavours. Stock the shelf before the weekend.", price: 499, art: "smoky" }
  ];
  var FREE_AT = 499;

  function initOrder() {
    var list = document.getElementById("pick");
    if (!list) return;
    var cart = readCart(), h = "";
    for (var i = 0; i < BUNDLES.length; i++) {
      var b = BUNDLES[i], art = "";
      if (b.art.indexOf("pouch:") === 0) {
        var pk = b.art.split(":")[1];
        for (var m = 0; m < P.length; m++) if (P[m].key === pk) art = pouch(P[m]);
      } else {
        for (var j = 0; j < F.length; j++) if (F[j].key === b.art) art = front(F[j]);
      }
      h += '<div class="pickrow" data-key="' + b.key + '">' +
        '<div class="cartbox">' + art + "</div>" +
        "<div><h3>" + b.name + "</h3><p>" + b.sub + "</p><p style='margin-top:6px;font-family:var(--display);font-weight:700;color:var(--text)'>&#8377;" + b.price + "</p></div>" +
        '<div class="qty"><button data-step="-1" aria-label="Remove one ' + b.name + '">–</button>' +
        '<output data-q="' + b.key + '">' + (cart[b.key] || 0) + "</output>" +
        '<button data-step="1" aria-label="Add one ' + b.name + '">+</button></div></div>';
    }
    list.innerHTML = h;

    function priceOf(k) {
      for (var i = 0; i < BUNDLES.length; i++) if (BUNDLES[i].key === k) return BUNDLES[i].price;
      return 0;
    }
    function nameOf(k) {
      for (var i = 0; i < BUNDLES.length; i++) if (BUNDLES[i].key === k) return BUNDLES[i].name;
      return k;
    }
    function paint() {
      var c = readCart(), sub = 0, items = 0, lines = [];
      for (var k in c) {
        if (!c.hasOwnProperty(k) || !c[k]) continue;
        sub += priceOf(k) * c[k]; items += c[k];
        lines.push(c[k] + " × " + nameOf(k));
      }
      var ship = (sub === 0 || sub >= FREE_AT) ? 0 : 49;
      document.getElementById("sumitems").textContent = items ? items + (items === 1 ? " item" : " items") : "Nothing yet";
      document.getElementById("sumsub").textContent = "\u20B9" + sub;
      document.getElementById("sumship").textContent = sub === 0 ? "—" : (ship ? "\u20B9" + ship : "Free");
      document.getElementById("sumtot").textContent = "\u20B9" + (sub + ship);
      var pct = Math.min(100, Math.round(sub / FREE_AT * 100));
      document.getElementById("freebar").style.width = pct + "%";
      document.getElementById("freenote").textContent = sub >= FREE_AT
        ? "Delivery is on us."
        : "Add \u20B9" + (FREE_AT - sub) + " more for free delivery.";
      var place = document.getElementById("place");
      place.setAttribute("aria-disabled", items ? "false" : "true");
      place.style.opacity = items ? "1" : ".5";
      window.AP_ORDER_LINES = lines;
      window.AP_ORDER_TOTAL = sub + ship;
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
      var name = (document.getElementById("fname") || {}).value || "",
        phone = (document.getElementById("fphone") || {}).value || "",
        addr = (document.getElementById("faddr") || {}).value || "";
      var msg = "AFTER PARTY order\n" + window.AP_ORDER_LINES.join("\n") +
        "\nTotal: \u20B9" + window.AP_ORDER_TOTAL +
        (name ? "\nName: " + name : "") + (phone ? "\nPhone: " + phone : "") + (addr ? "\nAddress: " + addr : "");
      window.open("https://wa.me/910000000000?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------------- misc: hero, minis, bars ---------------- */
  function initBits() {
    var hs = document.getElementById("herostack");
    if (hs) hs.innerHTML = '<div class="cartbox">' + front(F[2]) + '</div><div class="cartbox">' + front(F[1]) + "</div>";

    var minis = document.querySelectorAll("[data-mini]");
    for (var i = 0; i < minis.length; i++) {
      var k = minis[i].getAttribute("data-mini");
      for (var j = 0; j < F.length; j++) if (F[j].key === k) minis[i].innerHTML = front(F[j]);
    }
    var bars = document.getElementById("bars");
    if (bars) {
      if ("IntersectionObserver" in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
        }, { threshold: .35 });
        io.observe(bars);
      } else bars.classList.add("in");
    }
    paintCount();
  }

  /* ---------------- night → morning dial ---------------- */
  var NIGHT = { bg:[26,11,36], surface:[42,16,56], text:[247,239,221], muted:[192,166,207], accent:[255,210,30], accent2:[255,90,95], line:[247,239,221] };
  var MORNING = { bg:[247,239,221], surface:[255,255,255], text:[42,11,51], muted:[110,85,120], accent:[196,138,0], accent2:[200,40,45], line:[42,11,51] };

  function lerp(a,b,t){ return a + (b-a)*t; }
  function mix(a,b,t){ return "rgb(" + Math.round(lerp(a[0],b[0],t)) + "," + Math.round(lerp(a[1],b[1],t)) + "," + Math.round(lerp(a[2],b[2],t)) + ")"; }
  function mixLine(a,b,t){ return "rgba(" + Math.round(lerp(a[0],b[0],t)) + "," + Math.round(lerp(a[1],b[1],t)) + "," + Math.round(lerp(a[2],b[2],t)) + ",.18)"; }
  function pad2(n){ return n < 10 ? "0" + n : "" + n; }

  function initDial() {
    var slider = document.getElementById("time");
    if (!slider) return;
    var root = document.documentElement,
        clock = document.getElementById("clock"),
        themeMeta = document.querySelector("meta[name=theme-color]");

    function label(t){
      var mins = Math.round(lerp(107, 480, t)), h = Math.floor(mins/60), m = mins % 60,
          ampm = h < 12 ? "am" : "pm", h12 = h % 12; if (h12 === 0) h12 = 12;
      return h12 + ":" + pad2(m) + '<span style="font-size:.62em"> ' + ampm + "</span>";
    }
    function apply(t){
      var st = root.style;
      st.setProperty("--bg", mix(NIGHT.bg, MORNING.bg, t));
      st.setProperty("--surface", mix(NIGHT.surface, MORNING.surface, t));
      st.setProperty("--text", mix(NIGHT.text, MORNING.text, t));
      st.setProperty("--muted", mix(NIGHT.muted, MORNING.muted, t));
      st.setProperty("--accent", mix(NIGHT.accent, MORNING.accent, t));
      st.setProperty("--accent2", mix(NIGHT.accent2, MORNING.accent2, t));
      st.setProperty("--line", mixLine(NIGHT.line, MORNING.line, t));
      if (clock) clock.innerHTML = label(t);
      if (themeMeta) themeMeta.setAttribute("content", mix(NIGHT.bg, MORNING.bg, t));
      root.setAttribute("data-phase", t >= 0.55 ? "morning" : "night");
      try { sessionStorage.setItem("ap_time", slider.value); } catch (e) {}
    }
    var saved = null;
    try { saved = sessionStorage.getItem("ap_time"); } catch (e) {}
    if (saved !== null) slider.value = saved;
    slider.addEventListener("input", function(){ apply(slider.value / 100); });
    apply(slider.value / 100);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBits(); initRange(); initSkus(); initExplorer(); initOrder(); initDial();
  });
})();

(function () {
  "use strict";

  var STORE_KEY = "o-veu.store.v2";
  var LEGACY_KEY = "o-veu.ficha.v1";

  var DATA = window.DATA || {};

  var ICONS = {
    heart: {
      rows: [
        "..##.##..",
        ".o######.",
        "########.",
        "########.",
        ".######..",
        "..####...",
        "...##....",
        "....#...."
      ],
      palette: { "#": "#e0556f", "+": "#a93a52", "o": "#ff9db0" }
    },
    brain: {
      rows: [
        "...####....",
        ".#########.",
        "###########",
        "####..#####",
        "####..#####",
        "####..#####",
        "###########",
        ".#########.",
        "..#######..",
        "....###...."
      ],
      palette: { "#": "#a97bd4", "+": "#7e56a8", "o": "#cfa4ef" }
    },
    person: {
      rows: [
        "....#....",
        "...###...",
        "...###...",
        "....#....",
        "..#####..",
        "..#...#..",
        "..#...#..",
        "..#...#..",
        "..#...#.."
      ],
      palette: { "#": "#d9a64b" }
    },
    info: {
      rows: [
        "..##...",
        "..##...",
        ".......",
        "..##...",
        "..##...",
        "..##...",
        "..##..."
      ],
      palette: { "#": "#d9a64b" }
    },
    dot: {
      rows: [
        ".###.",
        "#####",
        "#####",
        "#####",
        ".###."
      ],
      palette: { "#": "#ffffff" }
    },
    estrela: {
      rows: [
        "...#...",
        "..#.#..",
        ".#...#.",
        "#######",
        ".#...#.",
        "..#.#..",
        "...#..."
      ],
      palette: { "#": "#d9a64b" }
    },
    espada: {
      rows: [
        "....#....",
        "....#....",
        "....#....",
        "...###...",
        "...#.#...",
        "...#.#...",
        "...#.#...",
        "..#...#..",
        "...#....."
      ],
      palette: { "#": "#8b91a5" }
    },
    livro: {
      rows: [
        "..#####..",
        "..#...#..",
        "..#####..",
        "..#...#..",
        "..#####..",
        "..#...#..",
        "..#####..",
        "..#...#.."
      ],
      palette: { "#": "#8b91a5" }
    },
    lapis: {
      rows: [
        "......##.",
        ".....##..",
        "....##...",
        "...##....",
        "..##.....",
        ".##......",
        "##.......",
        "........o"
      ],
      palette: { "#": "#8b91a5", "o": "#e0655a" }
    }
  };

  var DICE_ICONS = {
    "erro-critico": { icon: "dot", color: "#e0454f" },
    "erro": { icon: "dot", color: "#e0655a" },
    "erro-complicacao": { icon: "dot", color: "#e08a3c" },
    "acerto-complicacao": { icon: "dot", color: "#e0c23c" },
    "acerto": { icon: "dot", color: "#6fbf8f" },
    "acerto-critico": { icon: "estrela", color: "#d9a64b" }
  };

  function defaultState() {
    return {
      identity: { name: "", classId: "" },
      attributes: {},
      attributesLocked: false,
      resources: {
        hp: { current: 0, max: 0 },
        stress: { current: 0, max: 0 }
      },
      abilityId: "",
      weapons: [],
      items: [],
      grantedItems: [],
      npcs: [],
      places: [],
      notes: ""
    };
  }

  function merge(target, source) {
    for (var k in source) {
      if (source[k] && typeof source[k] === "object" && !Array.isArray(source[k]) &&
          target[k] && typeof target[k] === "object" && !Array.isArray(target[k])) {
        merge(target[k], source[k]);
      } else if (source[k] !== undefined) {
        target[k] = source[k];
      }
    }
    return target;
  }

  function defaultStore() {
    return { activeId: "", characters: [] };
  }

  function loadStore() {
    var store;
    try {
      var raw = localStorage.getItem(STORE_KEY);
      store = raw ? JSON.parse(raw) : defaultStore();
    } catch (err) {
      store = defaultStore();
    }
    if (!store || !Array.isArray(store.characters)) store = defaultStore();

    if (!store.characters.length) {
      try {
        var old = localStorage.getItem(LEGACY_KEY);
        if (old) {
          var data = merge(defaultState(), JSON.parse(old));
          store.characters.push({ id: uid(), createdAt: Date.now(), data: data });
          store.activeId = store.characters[0].id;
          localStorage.removeItem(LEGACY_KEY);
        }
      } catch (err) {}
    }

    store.characters.forEach(function (c) {
      if (!c || !c.data || typeof c.data !== "object") {
        if (c) c.data = defaultState();
        return;
      }
      c.data = merge(defaultState(), c.data);
    });

    return store;
  }

  var STORE = loadStore();
  var state;

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(STORE));
    } catch (err) {}
  }

  function save() {
    var c = activeChar();
    if (c) c.data = state;
    saveStore();
  }

  function activeChar() {
    for (var i = 0; i < STORE.characters.length; i++) {
      if (STORE.characters[i].id === STORE.activeId) return STORE.characters[i];
    }
    return null;
  }

  function newCharacter() {
    var c = { id: uid(), createdAt: Date.now(), data: defaultState() };
    STORE.characters.push(c);
    return c;
  }

  function ensureActive() {
    if (!activeChar()) {
      if (!STORE.characters.length) newCharacter();
      STORE.activeId = STORE.characters[0].id;
    }
    state = activeChar().data;
    normalizeWeapons();
  }

  function normalizeWeapons() {
    if (!Array.isArray(state.weapons)) state.weapons = [];
    var cat = DATA.weapons || [];
    state.weapons.forEach(function (w) {
      var match = null;
      for (var i = 0; i < cat.length; i++) {
        if (String(cat[i].name).trim().toLowerCase() === String(w.name).trim().toLowerCase()) {
          match = cat[i];
          break;
        }
      }
      if (match) {
        w.distance = match.distance;
        w.fixed = true;
        w.category = match.category;
      }
    });
  }

  function $(id) {
    return document.getElementById(id);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function placeholder(text) {
    var p = document.createElement("p");
    p.className = "placeholder";
    p.textContent = text;
    return p;
  }

  function focusLast(container, selector) {
    var all = container.querySelectorAll(selector);
    if (!all.length) return;
    all[all.length - 1].focus();
  }

  function pixelIcon(icon, scale, paletteOverride) {
    var rows = icon.rows;
    var palette = icon.palette;
    if (paletteOverride) {
      palette = Object.assign({}, icon.palette, paletteOverride);
    }
    var h = rows.length;
    var w = rows[0].length;
    var canvas = document.createElement("canvas");
    canvas.width = w * scale;
    canvas.height = h * scale;
    canvas.className = "pixel-icon";
    canvas.setAttribute("aria-hidden", "true");
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var ch = rows[y].charAt(x);
        if (ch === "." || ch === " ") continue;
        ctx.fillStyle = palette[ch] || palette["#"];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    return canvas;
  }

  function injectIcons() {
    $("icon-hp").appendChild(pixelIcon(ICONS.heart, 3));
    $("icon-stress").appendChild(pixelIcon(ICONS.brain, 3));
    $("icon-chars").appendChild(pixelIcon(ICONS.person, 2));
    $("icon-info").appendChild(pixelIcon(ICONS.info, 2));
    $("icon-tab-ficha").appendChild(pixelIcon(ICONS.person, 2));
    $("icon-tab-equip").appendChild(pixelIcon(ICONS.espada, 2));
    $("icon-tab-registro").appendChild(pixelIcon(ICONS.livro, 2));
    $("icon-tab-anotacoes").appendChild(pixelIcon(ICONS.lapis, 2));
  }

  function findClass(id) {
    for (var i = 0; i < DATA.classes.length; i++) {
      if (DATA.classes[i].id === id) return DATA.classes[i];
    }
    return null;
  }

  function findWeapon(id) {
    var list = DATA.weapons || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function renderClassSelect() {
    var sel = $("classe");
    sel.innerHTML = "";

    if (state.identity.classId && !DATA.classes.some(function (c) { return c.id === state.identity.classId; })) {
      state.identity.classId = "";
      save();
    }

    var none = document.createElement("option");
    none.value = "";
    none.textContent = "— selecione a classe —";
    sel.appendChild(none);

    DATA.classes.forEach(function (cls) {
      var opt = document.createElement("option");
      opt.value = cls.id;
      opt.textContent = cls.name;
      sel.appendChild(opt);
    });

    sel.value = state.identity.classId;
  }

  function applyInitialHp(cls) {
    if (!cls || cls.initialHp == null) return;
    var hp = state.resources.hp;
    hp.max = cls.initialHp;
    hp.current = cls.initialHp;
  }

  function grantClassItems(cls) {
    if (!cls || !cls.initialItems) return;
    if (state.grantedItems.indexOf(cls.id) !== -1) return;
    cls.initialItems.forEach(function (name) {
      var exists = state.items.some(function (it) {
        return String(it.name).trim().toLowerCase() === String(name).trim().toLowerCase();
      });
      if (!exists) {
        state.items.push({ id: uid(), name: name, quantity: 1, description: "" });
      }
    });
    state.grantedItems.push(cls.id);
  }

  function renderClassDescription() {
    var cls = findClass(state.identity.classId);
    $("class-desc").textContent = cls ? (cls.description || "") : "";
  }

  function renderAttributes() {
    var box = $("atributos");
    box.innerHTML = "";

    if (!DATA.attributes.length) {
      box.appendChild(placeholder("Os atributos serão adicionados em breve."));
      return;
    }

    if (state.attributesLocked && allAttributesAssigned()) {
      renderAttributeSummary(box);
      return;
    }

    var values = DATA.attributeValues || [];

    DATA.attributes.forEach(function (attr) {
      var current = state.attributes[attr.id];

      var row = document.createElement("div");
      row.className = "attr-row";

      var info = document.createElement("div");
      info.className = "attr-info";

      var name = document.createElement("div");
      name.className = "attr-name";
      name.textContent = attr.name;

      info.appendChild(name);

      if (attr.description) {
        var desc = document.createElement("div");
        desc.className = "attr-desc";
        desc.textContent = attr.description;
        info.appendChild(desc);
      }

      row.appendChild(info);

      var valuesBox = document.createElement("div");
      valuesBox.className = "attr-values";

      values.forEach(function (v) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "attr-btn" + (current === v ? " selected" : "");
        btn.textContent = (v > 0 ? "+" : "") + v;
        btn.setAttribute("aria-label", attr.name + ": " + (v > 0 ? "+" : "") + v);

        var takenBy = false;
        for (var key in state.attributes) {
          if (key !== attr.id && state.attributes[key] === v) { takenBy = true; break; }
        }
        if (takenBy && current !== v) btn.classList.add("used");

        btn.addEventListener("click", function () {
          if (current === v) {
            delete state.attributes[attr.id];
            state.attributesLocked = false;
          } else {
            state.attributes[attr.id] = v;
            for (var k in state.attributes) {
              if (k !== attr.id && state.attributes[k] === v) delete state.attributes[k];
            }
            if (allAttributesAssigned()) state.attributesLocked = true;
          }
          save();
          renderAttributes();
        });

        valuesBox.appendChild(btn);
      });

      row.appendChild(valuesBox);
      box.appendChild(row);
    });
  }

  function allAttributesAssigned() {
    var all = true;
    DATA.attributes.forEach(function (attr) {
      if (state.attributes[attr.id] == null) all = false;
    });
    return all;
  }

  function renderAttributeSummary(box) {
    var wrap = document.createElement("div");
    wrap.className = "attr-summary";

    DATA.attributes.forEach(function (attr) {
      var chip = document.createElement("span");
      chip.className = "attr-chip";
      var v = state.attributes[attr.id];
      chip.textContent = attr.name + " " + (v > 0 ? "+" : "") + v;
      if (v > 0) chip.classList.add("pos");
      else if (v < 0) chip.classList.add("neg");
      wrap.appendChild(chip);
    });

    box.appendChild(wrap);

    var edit = document.createElement("button");
    edit.type = "button";
    edit.className = "btn-ghost btn-edit-attrs";
    edit.textContent = "Editar atributos";
    edit.addEventListener("click", function () {
      state.attributesLocked = false;
      save();
      renderAttributes();
    });

    box.appendChild(edit);
  }

  function renderResources() {
    var cls = findClass(state.identity.classId);
    var clsName = cls ? cls.name : "";

    ["hp", "stress"].forEach(function (key) {
      var res = state.resources[key];
      var inp = $("res-" + key + "-current");
      inp.value = res.current;

      var suffix = key === "hp" ? "vida" : "estresse";
      $("res-" + key + "-sub").textContent =
        (clsName ? clsName + " · " : "") + res.current + " de " + suffix;
    });
  }

  function bindResources() {
    document.querySelectorAll(".btn-step").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.dataset.res;
        var dir = parseInt(btn.dataset.dir, 10);
        var res = state.resources[key];
        if (!res) return;
        res.current = Math.max(0, res.current + dir);
        save();
        renderResources();
      });
    });

    document.querySelectorAll(".res-final").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var key = inp.dataset.res;
        var res = state.resources[key];
        if (!res) return;
        res.current = Math.max(0, Math.floor(inp.valueAsNumber || 0));
        inp.value = res.current;
        save();
        renderResources();
      });
    });
  }

  function renderAbilities() {
    var box = $("habilidades");
    var choice = $("ability-choice");
    box.innerHTML = "";
    choice.textContent = "";

    var cls = findClass(state.identity.classId);

    if (!cls) {
      box.appendChild(placeholder("Escolha uma classe para ver as habilidades."));
      return;
    }

    var abilities = cls.abilities || [];
    if (!abilities.length) {
      box.appendChild(placeholder("As habilidades desta classe serão adicionadas em breve."));
      return;
    }

    if (!abilities.some(function (a) { return a.id === state.abilityId; })) {
      state.abilityId = "";
      save();
    }

    abilities.forEach(function (ab) {
      var label = document.createElement("label");
      label.className = "ability" + (state.abilityId === ab.id ? " selected" : "");

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "habilidade";
      radio.value = ab.id;
      radio.checked = state.abilityId === ab.id;
      radio.addEventListener("change", function () {
        state.abilityId = ab.id;
        save();
        renderAbilities();
      });

      var txt = document.createElement("div");
      txt.className = "ability-text";

      var name = document.createElement("div");
      name.className = "ability-name";
      name.textContent = ab.name;

      var desc = document.createElement("div");
      desc.className = "ability-desc";
      desc.textContent = ab.description || "";

      txt.appendChild(name);
      txt.appendChild(desc);
      label.appendChild(radio);
      label.appendChild(txt);
      box.appendChild(label);
    });

    var chosen = null;
    for (var j = 0; j < abilities.length; j++) {
      if (abilities[j].id === state.abilityId) { chosen = abilities[j]; break; }
    }
    if (chosen) {
      choice.textContent = "Habilidade escolhida: " + chosen.name;
    }
  }

  function improvisedWeapon(w) {
    return !!(w && String(w.category || "").toLowerCase().indexOf("improvis") !== -1);
  }

  function starSlotEl(w) {
    var span = document.createElement("span");
    span.className = "w-star";
    if (improvisedWeapon(w)) {
      span.appendChild(pixelIcon(ICONS.estrela, 2));
    }
    return span;
  }

  function weaponRow(w, i) {
    var row = document.createElement("div");
    row.className = "weapon-row";
    row.dataset.i = i;

    var opts = DATA.weaponDistances.map(function (d) {
      return '<option value="' + esc(d) + '"' + (w.distance === d ? " selected" : "") + ">" + esc(d) + "</option>";
    }).join("");

    var distHtml = w.fixed
      ? '<span class="w-dist-txt">' + esc(w.distance || "") + '</span>'
      : '<select class="w-dist">' + opts + '</select>';

    row.innerHTML =
      '<div class="weapon-line1">' +
        '<input class="w-name" type="text" placeholder="Nome da arma" value="' + esc(w.name) + '">' +
        '<button class="btn-del" type="button" aria-label="Remover arma">×</button>' +
      '</div>' +
      '<div class="weapon-fields">' +
        '<label class="wfield"><span>Distância</span>' + distHtml + '</label>' +
        '<label class="wfield"><span>Dano</span>' +
          '<input class="w-dmg" type="text" placeholder="1d6" value="' + esc(w.damage) + '">' +
        '</label>' +
      '</div>';

    row.querySelector(".weapon-line1").insertBefore(starSlotEl(w), row.querySelector(".weapon-line1").firstChild);

    return row;
  }

  function renderWeaponPicker() {
    var sel = $("weapon-picker");
    sel.innerHTML = "";

    var none = document.createElement("option");
    none.value = "";
    none.textContent = "— escolha uma arma —";
    sel.appendChild(none);

    var categories = {};
    (DATA.weapons || []).forEach(function (w) {
      (categories[w.category] = categories[w.category] || []).push(w);
    });

    Object.keys(categories).forEach(function (cat) {
      var g = document.createElement("optgroup");
      g.label = cat;
      categories[cat].forEach(function (w) {
        var opt = document.createElement("option");
        opt.value = w.id;
        opt.textContent = w.name + " — " + w.distance + ", " + w.damage;
        g.appendChild(opt);
      });
      sel.appendChild(g);
    });

    var customG = document.createElement("optgroup");
    customG.label = "Outros";
    var custom = document.createElement("option");
    custom.value = "__custom__";
    custom.textContent = "Nova arma personalizada";
    customG.appendChild(custom);
    sel.appendChild(customG);
  }

  function renderWeapons() {
    var box = $("armas");
    box.innerHTML = "";

    if (!state.weapons.length) {
      box.appendChild(placeholder("Nenhuma arma registrada."));
    }

    state.weapons.forEach(function (w, i) {
      box.appendChild(weaponRow(w, i));
    });
  }

  function bindWeapons() {
    var box = $("armas");

    box.addEventListener("input", function (e) {
      var row = e.target.closest(".weapon-row");
      if (!row) return;
      var w = state.weapons[parseInt(row.dataset.i, 10)];
      if (!w) return;
      if (e.target.classList.contains("w-name")) w.name = e.target.value;
      else if (e.target.classList.contains("w-dmg")) w.damage = e.target.value;
      save();
    });

    box.addEventListener("change", function (e) {
      var row = e.target.closest(".weapon-row");
      if (!row) return;
      var w = state.weapons[parseInt(row.dataset.i, 10)];
      if (!w) return;
      if (e.target.classList.contains("w-dist")) w.distance = e.target.value;
      save();
    });

    box.addEventListener("click", function (e) {
      var del = e.target.closest(".btn-del");
      if (!del) return;
      var i = parseInt(del.closest(".weapon-row").dataset.i, 10);
      state.weapons.splice(i, 1);
      save();
      renderWeapons();
    });
  }

  function itemRow(it, i) {
    var row = document.createElement("div");
    row.className = "item-row";
    row.dataset.i = i;

    row.innerHTML =
      '<div class="item-line1">' +
        '<input class="it-name" type="text" placeholder="Nome do item" value="' + esc(it.name) + '">' +
        '<label class="qty"><span>Qtd</span>' +
          '<input class="it-qty" type="number" min="0" value="' + esc(it.quantity) + '">' +
        '</label>' +
        '<button class="btn-del" type="button" aria-label="Remover item">×</button>' +
      '</div>' +
      '<input class="it-desc" type="text" placeholder="Descrição (opcional)" value="' + esc(it.description || "") + '">';

    return row;
  }

  function renderItems() {
    var box = $("itens");
    box.innerHTML = "";

    if (!state.items.length) {
      box.appendChild(placeholder("Nenhum item registrado."));
    }

    state.items.forEach(function (it, i) {
      box.appendChild(itemRow(it, i));
    });
  }

  function bindItems() {
    var box = $("itens");

    box.addEventListener("input", function (e) {
      var row = e.target.closest(".item-row");
      if (!row) return;
      var it = state.items[parseInt(row.dataset.i, 10)];
      if (!it) return;
      if (e.target.classList.contains("it-name")) it.name = e.target.value;
      else if (e.target.classList.contains("it-qty")) {
        var q = e.target.valueAsNumber;
        it.quantity = isNaN(q) || q < 0 ? 0 : Math.floor(q);
      } else if (e.target.classList.contains("it-desc")) it.description = e.target.value;
      save();
    });

    box.addEventListener("click", function (e) {
      var del = e.target.closest(".btn-del");
      if (!del) return;
      var i = parseInt(del.closest(".item-row").dataset.i, 10);
      state.items.splice(i, 1);
      save();
      renderItems();
    });
  }

  function renderDiceTable() {
    var box = $("dice-table");
    box.innerHTML = "";
    (DATA.diceTable || []).forEach(function (r) {
      var item = document.createElement("div");
      item.className = "dice-row";

      var icon = document.createElement("span");
      icon.className = "dice-icon";
      var d = DICE_ICONS[r.icon];
      if (d) {
        var ov = d.icon === "dot" ? { "#": d.color } : null;
        icon.appendChild(pixelIcon(ICONS[d.icon], 2, ov));
      }
      item.appendChild(icon);

      var range = document.createElement("span");
      range.className = "dice-range";
      range.textContent = r.min === r.max ? String(r.min) : r.min + "–" + r.max;
      item.appendChild(range);

      var info = document.createElement("div");
      info.className = "dice-info";
      var label = document.createElement("div");
      label.className = "dice-label";
      label.textContent = r.label;
      var desc = document.createElement("div");
      desc.className = "dice-desc";
      desc.textContent = r.description;
      info.appendChild(label);
      info.appendChild(desc);
      item.appendChild(info);

      box.appendChild(item);
    });
  }

  function npcRow(n, i) {
    var row = document.createElement("div");
    row.className = "npc-row";
    row.dataset.i = i;
    row.setAttribute("role", "button");
    row.tabIndex = 0;

    var name = (n.name || "").trim() || "NPC sem nome";
    var preview = (n.info || "").trim() || "Sem informações";

    row.innerHTML =
      '<div class="note-item">' +
        '<div class="note-item-txt">' +
          '<div class="note-item-name">' + esc(name) + '</div>' +
          '<div class="note-item-preview">' + esc(preview) + '</div>' +
        '</div>' +
        '<span class="note-chev">›</span>' +
      '</div>';

    return row;
  }

  function renderNpcs() {
    var box = $("npcs");
    box.innerHTML = "";

    if (!state.npcs.length) {
      box.appendChild(placeholder("Nenhum NPC registrado."));
    }

    state.npcs.forEach(function (n, i) {
      box.appendChild(npcRow(n, i));
    });
  }

  function bindNpcs() {
    var box = $("npcs");

    box.addEventListener("click", function (e) {
      var row = e.target.closest(".npc-row");
      if (!row) return;
      openNote("npc", parseInt(row.dataset.i, 10));
    });

    box.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var row = e.target.closest(".npc-row");
      if (!row) return;
      e.preventDefault();
      openNote("npc", parseInt(row.dataset.i, 10));
    });
  }

  function placeRow(p, i) {
    var row = document.createElement("div");
    row.className = "place-row";
    row.dataset.i = i;
    row.setAttribute("role", "button");
    row.tabIndex = 0;

    var name = (p.name || "").trim() || "Lugar sem nome";
    var preview = (p.notes || "").trim() || "Sem anotações";

    row.innerHTML =
      '<div class="note-item">' +
        '<div class="note-item-txt">' +
          '<div class="note-item-name">' + esc(name) + '</div>' +
          '<div class="note-item-preview">' + esc(preview) + '</div>' +
        '</div>' +
        '<span class="note-chev">›</span>' +
      '</div>';

    return row;
  }

  function renderPlaces() {
    var box = $("lugares");
    box.innerHTML = "";

    if (!state.places.length) {
      box.appendChild(placeholder("Nenhum lugar registrado."));
    }

    state.places.forEach(function (p, i) {
      box.appendChild(placeRow(p, i));
    });
  }

  function bindPlaces() {
    var box = $("lugares");

    box.addEventListener("click", function (e) {
      var row = e.target.closest(".place-row");
      if (!row) return;
      openNote("lugar", parseInt(row.dataset.i, 10));
    });

    box.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var row = e.target.closest(".place-row");
      if (!row) return;
      e.preventDefault();
      openNote("lugar", parseInt(row.dataset.i, 10));
    });
  }

  var noteData = { type: "npc", index: -1 };

  function openNote(type, index) {
    noteData.type = type;
    noteData.index = index;

    var isNew = index < 0;
    var item = null;
    var list = type === "npc" ? state.npcs : state.places;
    if (!isNew) item = list[index];

    var label = type === "npc" ? "NPC" : "Lugar";

    $("note-title").textContent = isNew ? "Novo " + label.toLowerCase() : "Editar " + label.toLowerCase();
    $("note-name").placeholder = label === "NPC" ? "Nome do NPC" : "Nome do lugar";
    $("note-text").placeholder = label === "NPC" ? "Informações sobre este NPC..." : "Anotações sobre este lugar...";
    $("note-name").value = item ? item.name : "";
    $("note-text").value = item ? (type === "npc" ? item.info : item.notes) : "";

    $("note-delete").classList.toggle("hidden", isNew);

    $("note-overlay").classList.remove("hidden");
    $("note-name").focus();
  }

  function saveNote() {
    if (!Array.isArray(state.npcs)) state.npcs = [];
    if (!Array.isArray(state.places)) state.places = [];

    var name = $("note-name").value.trim();
    var text = $("note-text").value;
    var isNew = noteData.index < 0;

    if (noteData.type === "npc") {
      if (isNew) {
        state.npcs.push({ id: uid(), name: name, info: text });
      } else {
        var n = state.npcs[noteData.index];
        if (n) { n.name = name; n.info = text; }
      }
      renderNpcs();
    } else {
      if (isNew) {
        state.places.push({ id: uid(), name: name, notes: text });
      } else {
        var p = state.places[noteData.index];
        if (p) { p.name = name; p.notes = text; }
      }
      renderPlaces();
    }

    save();
    closeNote();
  }

  function deleteNote() {
    if (noteData.index < 0) return;
    var msg = noteData.type === "npc" ? "Excluir este NPC?" : "Excluir este lugar?";
    if (!confirm(msg)) return;

    if (noteData.type === "npc") {
      state.npcs.splice(noteData.index, 1);
      renderNpcs();
    } else {
      state.places.splice(noteData.index, 1);
      renderPlaces();
    }

    save();
    closeNote();
  }

  function closeNote() {
    $("note-overlay").classList.add("hidden");
  }

  function bindNoteModal() {
    $("btn-add-npc").addEventListener("click", function () {
      openNote("npc", -1);
    });

    $("btn-add-lugar").addEventListener("click", function () {
      openNote("lugar", -1);
    });

    $("note-save").addEventListener("click", saveNote);
    $("note-cancel").addEventListener("click", closeNote);
    $("note-delete").addEventListener("click", deleteNote);

    $("note-overlay").addEventListener("click", function (e) {
      if (e.target === this) closeNote();
    });

    $("note-overlay").addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNote();
    });
  }

  function switchTab(name) {
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === name);
    });
    document.querySelectorAll(".tab-page").forEach(function (p) {
      p.classList.toggle("active", p.id === "tab-" + name);
    });
  }

  function updateCharName() {
    var name = state.identity.name && state.identity.name.trim() ? state.identity.name : "Ficha de personagem";
    $("char-name").textContent = name;
  }

  function renderCharList() {
    var box = $("char-list");
    box.innerHTML = "";

    if (!STORE.characters.length) {
      box.appendChild(placeholder("Nenhum personagem ainda."));
      return;
    }

    STORE.characters.forEach(function (c) {
      var item = document.createElement("div");
      item.className = "char-item" + (c.id === STORE.activeId ? " active" : "");

      var cname = c.data.identity.name && c.data.identity.name.trim() ? c.data.identity.name : "Personagem sem nome";
      var cls = findClass(c.data.identity.classId);

      var open = document.createElement("button");
      open.type = "button";
      open.className = "char-open";
      open.textContent = cname + (cls ? " — " + cls.name : "");
      open.addEventListener("click", function () {
        switchTo(c.id);
        closeChars();
      });

      var del = document.createElement("button");
      del.type = "button";
      del.className = "btn-del";
      del.textContent = "×";
      del.setAttribute("aria-label", "Excluir " + cname);
      del.addEventListener("click", function () {
        if (confirm("Excluir o personagem \"" + cname + "\"?\nEsta ação não pode ser desfeita.")) {
          STORE.characters = STORE.characters.filter(function (x) { return x.id !== c.id; });
          if (STORE.activeId === c.id) {
            if (!STORE.characters.length) {
              newCharacter();
            }
            STORE.activeId = STORE.characters[0].id;
            state = activeChar().data;
          }
          saveStore();
          renderCharList();
          refreshAll();
        }
      });

      item.appendChild(open);
      item.appendChild(del);
      box.appendChild(item);
    });
  }

  function openChars() {
    renderCharList();
    $("char-overlay").classList.remove("hidden");
  }

  function closeChars() {
    $("char-overlay").classList.add("hidden");
  }

  function switchTo(id) {
    STORE.activeId = id;
    state = activeChar().data;
    saveStore();
    refreshAll();
  }

  function refreshAll() {
    $("nome").value = state.identity.name;
    $("anotacoes").value = state.notes;
    renderClassSelect();
    renderClassDescription();
    renderWeaponPicker();
    renderAttributes();
    renderAbilities();
    renderResources();
    renderWeapons();
    renderItems();
    renderNpcs();
    renderPlaces();
    updateCharName();
  }

  function bindEvents() {
    $("nome").addEventListener("input", function (e) {
      state.identity.name = e.target.value;
      save();
      updateCharName();
    });

    $("anotacoes").addEventListener("input", function (e) {
      state.notes = e.target.value;
      save();
    });

    $("classe").addEventListener("change", function (e) {
      state.identity.classId = e.target.value;
      state.abilityId = "";
      var cls = findClass(state.identity.classId);
      applyInitialHp(cls);
      grantClassItems(cls);
      save();
      renderClassDescription();
      renderAbilities();
      renderResources();
      renderItems();
    });

    $("btn-add-weapon").addEventListener("click", function () {
      var pick = $("weapon-picker").value;
      if (!pick) return;
      if (pick === "__custom__") {
        state.weapons.push({
          id: uid(),
          name: "",
          distance: (DATA.weaponDistances && DATA.weaponDistances[0]) || "",
          damage: ""
        });
      } else {
        var w = findWeapon(pick);
        if (w) {
          state.weapons.push({ id: uid(), name: w.name, distance: w.distance, damage: w.damage, fixed: true, category: w.category });
        }
      }
      $("weapon-picker").value = "";
      $("btn-add-weapon").disabled = true;
      save();
      renderWeapons();
      focusLast($("armas"), ".w-name");
    });

    $("weapon-picker").addEventListener("change", function () {
      $("btn-add-weapon").disabled = !this.value;
    });

    $("btn-add-item").addEventListener("click", function () {
      state.items.push({ id: uid(), name: "", quantity: 1, description: "" });
      save();
      renderItems();
      focusLast($("itens"), ".it-name");
    });

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        switchTab(tab.dataset.tab);
      });
    });

    $("btn-info").addEventListener("click", function () {
      renderDiceTable();
      $("info-overlay").classList.remove("hidden");
    });

    $("btn-close-info").addEventListener("click", function () {
      $("info-overlay").classList.add("hidden");
    });

    $("info-overlay").addEventListener("click", function (e) {
      if (e.target === this) this.classList.add("hidden");
    });

    $("btn-chars").addEventListener("click", openChars);

    $("btn-close-chars").addEventListener("click", closeChars);

    $("char-overlay").addEventListener("click", function (e) {
      if (e.target === this) closeChars();
    });

    $("btn-new-char").addEventListener("click", function () {
      var c = newCharacter();
      STORE.activeId = c.id;
      state = c.data;
      saveStore();
      closeChars();
      refreshAll();
    });

    $("btn-reset").addEventListener("click", function () {
      if (confirm("Limpar a ficha atual?\nOs dados deste personagem serão apagados.")) {
        var c = activeChar();
        if (c) {
          c.data = defaultState();
          state = c.data;
          saveStore();
          refreshAll();
        }
        closeChars();
      }
    });
  }

  function init() {
    ensureActive();
    bindResources();
    bindWeapons();
    bindItems();
    bindNpcs();
    bindPlaces();
    bindNoteModal();
    injectIcons();
    bindEvents();
    refreshAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

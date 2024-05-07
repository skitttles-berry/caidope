const o = window.Caido, P = () => {
  let r = [];
  return document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(t, n, i) {
    var s, g;
    let e = (g = (s = t.querySelector('div[data-column-id="ID"]')) == null ? void 0 : s.querySelector(".c-item-cell__inner")) == null ? void 0 : g.textContent;
    e != null && e !== "" ? r.push(e) : console.error("Request ID : " + t.querySelector('div[data-column-id="ID"]') + "has no value.");
  }), r;
}, p = (r) => {
  for (const t of P())
    t != "" && window.Caido.graphql.updateRequestMetadata({ id: t, input: { color: r } });
}, R = async () => {
  var s, g, m, u;
  let r = [], t = "", n = "", i;
  const e = P();
  for (let c = 0; c < e.length; c++)
    if (e[c] !== "")
      i = await o.graphql.request({ id: e[c] }), r[c] = `[ HTTP Request ]\r
`, r[c] += x(((s = (await i).request) == null ? void 0 : s.raw) || ""), r[c] += `[ HTTP Response ]\r
`, n = (m = (g = (await i).request) == null ? void 0 : g.response) == null ? void 0 : m.id, r[c] += x(((u = (await o.graphql.response({ id: n })).response) == null ? void 0 : u.raw) || "");
    else
      continue;
  t += r.join(`\r
\r
`), S(t), console.log(t);
}, S = async (r) => {
  try {
    if (I() === "Safari") {
      const t = new ClipboardItem({
        "text/plain": _().then((n) => {
          if (!n)
            return new Promise(async (e) => {
              const s = "";
              e(new Blob([s]));
            });
          const i = r;
          return new Promise(async (e) => {
            e(new Blob([i], { type: "text/plain" }));
          });
        })
      });
      navigator.clipboard.write([t]);
    } else
      await navigator.clipboard.writeText(r);
  } catch (t) {
    console.error(`❗ ERROR : Failed to Clipboard copy
` + t);
  }
}, x = (r) => {
  var w, y, f, C, b, q, H, v;
  if (r === "" || r === null || r === void 0)
    return `\r
\r
`;
  let t = r.split(`\r
\r
`), n = t.slice(0, 1).join(""), i = t.slice(1).join(`\r
\r
`), e = "";
  const s = /\r\nContent\-Type\:\s(text\/|application\/json|application\/xml|application\/http)/i, g = /^(GET|HEAD|OPTIONS|TRACE).*$/gi, m = /Content\-Type\:\smultipart\/(form\-data|mixed)/gi, u = new RegExp(`boundary\\=\\"?([-a-zA-Z0-9'\\(\\)+_,-.\\/:=? ]*)(?<! )\\"?`, "gi"), c = /\\x00/gi, T = /\@\@/gi;
  if (n.search(g) !== -1)
    i = "";
  else if (i.length > 0 && n.search(m) !== -1 && n.search(u) !== -1) {
    let d = ((w = n.match(u)) == null ? void 0 : w.toString()) || "";
    d = ((y = d.split("=")[1]) == null ? void 0 : y.trim()) || "--", d = ((f = i.match(`--${d}`)) == null ? void 0 : f.toString()) || "----";
    let h = "", l = i.split(d);
    if (l.length > 1) {
      for (let a = 1; a < l.length - 1; a++) {
        if (h += d, l[a] === void 0 || l[a] === null || ((C = l[a]) == null ? void 0 : C.trimEnd().length) === 0) {
          h += `\r
`;
          continue;
        }
        ((b = l[a]) == null ? void 0 : b.search(/Content\-Type\:\s.*/gi)) !== -1 && ((q = l[a]) == null ? void 0 : q.search(s)) === -1 ? h += (H = l[a]) == null ? void 0 : H.replace(/\r\n\r\n[\s\S]*/, `\r
\r
...data...\r
`) : l[a].length > 5e3 ? h += ((v = l[a]) == null ? void 0 : v.substring(0, 5e3)) + `\r
...\r
` : h += l[a], a === l.length - 2 && (h += d + "--");
      }
      i = h, e = n + `\r
\r
` + i;
    }
  } else
    n.search(/Content\-Type\:\s.*/gi) !== -1 && n.search(s) === -1 && (i = "...data...");
  return n.length > 5e3 && (n = n.substring(0, 5e3) + `\r
...`), i.length > 5e3 && (i = i.substring(0, 5e3) + `\r
...`), e = n + `\r
\r
` + i, e = e.replace(c, "&#0;"), e = e.replace(T, "&#64;&#64;"), e = e.trimEnd() + `\r
\r
`, e;
}, I = () => {
  const r = [
    "Chrome",
    "Opera",
    "WebTV",
    "Whale",
    "Beonex",
    "Chimera",
    "NetPositive",
    "Phoenix",
    "Firefox",
    "Safari",
    "SkipStone",
    "Netscape",
    "Mozilla"
  ], t = window.navigator.userAgent.toLowerCase();
  return t.includes("edg") ? "Edge" : t.includes("trident") || t.includes("msie") ? "Internet Explorer" : r.find((n) => t.includes(n.toLowerCase())) || "Other";
}, _ = async () => (console.log("Copy requests & responses"), !0);
o.commands.register("Copy request & response", {
  name: "Copy request & response",
  run: () => {
    R();
  }
});
o.commands.register("Highlight: Red", {
  name: "Highlight: Red",
  run: () => {
    p("var(--c-highlight-color-red)");
  }
});
o.commands.register("Highlight: Green", {
  name: "Highlight: Green",
  run: () => {
    p("var(--c-highlight-color-green)");
  }
});
o.commands.register("Highlight: Blue", {
  name: "Highlight: Blue",
  run: () => {
    p("var(--c-highlight-color-blue)");
  }
});
o.commands.register("Highlight: Purple", {
  name: "Highlight: Purple",
  run: () => {
    p("var(--c-highlight-color-purple)");
  }
});
o.commands.register("Highlight: Black", {
  name: "Highlight: Black",
  run: () => {
    p("var(--c-highlight-color-black)");
  }
});
o.commandPalette.register("Copy request & response");
o.commandPalette.register("Highlight: Red");
o.commandPalette.register("Highlight: Green");
o.commandPalette.register("Highlight: Blue");
o.commandPalette.register("Highlight: Purple");
o.commandPalette.register("Highlight: Black");

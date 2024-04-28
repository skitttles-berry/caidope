const t = window.Caido, u = () => {
  let e = [];
  return document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(r, o, l) {
    var i, g;
    let a = (g = (i = r.querySelector('div[data-column-id="ID"]')) == null ? void 0 : i.querySelector(".c-item-cell__inner")) == null ? void 0 : g.textContent;
    a != null && e.push(a);
  }), e;
}, c = (e) => {
  for (const r of u())
    r != "" && window.Caido.graphql.updateRequestMetadata({ id: r, input: { color: e } });
}, m = async () => {
  var a, i, g, s;
  let e = [], r = "", o = "";
  const l = u();
  for (let n = 0; n < l.length; n++)
    if (l[n] != "") {
      let h = await t.graphql.request({ id: l[n] });
      e[n] = `[ HTTP Request ]\r
`, e[n] += d((a = (await h).request) == null ? void 0 : a.raw), e[n] += `\r
\r
[ HTTP Response ]\r
`, o = (g = (i = (await h).request) == null ? void 0 : i.response) == null ? void 0 : g.id, e[n] += d((s = (await t.graphql.response({ id: o })).response) == null ? void 0 : s.raw), e[n] += `\r
`;
    } else
      continue;
  r += "```\r\n", r += e.join(`\r
\r
`), r += "```", console.log(r), p(r);
}, p = async (e, r, o) => {
  try {
    await navigator.clipboard.writeText(e), r && r();
  } catch {
    o && o();
  }
}, d = (e) => {
  const r = /\r\nContent\-Type\:\ (image|audio)\//gi, o = /\r\n\r\n.*/gi, l = /\\x00/gi, a = /\@\@/gi;
  let i = "";
  return e != null && e.search(r) != -1 ? (i = e.replace(o, `\r
\r
...(Data)...`), i = i.replace(l, "&#0;"), i = i.replace(a, ""), i) : e;
};
t.commands.register("Copy request & response", {
  name: "Copy request & response",
  run: () => {
    m();
  }
});
t.commands.register("Highlight: Red", {
  name: "Highlight: Red",
  run: () => {
    c("var(--c-highlight-color-red)");
  }
});
t.commands.register("Highlight: Green", {
  name: "Highlight: Green",
  run: () => {
    c("var(--c-highlight-color-green)");
  }
});
t.commands.register("Highlight: Blue", {
  name: "Highlight: Blue",
  run: () => {
    c("var(--c-highlight-color-blue)");
  }
});
t.commands.register("Highlight: Purple", {
  name: "Highlight: Purple",
  run: () => {
    c("var(--c-highlight-color-purple)");
  }
});
t.commands.register("Highlight: Black", {
  name: "Highlight: Black",
  run: () => {
    c("var(--c-highlight-color-black)");
  }
});
t.commandPalette.register("Copy request & response");
t.commandPalette.register("Highlight: Red");
t.commandPalette.register("Highlight: Green");
t.commandPalette.register("Highlight: Blue");
t.commandPalette.register("Highlight: Purple");
t.commandPalette.register("Highlight: Black");

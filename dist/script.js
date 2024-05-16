const a = window.Caido, H = () => {
  let e = [];
  return document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(i, r, s) {
    var t, o;
    let n = (o = (t = i.querySelector('div[data-column-id="ID"]')) == null ? void 0 : t.querySelector(".c-item-cell__inner")) == null ? void 0 : o.textContent;
    n != null && n !== "" ? e.push(n) : console.error("Request ID : " + i.querySelector('div[data-column-id="ID"]') + "has no value.");
  }), e;
}, O = () => {
  const e = [
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
  ], i = window.navigator.userAgent.toLowerCase();
  return i.includes("edg") ? "Edge" : i.includes("trident") || i.includes("msie") ? "Internet Explorer" : e.find((r) => i.includes(r.toLowerCase())) || "Other";
}, w = async (e) => {
  try {
    await navigator.clipboard.writeText(e);
  } catch (i) {
    console.error(`❗ ERROR : Failed to Clipboard copy
` + i);
  }
}, y = () => {
  let e = window.document.querySelector('div[data-is-active="true"].c-sidebar-item .c-sidebar__label');
  return e == null ? "unknown" : e.innerHTML.toString();
}, m = (e) => {
  for (const i of H())
    i != "" && window.Caido.graphql.updateRequestMetadata({ id: i, input: { color: e } });
}, _ = (e) => {
  const i = document.createElement("p");
  i.innerText = "Press enter key to copy.", i.style.cssText = `
        margin: 20px;
        width: auto;
        height: auto;
    `;
  const r = window.Caido.ui.button({
    variant: "primary",
    label: "Copy",
    size: "small"
  });
  if (!r) {
    console.error("❗ ERROR : There is no copy button.");
    return;
  }
  r.style.cssText = `
        margin: 5px;
    `;
  const s = window.Caido.ui.button({
    variant: "tertiary",
    label: "Cancel",
    size: "small"
  });
  if (!s) {
    console.error("❗ ERROR : There is no cancel button.");
    return;
  }
  s.style.cssText = `
        margin: 5px;
    `;
  const n = document.createElement("div");
  if (!n) {
    console.error("❗ ERROR : There is no button group.");
    return;
  }
  n.style.cssText = `
        display: flex;
        justify-content: space-evenly;
        margin: 1px;
        padding: 5px;
        width: auto;
        height: auto;
    `, n.appendChild(r), n.appendChild(s);
  let t = window.Caido.ui.card({ body: i, footer: n });
  if (!t) {
    console.error("❗ ERROR : There is no dialog.");
    return;
  }
  t.id = "dialog", t.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        z-index: 9999; // Ensure dialog is above other elements
        max-width: 300px; // Max width for better readability
        max-height: 200px;
        width: auto;
        height: auto;
    `;
  const o = t.querySelector(".c-card");
  if (!o) {
    console.error("❗ ERROR : There is no card element.");
    return;
  }
  o.style.cssText = `
        box-shadow: 5px 5px 3px black;
        border: 1px solid #daa04a;
    `;
  const l = document.getElementById("app");
  if (!l) {
    console.error("❗ ERROR : There is no app element.");
    return;
  }
  l.appendChild(t), r.onclick = () => {
    t && (w(e), t.remove());
  }, s.onclick = () => {
    t && t.remove();
  }, document.addEventListener("keydown", (c) => {
    c.key === "Enter" && t && (w(e), t.remove(), document.removeEventListener("keydown", (d) => {
    }));
  }), document.addEventListener("click", (c) => {
    c.target !== t && t && (t.remove(), document.removeEventListener("click", (d) => {
    }));
  });
}, j = async () => {
  var i, r, s;
  let e = "";
  if (y() === "Replay") {
    let n = "", t = "", o = "", l = "";
    const c = document.querySelector("div.c-writable-request");
    if (c != null)
      n = c.getAttribute("data-request-id");
    else {
      console.error("❗ ERROR : There is no request object.");
      return;
    }
    const d = document.querySelector("div.c-response[data-response-id]");
    d != null ? t = d.getAttribute("data-response-id") || "" : t = "", n != null && n !== "" ? o = f(((i = (await a.graphql.request({ id: n })).request) == null ? void 0 : i.raw) || "") : o = "", t != null && t !== "" ? l = f(((r = (await a.graphql.response({ id: t })).response) == null ? void 0 : r.raw) || "") : l = "", e = `[ HTTP Request ]\r
`, e += o.trimEnd(), e += `\r
\r
`, e += `[ HTTP Response ]\r
`, e += l.trimEnd();
  } else if (y() === "HTTP History" || y() === "Search") {
    const n = H();
    let t = [];
    for (let o = 0; o < n.length; o++)
      if (n[o] !== "") {
        let l = await a.graphql.request({ id: n[o] });
        if (l == null)
          continue;
        let c = (await l).request;
        if (c == null)
          continue;
        t[o] = `[ HTTP Request ]\r
`, t[o] += f(c.raw || "").trimEnd(), t[o] += `\r
\r
`, t[o] += `[ HTTP Response ]\r
`;
        let d = c.response;
        if (d == null)
          continue;
        t[o] += f(((s = (await a.graphql.response({ id: d.id })).response) == null ? void 0 : s.raw) || "").trimEnd();
      } else
        continue;
    e += t.join(`\r
\r
\r
`), e = e.trimEnd();
  } else {
    console.error("❗ ERROR : This function is only available on the History / Search / Replay tab.");
    return;
  }
  O() === "Edge" ? _(e) : w(e);
}, f = (e) => {
  var v, R, b, x, E, T, q, C;
  if (e === "" || e === null || e === void 0)
    return `\r
\r
`;
  let i = e.split(`\r
\r
`), r = i.slice(0, 1).join(""), s = i.slice(1).join(`\r
\r
`), n = "";
  const t = /\r\nContent\-Type\:\s(text\/|application\/json|application\/xml|application\/http|application\/javascript|application\/x\-www\-form\-urlencoded)/i, o = /^(GET|HEAD|OPTIONS|TRACE).*$/gi, l = /Content\-Type\:\s.*/gi, c = /Content\-Type\:\smultipart\/(form\-data|mixed)/gi, d = new RegExp(`boundary\\=\\"?([-a-zA-Z0-9'\\(\\)+_,-.\\/:=? ]*)(?<! )\\"?`, "gi"), k = /(Authorization:\s*Bearer\s+)[^\s]+/g, P = /\x00/g, S = /\@\@/gi;
  if (r.search(o) !== -1)
    s = "";
  else if (s.length > 0 && r.search(c) !== -1 && r.search(d) !== -1) {
    let g = ((v = r.match(d)) == null ? void 0 : v.toString()) || "";
    g = ((R = g.split("=")[1]) == null ? void 0 : R.trim()) || "--", g = ((b = s.match(`--${g}`)) == null ? void 0 : b.toString()) || "----";
    let h = "", u = s.split(g);
    if (u.length > 1) {
      for (let p = 1; p < u.length - 1; p++) {
        if (h += g, u[p] === void 0 || u[p] === null || ((x = u[p]) == null ? void 0 : x.trimEnd().length) === 0) {
          h += `\r
`;
          continue;
        }
        ((E = u[p]) == null ? void 0 : E.search(l)) !== -1 && ((T = u[p]) == null ? void 0 : T.search(t)) === -1 ? h += (q = u[p]) == null ? void 0 : q.replace(/\r\n\r\n[\s\S]*/, `\r
\r
...data...\r
`) : u[p].length > 5e3 ? h += ((C = u[p]) == null ? void 0 : C.substring(0, 5e3)) + `\r
...data...\r
` : h += u[p], p === u.length - 2 && (h += g + "--");
      }
      s = h;
    }
  } else
    r.search(l) !== -1 && r.search(t) === -1 && (s = "...data...");
  return r.length > 5e3 && (r = r.substring(0, 3e3) + `\r
...data...`), s.length > 5e3 && (s = s.substring(0, 5e3) + `\r
...data...`), r = r.replace(S, "&#64;&#64;"), r = r.replace(k, "$1[Redacted]"), r = B(r), n = r + `\r
\r
` + s, n = n.replace(P, ""), n = n.trimEnd(), n;
}, B = (e) => (e = e.replace(/(Cookie:\s*)((([^;=\s]+=[^;]*)(;[\s]|$))*)/g, (i, r, s, n, t) => {
  let o = s.split(";").map((l) => l.split("=")[0] + "=[Redacted]");
  return r + o.join("; ");
}), e = e.replace(/(Set-Cookie:\s*[^=]+=\s*)([^;]+)(;?)/g, "$1[Redacted]$3"), e);
a.commands.register("Copy request & response", {
  name: "Copy request & response",
  run: () => {
    j();
  }
});
a.commands.register("Highlight: Red", {
  name: "Highlight: Red",
  run: () => {
    m("var(--c-highlight-color-red)");
  }
});
a.commands.register("Highlight: Green", {
  name: "Highlight: Green",
  run: () => {
    m("var(--c-highlight-color-green)");
  }
});
a.commands.register("Highlight: Blue", {
  name: "Highlight: Blue",
  run: () => {
    m("var(--c-highlight-color-blue)");
  }
});
a.commands.register("Highlight: Purple", {
  name: "Highlight: Purple",
  run: () => {
    m("var(--c-highlight-color-purple)");
  }
});
a.commands.register("Highlight: Black", {
  name: "Highlight: Black",
  run: () => {
    m("black");
  }
});
a.commandPalette.register("Copy request & response");
a.commandPalette.register("Highlight: Red");
a.commandPalette.register("Highlight: Green");
a.commandPalette.register("Highlight: Blue");
a.commandPalette.register("Highlight: Purple");
a.commandPalette.register("Highlight: Black");

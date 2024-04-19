const e = window.Caido, c = () => {
  let r = [""];
  return document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(t, o, a) {
    var n, g;
    let l = (g = (n = t.querySelector('div[data-column-id="ID"]')) == null ? void 0 : n.querySelector(".c-item-cell__inner")) == null ? void 0 : g.textContent;
    l != null && r.push(l);
  }), r;
}, h = async (r) => {
  try {
    let t = "";
    const o = localStorage.getItem("CAIDO_AUTHENTICATION");
    if (!o)
      return;
    t = JSON.parse(o).accessToken;
    const a = await fetch(document.location.origin + "/graphql", {
      body: JSON.stringify(r),
      method: "POST",
      headers: {
        Authorization: "Bearer " + t
      }
    });
    if (!a.ok)
      throw new Error(`HTTP error! status: ${a.status}`);
  } catch (t) {
    console.error("Error during dropRequest execution:", t);
  }
}, i = (r) => {
  for (const t of c())
    t != "" && h({
      operationName: "updateRequestMetadata",
      query: `mutation updateRequestMetadata(
          $rowId: String!
          $color: String
        ) {
          updateRequestMetadata(
            id: $rowId
            input:{color: $color}
          ) {
            metadata{color}
          }
        }`,
      variables: {
        rowId: t,
        color: r
      }
    });
};
e.commands.register("Highlight: Red", {
  name: "Highlight: Red",
  run: () => {
    i("var(--c-highlight-color-red)");
  }
});
e.commands.register("Highlight: Green", {
  name: "Highlight: Green",
  run: () => {
    i("var(--c-highlight-color-green)");
  }
});
e.commands.register("Highlight: Blue", {
  name: "Highlight: Blue",
  run: () => {
    i("var(--c-highlight-color-blue)");
  }
});
e.commands.register("Highlight: Purple", {
  name: "Highlight: Purple",
  run: () => {
    i("var(--c-highlight-color-purple)");
  }
});
e.commands.register("Highlight: Black", {
  name: "Highlight: Black",
  run: () => {
    i("var(--c-highlight-color-black)");
  }
});
e.commandPalette.register("Highlight: Red");
e.commandPalette.register("Highlight: Green");
e.commandPalette.register("Highlight: Blue");
e.commandPalette.register("Highlight: Purple");
e.commandPalette.register("Highlight: Black");

const c = window.Caido, d = () => {
  let t = [""];
  return document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(e, r, o) {
    var i, n;
    let a = (n = (i = e.querySelector('div[data-column-id="ID"]')) == null ? void 0 : i.querySelector(".c-item-cell__inner")) == null ? void 0 : n.textContent;
    a != null && t.push(a);
  }), t;
}, l = async (t) => {
  try {
    let e = "";
    const r = localStorage.getItem("CAIDO_AUTHENTICATION");
    if (!r)
      return;
    e = JSON.parse(r).accessToken;
    const o = await fetch(document.location.origin + "/graphql", {
      body: JSON.stringify(t),
      method: "POST",
      headers: {
        Authorization: "Bearer " + e
      }
    });
    if (!o.ok)
      throw new Error(`HTTP error! status: ${o.status}`);
  } catch (e) {
    console.error("Error during dropRequest execution:", e);
  }
}, s = (t) => {
  for (const e of d())
    e != "" && l({
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
        rowId: e,
        color: t
      }
    });
};
c.commands.register("highlight: red", {
  name: "highlight: red",
  run: () => {
    s("var(--c-highlight-color-red)");
  }
});
c.commandPalette.register("highlight: red");

const e = window.Caido, t = () => {
  console.error("Hello world");
}, r = () => {
  var o;
  ((o = window.document.querySelector(".c-item-row__overlay")) == null ? void 0 : o.parentNode).style.setProperty("--171e49ec", "var(--c-highlight-color-blue)");
};
e.commands.register("my-sample-command", {
  name: "My Sample Command",
  run: () => {
    t();
  }
});
e.commands.register("highlight", {
  name: "highlight",
  run: () => {
    r();
  }
});
e.commandPalette.register("my-sample-command");
e.commandPalette.register("highlight");

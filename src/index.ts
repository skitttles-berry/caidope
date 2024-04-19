import { Caido } from "@caido/sdk-frontend";
import { highlight } from "./highlight";

Caido.commands.register("highlight: red", {
  name: "highlight: red",
  run: () => {
    highlight("var(--c-highlight-color-red)");
  },
});

Caido.commandPalette.register("highlight: red");
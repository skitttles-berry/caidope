import { Caido } from "@caido/sdk-frontend";
import { highlight } from "./highlight";

Caido.commands.register("Highlight: Red", {
  name: "Highlight: Red",
  run: () => {
    highlight("var(--c-highlight-color-red)");
  },
});

Caido.commands.register("Highlight: Green", {
  name: "Highlight: Green",
  run: () => {
    highlight("var(--c-highlight-color-green)");
  },
});

Caido.commands.register("Highlight: Blue", {
  name: "Highlight: Blue",
  run: () => {
    highlight("var(--c-highlight-color-blue)");
  },
});

Caido.commands.register("Highlight: Purple", {
  name: "Highlight: Purple",
  run: () => {
    highlight("var(--c-highlight-color-purple)");
  },
});

Caido.commands.register("Highlight: Black", {
  name: "Highlight: Black",
  run: () => {
    highlight("var(--c-highlight-color-black)");
  },
});

Caido.commandPalette.register("Highlight: Red");
Caido.commandPalette.register("Highlight: Green");
Caido.commandPalette.register("Highlight: Blue");
Caido.commandPalette.register("Highlight: Purple");
Caido.commandPalette.register("Highlight: Black");
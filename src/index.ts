import type { Caido } from "@caido/sdk-frontend";
import { highlight } from "./highlight";
import { copyPackets } from "./copyPackets";

export const init = (caido: Caido) => {
  // Register commands
  caido.commands.register("Copy request & response", {
    name: "Copy request & response",
    run: () => {
      copyPackets(caido);
    },
  });
  
  caido.commands.register("Highlight: Red", {
    name: "Highlight: Red",
    run: () => {
      highlight(caido, "var(--c-highlight-color-red)");
    },
  });
  
  caido.commands.register("Highlight: Green", {
    name: "Highlight: Green",
    run: () => {
      highlight(caido, "var(--c-highlight-color-green)");
    },
  });
  
  caido.commands.register("Highlight: Blue", {
    name: "Highlight: Blue",
    run: () => {
      highlight(caido, "var(--c-highlight-color-blue)");
    },
  });
  
  caido.commands.register("Highlight: Purple", {
    name: "Highlight: Purple",
    run: () => {
      highlight(caido, "var(--c-highlight-color-purple)");
    },
  });
  
  caido.commands.register("Highlight: Black", {
    name: "Highlight: Black",
    run: () => {
      highlight(caido, "black");
    },
  });


  // Register command palette items
  caido.commandPalette.register("Copy request & response");
  caido.commandPalette.register("Highlight: Red");
  caido.commandPalette.register("Highlight: Green");
  caido.commandPalette.register("Highlight: Blue");
  caido.commandPalette.register("Highlight: Purple");
  caido.commandPalette.register("Highlight: Black");
}


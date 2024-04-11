import { Caido } from "@caido/sdk-frontend";
import { helper } from "./helper";
import { highlight } from "./highlight";

Caido.commands.register("my-sample-command", {
  name: "My Sample Command",
  run: () => {
    helper();
  },
});

Caido.commands.register("highlight", {
  name: "highlight",
  run: () => {
    highlight();
  },
});

Caido.commandPalette.register("my-sample-command");
Caido.commandPalette.register("highlight");

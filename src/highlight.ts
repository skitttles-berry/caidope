import type { Caido } from "@caido/sdk-frontend";
import { getSelectedRowsId } from "./utils";
import { InputMaybe, Scalars } from "@caido/sdk-frontend/src/types/__generated__/graphql-sdk";

export const highlight = (caido :Caido, color: InputMaybe<Scalars["String"]["input"]>) => {
  for (const rowId of getSelectedRowsId()){
    if (rowId != "") {
      caido.graphql.updateRequestMetadata({id:rowId, input:{color :color}});
    }
  }
};
import type { Caido } from "@caido/sdk-frontend";
import { getSelectedRowsId } from "./utils";
import { InputMaybe } from "@caido/sdk-frontend/src/types/__generated__/graphql-sdk";

export const highlight = (caido :Caido, color: InputMaybe<string>) => {
  for (const rowId of getSelectedRowsId()){
    if (rowId != "" && rowId != null && rowId != undefined) {
      caido.graphql.updateRequestMetadata({id:rowId, input:{color:color}});
    }
  }
};
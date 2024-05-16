import { getSelectedRowsId } from "./utils";

export const highlight = (color: String) => {
  for (const rowId of getSelectedRowsId()){
    if (rowId != "") {
      window.Caido.graphql.updateRequestMetadata({id:rowId, input:{color:color}});
    }
  }
};
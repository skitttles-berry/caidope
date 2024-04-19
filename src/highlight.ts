import { getSelectedRowsId } from "./getSelectedRowsId";
import { graphqlRequest } from "./graphqlRequest";

export const highlight = (color: String) => {
  for (const rowId of getSelectedRowsId()){
    if (rowId != "") {
      const payload = {
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
          rowId: rowId,
          color: color
        },
      };
      graphqlRequest(payload);
    }
  }
};
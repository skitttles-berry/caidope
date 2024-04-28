import { Caido } from "@caido/sdk-frontend";
import type { RequestQuery } from "@caido/sdk-frontend/src/types/__generated__/graphql-sdk";
import { getSelectedRowsId } from "./getSelectedRowsId";
/*
  variables
    - packets : All requests and responses string as array.
    - rowIds : All request IDs that selected on history/search tab.
  Feature
    - Get all requests and responses sets that selected on history/search tab on as markdown
*/
export const copyPackets = async () => {
  let packets :string[] = [];
  let copy : string = "";
  let responseId :string | undefined = "";
  const rowIds :string[] = getSelectedRowsId();

  //'for loop with index' is execute sequentially.
  for (let idx = 0; idx < rowIds.length; idx++){
    if (rowIds[idx] != "") {
      let getRequestData :Promise<RequestQuery> = await Caido.graphql.request({id:rowIds[idx]});
      //let requestString :string | undefined =""
      //let responseString :string | undefined =""
      packets[idx] = "[ HTTP Request ]\r\n";
      packets[idx] += removeBinary((await getRequestData).request?.raw);

      packets[idx] += "\r\n\r\n[ HTTP Response ]\r\n"
      responseId = (await getRequestData).request?.response?.id;
      packets[idx] += removeBinary((await Caido.graphql.response({id:responseId})).response?.raw);
      packets[idx] += "\r\n"
    } else {
      continue;
    }
  }

  copy += "```\r\n";
  copy += packets.join("\r\n\r\n");
  copy += "```";
  console.log(copy)
  copyClipboard(copy);
};


export const copyClipboard = async (
  text: string,
  successAction?: () => void,
  failAction?: () => void,
) => {
  try {
    await navigator.clipboard.writeText(text);
    successAction && successAction();
  } catch (error) {
    failAction && failAction();
  }
};


const removeBinary = (str :string | undefined) => {
  const re_contentType = /\r\nContent\-Type\:\ (image|audio)\//gi;
  //const re_multipart = /\r\nContent\-Type\:\ multipart\/form\-data/gi;
  //const re_multipartBinary = /\r\n\r\n.*Content\-Type:\ (image|audio)/gi;
  const re_body = /\r\n\r\n.*/gi;
  const re_00 = /\\x00/gi;
  const re_atat = /\@\@/gi
  let removed = ""


  if (str != undefined){
    if (str.search(re_contentType) != -1 ) { 
      removed = str.replace(re_body, "\r\n\r\n...(Data)...");
      removed = removed.replace(re_00, "&#0;")
      removed = removed.replace(re_atat, "")
      return removed;
    } else {
      return str;
    }
  } else {
    return str;
  }
}
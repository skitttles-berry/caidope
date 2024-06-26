import type { Caido } from "@caido/sdk-frontend";
import { RequestQuery } from "@caido/sdk-frontend/src/types/__generated__/graphql-sdk";
import { copyDialog } from "./dialogUtil";
import { getSelectedRowsId, copyToClipboard, getBrowserKind, getCurrenMenu } from "./utils";

/*
  variables
    - packets : All requests and responses string as array.
    - rowIds : All request IDs that selected on history/search tab.
  Feature
    - Get all requests and responses sets that selected on history/search tab on as markdown
*/
export const copyPackets = async (caido :Caido) => {
  let copy : string = "";

  if (getCurrenMenu() === "Replay") {
    let requestId :string|null = "";
    let responseId :string|null = "";
    let request :string = "";
    let response :string = "";
    
    const requestObj = document.querySelector('div.c-writable-request');

    if (requestObj !== null && requestObj !== undefined) {
      requestId = requestObj.getAttribute('data-request-id');
    } else {
      console.error("❗ ERROR : There is no request object.");
      return;
    }

    const responseObj = document.querySelector('div.c-response[data-response-id]');
    
    if (responseObj !== null && responseObj !== undefined) {
      responseId = responseObj.getAttribute('data-response-id') || "";
    } else {
      responseId = "";
    }
    
    if (requestId !== null && requestId !== undefined && requestId !== "") {
      request = cleanupPacket((await caido.graphql.request({id:requestId})).request?.raw || "");
    } else {
      request = "";
    }

    if (responseId !== null && responseId !== undefined && responseId !== "") {
      response = cleanupPacket((await caido.graphql.response({id:responseId})).response?.raw || "");
    } else {
      response = "";
    }

    copy = "[ HTTP Request ]\r\n";
    copy += request.trimEnd();
    copy += "\r\n\r\n";
    copy += "[ HTTP Response ]\r\n"
    copy += response.trimEnd();
  } else if (getCurrenMenu() === "HTTP History" || getCurrenMenu() === "Search") {
    const rowIds :string[] = getSelectedRowsId();
    let packets :string[] = [];

    // 'for loop with index' is execute sequentially with Promise.
    // cleanup() : remove garbage characters and cleanup string.
    for (let idx = 0; idx < rowIds.length; idx++){
      if (rowIds[idx] !== "" && rowIds[idx] !== null && rowIds[idx] !== undefined) {
        let getRequestData :Promise<RequestQuery> = caido.graphql.request({id:rowIds[idx as number] as string});
        if (getRequestData === null || getRequestData === undefined) {
          continue;
        }

        let requestObj :any = (await getRequestData).request;
        if (requestObj === null || requestObj === undefined) {
          continue;
        }

        packets[idx] = "[ HTTP Request ]\r\n";
        packets[idx] += cleanupPacket(requestObj.raw || "").trimEnd();
        packets[idx] += "\r\n\r\n";

        packets[idx] += "[ HTTP Response ]\r\n";
        let responseObj :any = requestObj.response;
        if (responseObj === null || responseObj === undefined) {
          continue;
        }

          packets[idx] += cleanupPacket((await caido.graphql.response({id:responseObj.id})).response?.raw ?? "").trimEnd();
          //console.log(packets[idx]);
      } else {
          continue;
      }
    }

    copy += packets.join("\r\n\r\n\r\n");
    copy = copy.trimEnd();
  } else {
    console.error("❗ ERROR : This function is only available on the History / Search / Replay tab.");
    return;
  }

  //console.log(copied)
  if (getBrowserKind() === "Edge") {
    copyDialog(caido, copy);
  } else {
    copyToClipboard(copy);
  }
};


// Remove binary between the multipart boundary.
// Shorten the string.
const cleanupPacket = (str :string) => {
  if (str === "" || str === null || str === undefined) {return "\r\n\r\n";}

  // Split body to header and body
  let splited :string[] = str.split("\r\n\r\n");
  let header :string = splited.slice(0, 1).join("");
  let body :string = splited.slice(1).join("\r\n\r\n");

  let removed :string = ""

  // Regular expression
  const re_typeText :RegExp = /\r\nContent\-Type\:\s(text\/|application\/json|application\/xml|application\/http|application\/javascript|application\/x\-www\-form\-urlencoded)/i;
  const re_method : RegExp= /^(GET|HEAD|OPTIONS|TRACE).*$/gi;
  const re_contentType :RegExp = /Content\-Type\:\s.*/gi;
  const re_multipart :RegExp = /Content\-Type\:\smultipart\/(form\-data|mixed)/gi;
  const re_boundary :RegExp = /boundary\=\"?([-a-zA-Z0-9'\(\)+_,-.\/:=? ]*)(?<! )\"?/gi;
  const re_authorization :RegExp = /(Authorization:\s*Bearer\s+)[^\s]+/g;
  const re_eof :RegExp = /\x00/g;
  const re_atat :RegExp = /\@\@/gi

  // Remove binary data
  if (header.search(re_method) !== -1) {
    // Clean up request packet when method is GET, HEAD, OPTIONS, TRACE
    body = "";
  } else if (body.length > 0 && header.search(re_multipart) !== -1 && header.search(re_boundary) !== -1 ) {
    // Clean up multi-part packet
    // Get boundary
    let boundary :string = header.match(re_boundary)?.toString() || "";
    boundary = boundary.split("=")[1]?.trim() || "--";
    boundary = body.match(`\-\-${boundary}`)?.toString() || "----";

    let newContent = "";
    let parts :string[] = body.split(boundary)

    // Remove first and last index, because it's empty.
    if (parts.length > 1){
      for (let idx = 1; idx < parts.length-1; idx++) {
        newContent += boundary;
        if (parts[idx] === undefined || parts[idx] === null || parts[idx]?.trimEnd().length === 0) { newContent += "\r\n"; continue; }
  
        // Check if it has Content-Type header and it's not text type.
        if (parts[idx]?.search(re_contentType) !== -1 && parts[idx]?.search(re_typeText) === -1) {
          newContent += parts[idx]?.replace(/\r\n\r\n[\s\S]*/, "\r\n\r\n...data...\r\n");
        } else {
          // Clean up packet when it's text type.
          if (parts[idx]!.length > 5000) {
            newContent += (parts[idx]?.substring(0, 5000) + "\r\n...data...\r\n");
          } else {
            newContent += parts[idx];
          }
        }
        // Add end boundary at last index
        if (idx === (parts.length-2)) {
          newContent += (boundary + "--");
        }
      }

      body = newContent;
    }
  } else if (header.search(re_contentType) !== -1 && header.search(re_typeText) === -1) {
    // Clean up packet when it's not text type.
    body = "...data...";
  }

  // Shorten the body string.
  if (header.length > 5000) { header = header.substring(0, 3000) + "\r\n...data..." }
  if (body.length > 5000) { body = body.substring(0, 5000) + "\r\n...data..." }

  // Replace special characters and cookies.
  header = header.replace(re_atat, "&#64;&#64;");
  header = header.replace(re_authorization, "$1[Redacted]");
  header = maskCookies(header);
  
  removed = header + "\r\n\r\n" + body;
  removed = removed.replace(re_eof, "");
  removed = removed.trimEnd();

  return removed;
}


const maskCookies = (headerText :string) => {
  // Cookie 헤더 마스킹
  headerText = headerText.replace(/(Cookie:\s*)((([^;=\s]+=[^;]*)(;[\s]|$))*)/g, (match, p1, p2, p3, p4) => {
    let cookies = p2.split(';').map((cookie: string) => {
      let parts = cookie.split('=');
      return parts[0] + "=[Redacted]";
    });
    return p1 + cookies.join('; ');
  });

  // Set-Cookie 헤더 마스킹
  headerText = headerText.replace(/(Set-Cookie:\s*[^=]+=\s*)([^;]+)(;?)/g, "$1[Redacted]$3");

  return headerText;
}
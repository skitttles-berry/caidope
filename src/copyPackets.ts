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
  let copied : string = "";
  let responseId :string | undefined = "";
  let getRequestData  :Promise<RequestQuery>

  const rowIds :string[] = getSelectedRowsId();

  // 'for loop with index' is execute sequentially with Promise.
  // cleanup() : remove garbage characters and cleanup string.
  for (let idx = 0; idx < rowIds.length; idx++){
    if (rowIds[idx] !== "") {
      getRequestData = await Caido.graphql.request({id:rowIds[idx]});

      packets[idx] = "[ HTTP Request ]\r\n";
      packets[idx] += cleanup((await getRequestData).request?.raw || "");

      packets[idx] += "[ HTTP Response ]\r\n"
      responseId = (await getRequestData).request?.response?.id || "";
      packets[idx] += cleanup((await Caido.graphql.response({id:responseId})).response?.raw || "");
    } else {
      continue;
    }
  }

  copied += packets.join("\r\n\r\n");
  copyToClipboard(copied);
  console.log(copied)
};

// Safari does not allow write to clipboard without user actions.
// Bypass OR Add user actions...
export const copyToClipboard = async (
  text: string
) => {
  try {
    if (getBrowserKind() === "Safari") {
      const clipboardItem = new ClipboardItem({
        'text/plain': dummy().then((result) => {

          if (!result) {
            return new Promise(async (resolve) => {
              const copyText = ``
              resolve(new Blob([copyText]))
            })
          }

          const copyText = text
          return new Promise(async (resolve) => {
              resolve(new Blob([copyText], {type: 'text/plain'}))
          })
        }),
      })

     navigator.clipboard.write([clipboardItem])
    } else {
      await navigator.clipboard.writeText(text);
    }
  } catch (error) {
    console.error("❗ ERROR : Failed to Clipboard copy\n" + error)
  }
};

// Remove binary between the multipart boundary.
// Shorten the string.
const cleanup = (str :string) => {
  if (str === "" || str === null || str === undefined) {return "\r\n\r\n";}

  let splited :string[] = str.split("\r\n\r\n");
  let header :string = splited.slice(0, 1).join("");
  let body :string = splited.slice(1).join("\r\n\r\n");
  let removed :string = ""

  const re_typeText :RegExp = /\r\nContent\-Type\:\s(text\/|application\/json|application\/xml|application\/http)/i;
  const re_method : RegExp= /^(GET|HEAD|OPTIONS|TRACE).*$/gi;
  const re_multipart :RegExp = /Content\-Type\:\smultipart\/(form\-data|mixed)/gi;
  const re_boundary :RegExp = /boundary\=\"?([-a-zA-Z0-9'\(\)+_,-.\/:=? ]*)(?<! )\"?/gi;
  const re_00 :RegExp = /\\x00/gi;
  const re_atat :RegExp = /\@\@/gi

  if (header.search(re_method) !== -1) {
    body = "";
  } else if (body.length > 0 && header.search(re_multipart) !== -1 && header.search(re_boundary) !== -1 ) {
    let boundary :string = header.match(re_boundary)?.toString() || "";
    boundary = boundary.split("=")[1]?.trim() || "--";
    boundary = body.match(`\-\-${boundary}`)?.toString() || "----";

    let newContent = "";
    let parts :string[] = body.split(boundary)

    if (parts.length > 1){
      for (let idx = 1; idx < parts.length-1; idx++) {
        newContent += boundary;
        if (parts[idx] === undefined || parts[idx] === null || parts[idx]?.trimEnd().length === 0) { newContent += "\r\n"; continue; }
  
        if (parts[idx]?.search(/Content\-Type\:\s.*/gi) !== -1 && parts[idx]?.search(re_typeText) === -1) {
          newContent += parts[idx]?.replace(/\r\n\r\n[\s\S]*/, "\r\n\r\n...data...\r\n");
        } else {
          if (parts[idx]!.length > 5000) {
            newContent += (parts[idx]?.substring(0, 5000) + "\r\n...\r\n");
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
      removed = header + "\r\n\r\n" + body;
    }
  } else if (header.search(/Content\-Type\:\s.*/gi) !== -1 && header.search(re_typeText) === -1) {
    body = "...data...";
  }

  if (header.length > 5000) { header = header.substring(0, 5000) + "\r\n..." }
  if (body.length > 5000) { body = body.substring(0, 5000) + "\r\n..." }

  removed = header + "\r\n\r\n" + body;
  removed = removed.replace(re_00, "&#0;");
  removed = removed.replace(re_atat, "&#64;&#64;");
  removed = removed.trimEnd() + "\r\n\r\n";

  return removed;
}

// get browser kind.
// Because the safari Clipboard API issue.
const getBrowserKind = () => {
  const browsers = [
    'Chrome', 'Opera',
    'WebTV', 'Whale',
    'Beonex', 'Chimera',
    'NetPositive', 'Phoenix',
    'Firefox', 'Safari',
    'SkipStone', 'Netscape',
    'Mozilla',
  ];
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('edg')) {
    return 'Edge';
  }

  if (userAgent.includes('trident') || userAgent.includes('msie')) {
    return "Internet Explorer";
  }

  return browsers.find(browser => userAgent.includes(browser.toLowerCase())) || 'Other';
}

// Need dummy async function when bypassing safari clipboard API restriction.
export const dummy = async () => {
  console.log("Copy requests & responses");
  return true;
}
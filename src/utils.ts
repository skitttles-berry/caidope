//Gets the selected request ID, but cannot get the request ID outside the screen.
export const getSelectedRowsId = () => {
  let selectedRowsId:string[]=[];

  document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(currentValue, index, array) {
    let currentRow = currentValue.querySelector('div[data-column-id="ID"]')?.querySelector('.c-item-cell__inner')?.textContent
    if(currentRow !== null && currentRow !== undefined && currentRow !== ""){
      currentRow = (parseInt(currentRow)+8).toString();
      selectedRowsId.push(currentRow);
      console.log("Request ID : " + currentRow + " has been added.");
    } else {
      console.error("Request ID : " + currentValue.querySelector('div[data-column-id="ID"]') + "has no value.");
    }
  });
  
  return selectedRowsId
};


// get browser kind.
export const getBrowserKind = () => {
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


export const copyToClipboard = async (
    text: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("❗ ERROR : Failed to Clipboard copy\n" + error)
    }
  };


export const getCurrenMenu = () => {
  let element = window.document.querySelector('div[data-is-active="true"].c-sidebar-item .c-sidebar__label')
  if (element === null || element === undefined) {
      return "unknown";
  }
  
  return element.innerHTML.toString();
};
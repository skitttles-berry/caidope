//Gets the selected request ID, but cannot get the request ID outside the screen.
export const getSelectedRowsId = () => {
  let selectedRowsId:string[]=[];

  document.querySelectorAll('div[data-is-selected="true"].c-table__item-row').forEach(function(currentValue, index, array) {
    let currentRow = currentValue.querySelector('div[data-column-id="ID"]')?.querySelector('.c-item-cell__inner')?.textContent
    if(currentRow !== null && currentRow !== undefined && currentRow !== ""){
      selectedRowsId.push(currentRow);
    } else {
      console.error("Request ID : " + currentValue.querySelector('div[data-column-id="ID"]') + "has no value.")
    }
  });
  
  return selectedRowsId
};
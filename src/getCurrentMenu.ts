export const getSelectedRowsId = () => {
    let element = window.document.querySelector('div[data-is-active="true"].c-sidebar-item .c-sidebar__label')
    if (element === null || element === undefined) {
        return "unknown";
    }
    
    return element.innerHTML.toString();
};
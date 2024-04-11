export const highlight = () => {
  let selected_node = window.document.querySelector(".c-item-row__overlay")?.parentNode as HTMLElement
  selected_node.style.setProperty("--171e49ec", `var(--c-highlight-color-blue)`)
};


//document.getElementsByClassName("c-item-row__overlay")[0].parentNode.style.setProperty("--171e49ec", `var(--c-highlight-color-blue)`)
//window.document.querySelector(".c-table__wrapper").querySelector(".c-item-row__overlay").parentNode.style.setProperty("--171e49ec", `var(--c-highlight-color-blue)`)
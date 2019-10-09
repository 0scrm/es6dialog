import dialog from "./src/es6dialog";
import { es6Dialog } from "./src/es6dialog"
dialog.init()

const myDialogLink = document.querySelector(".javascript-triggered-dialog")
const myDialog = new es6Dialog(document.querySelector("#js"))
myDialogLink.addEventListener("click", (e) => {
  e.preventDefault()
  myDialog.open()
})

const myAdvancedDialogLink = document.querySelector(".js-advanced-triggered-dialog")
const myAdvancedDialog     = new es6Dialog(document.querySelector("#js-advanced"), {
  scroll: false,
  height: "auto",
  width: "1200px",
  fixed: true
})
myAdvancedDialogLink.addEventListener("click", (e) => {
  e.preventDefault()
  myAdvancedDialog.open()
})

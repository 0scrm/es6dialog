import dialog from "./src/es6dialog";
dialog.init()

const myDialogLink = document.querySelector(".javascript-triggered-dialog")
const myDialog = document.querySelector("#js")
myDialogLink.addEventListener("click", (e) => {
  e.preventDefault()
  dialog.create(myDialog, new Object, () => {
    console.log("This dialog was triggered by javascript !")
  })
})

const myAdvancedDialogLink = document.querySelector(".js-advanced-triggered-dialog")
const myAdvancedDialog     = document.querySelector("#js-advanced")
myAdvancedDialogLink.addEventListener("click", (e) => {
  e.preventDefault()
  dialog.create(myAdvancedDialog, {
    scroll: false,
    height: "auto",
    width: "1200px",
    shadow: true,
  }, () => {
    console.log("Callback")
  })
})

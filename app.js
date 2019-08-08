import dialog from './src/es6dialog';
dialog.init()

var myDialogLink = document.querySelector('.javascript-triggered-dialog')
var myDialog = document.querySelector('#js')
myDialogLink.addEventListener("click", function(e) {
  e.preventDefault()
  dialog.create(myDialog, new Object, function() {
    console.log('SALUT')
  })
})

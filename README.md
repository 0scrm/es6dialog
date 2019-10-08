# es6dialog
**ES6 Dialog** is a minimal and easy-to-use dialog plugin, which uses the ``<dialog>`` html element. It is written in ECMAScript 9 Object-Oriented Javascript (OOJS).

## How to

1. Download the [es6dialog.js script](https://raw.githubusercontent.com/oscar-marion/es6dialog/master/build/es6dialog.js) and include **es6dialog.js** in your webpage.

    ```html
    <script src="es6dialog.js"></script>
    ```

    Or install via ``npm install es6dialog --save`` or ``yarn add es6dialog --save`` and import it:

    ```js
    import dialog from "es6dialog"
    // Note: you will still need to manually import the es6dialog.(s)css file in your project
    ```

2. An ES6 Dialog can be triggered as follows :

    **HTML triggered**
    ```js
    import dialog from "es6dialog"
    dialog.init() // Adds a listener on all the .js-dialog links
    ```
    ```html
    <!-- This js-dialog element targets the data-dialog value -->
    <a href="#" class="js-dialog" data-dialog="myDialog">Show dialog</a>

    <dialog id="myDialog">
      <h2>My Dialog</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </dialog>
    ```
    **JS triggered  (import/require needed):**
    ```js
    import { es6Dialog } from "es6dialog"
    myDialog = new es6Dialog(element).open()
    ```
    **JS triggered through Window Object (no import/require needed):**
    ```html
    <script src="es6dialog.min.js"></script>
    ````

    ```js
    new window.es6Dialog(myDialog).open()
    ```
## [Demo with code examples](https://es6dialog.netlify.com) [![Netlify Status](https://api.netlify.com/api/v1/badges/4580be38-f647-4e58-aa2c-8dbfc2617535/deploy-status)](https://app.netlify.com/sites/es6dialog/deploys)
Can be seen [here](https://es6dialog.netlify.com).

## JS API - methods

Note: You will need to import/require **es6dialog** in order to use these methods.

### ``dialog.init(settings, callback)``

The ``dialog.init()`` will automatically detect all the html elements which have the ``.js-dialog`` class, and will open the matching dialog on user's click.

```js
dialog.init();
```
Note: you can set your own settings like that :

```js
dialog.init({
  selector: "js-customDialog",
  width: "500px"
}, () => {
  console.log('Callback')
});
```


### ``open()``

The ``open()`` method enables you to trigger a dialog element.

```js
const element = document.querySelector("#amazingDialog")
// The simple way
const amazingDialog = new es6Dialog(element)
amazingDialog.open()

// Or the advanced way
const bigFixedDialog = new es6Dialog(element, {
  width: "1000px",
  fixed: true
})
bigFixedDialog.open()
```

### ``close()``

The ``close()`` method closes the dialog :

```js
bigFixedDialog.close()
```

Here is the list of settings :
- ``selector`` (default: ``".js-dialog"``)
- ``closeText``
- ``scroll`` (default: ``true``)
- ``height`` (default: ``"auto"``)
- ``width`` (default: ``"600px"``)
- ``shadow`` (default: ``false``)
- ``fixed`` (default: (``false``)
- ``elementClass`` (default: ``"dialog"``)

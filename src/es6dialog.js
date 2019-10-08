import dialogPolyfill from "dialog-polyfill"

const defaultSettings = {
  selector: ".js-dialog",
  closeText: `<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.982 212.982" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/></svg>`,
  scroll: true,
  height: "auto",
  width: "600px",
  fixed: false,
  shadow: false,
  elementClass: "dialog"
}

export class es6Dialog {
  constructor(element, settings = new Object) {
    this.el = element
    this.settings = {
      ...defaultSettings,
      ...settings
    }
    console.log(this.settings)
    this._close = (e) => this.close(e)
    this._setStyles()
    this._cleanClasses()
    this._setClasses()
    this._wrapContent()
    this._attachEvents()
  }
  /**
   * @description Shows the dialog element using the dialog API (or the Polyfill)
   */
  open() {
    dialogPolyfill.registerDialog(this.el) // Polyfill
    document.querySelector("body").appendChild(this.el) // Fix z-index
    this._setScroll()
    this.el.showModal()
  }
  /**
   * @description Closes the dialog
   */
  close() {
    this._detachEvents()
    if (document.body.classList.contains("dialog-no-scroll")) {
      document.body.classList.remove("dialog-no-scroll")
    }
    this.el.close()
  }
  /**
   * @description Applies styles to the dialog
   */
  _setStyles() {
    Object.assign(this.el.style, {
      height: this.settings.height,
      width: this.settings.width
    })
  }
  /**
   * @description Cleans the class attribute
   */
  _cleanClasses() {
    this.el.removeAttribute("class")
    this.el.classList.add(this.settings.elementClass)
  }
  /**
   * @description Adds modifier classes to the element
   */
  _setClasses() {
    if (this.settings.fixed) {
      this.el.classList.add("-fixed")
    }
    if (this.settings.shadow) {
      this.el.classList.add("-shadow")
    }
  }
  /**
   * @description Removes scroll on body
   */
  _setScroll() {
    if (!this.settings.scroll) {
      document.body.classList.add("dialog-no-scroll")
    }
  }
  /**
   * @description Creates wrapper element and adds close button
   */
  _wrapContent() {
    const exists = (target) => {
      return this.el.querySelector(target) !== null
    }
    if (!exists(".dialog__wrapper")) {
      const wrapper = document.createElement("div")
      wrapper.classList.add("dialog__wrapper")
      while (this.el.children.length) {
        wrapper.appendChild(this.el.children[0])
      }
      this.el.appendChild(wrapper)
    }
    if (!exists(".js-close-dialog")) {
      const close = document.createElement("a")
      close.classList.add("js-close-dialog", "dialog__close")
      close.setAttribute("data-dialog-id", this.el.getAttribute("id"))
      close.innerHTML = this.settings.closeText
      this.el.appendChild(close)
    }
  }
  /**
   * @description Attach events
   */
  _attachEvents() {
    if (this.el.querySelector(".js-close-dialog")) {
      this.el.querySelector(".js-close-dialog").addEventListener("click", this._close)
    }
    if (document.querySelector("._dialog_overlay")) {
      document.querySelector("._dialog_overlay").addEventListener("click", this._close)
    }
    document.addEventListener("click", (e) => {
      if (e.target === this.el) {
        this._close()
      }
    })
  }
  /**
   * @description Detach events
   */
  _detachEvents() {
    if (this.el.querySelector(".js-close-dialog")) {
      this.el.querySelector(".js-close-dialog").removeEventListener("click", this._close)
    }
    if (document.querySelector("._dialog_overlay")) {
      document.querySelector("._dialog_overlay").removeEventListener("click", this._close)
    }
  }
}
export default {
  /**
   * @param {Object} settings
   * @param {Function} callback
   * @description Initialize dialog elements in the dom
   */
  init(settings = new Object, callback) {
    let initSettings = {
      ...defaultSettings,
      ...settings
    }
    const links = document.querySelectorAll(initSettings.selector)
    if (!links.length > 0) {
      throw new Error(`⚓️ No link found with the "${initSettings.selector}" class`)
    }
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const dialog = document.getElementById(link.getAttribute("data-dialog-id"))
        if (dialog === null) {
          throw new Error(`🎯 No dialog found with the "${link.getAttribute("data-dialog-id")}" id`)
        }
        if (link.hasAttribute("data-dialog-options")) {
          let targetSettings = {
            ...initSettings,
            ...JSON.parse(link.getAttribute("data-dialog-options"))
          }
          new es6Dialog(dialog, targetSettings).open()
        }
        else {
          new es6Dialog(dialog, initSettings).open()
        }
      })
    })
    if (typeof callback === "function" && callback()) {
      callback()
    }
  }
}
/**
 * @description Gives the possibility to access the class through the window object
 */
window.es6Dialog = es6Dialog

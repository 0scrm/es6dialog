import dialogPolyfill from "dialog-polyfill"

/* Configuration */
const config = {
  global: {
    linkClass: ".js-dialog",
    isPolyfill: true,
    closeText: `<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.982 212.982" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/></svg>`,
  },
  default: {
    allowScroll: true,
    height: "auto",
    width: "600px",
    fixed: false,
    shadow: false,
  }
}

class DialogClass {
  constructor(el, options = new Object) {
    this.el = el
    this.close = (e) => this._close(e)
    this.options = {
      ...config.default,
      ...options,
    }
    Object.assign(this.el.style, this.options)
    // cleaning classes
    this.el.removeAttribute("class")
    this.el.classList.add("dialog")
    if (this.options.fixed) {
      this.el.classList.add("-fixed")
    }
    if (this.options.shadow) {
      this.el.classList.add("-shadow")
    }
    if (!this.options.allowScroll) {
      document.body.classList.add("dialog-no-scroll")
    }
    const exists = (selector) => {
      return this.el.querySelector(selector) !== null
    }
    // Creating wrapper and moving items into it
    if (!exists(".dialog__wrapper")) {
      const wrapper = document.createElement("div")
      wrapper.classList.add("dialog__wrapper")
      while (this.el.children.length) {
        wrapper.appendChild(this.el.children[0])
      }
      this.el.appendChild(wrapper)
    }

    // Creating close element
    if (!exists(".js-close-dialog")) {
      let close = document.createElement("a")
      close.classList.add("js-close-dialog", "dialog__close")
      close.setAttribute("data-dialog", this.el.getAttribute("id"))
      close.innerHTML = config.global.closeText
      this.el.appendChild(close)
    }
  }
  open() {
    if (config.global.isPolyfill) {
      dialogPolyfill.registerDialog(this.el) // Polyfill
    }
    document.querySelector("body").appendChild(this.el) // Fix z-index
    this.el.showModal()
    this.el.querySelector(".js-close-dialog").addEventListener("click", this.close)
    document.addEventListener("click", (e) => {
      if (e.target === this.el) {
        this.close()
      }
    })
    if (document.querySelector("._dialog_overlay")) {
      document.querySelector("._dialog_overlay").addEventListener("click", this.close)
    }
  }
  _close() {
    this.el.querySelector(".js-close-dialog").removeEventListener("click", this.close)
    if (document.body.classList.contains("dialog-no-scroll")) {
      document.body.classList.remove("dialog-no-scroll")
    }
    this.el.close()
  }
}

const dialog = {
  init: (callback) => {
    const links = document.querySelectorAll(config.global.linkClass)
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        let id = e.target.getAttribute("data-dialog"),
          dialog = document.getElementById(id)
        let options = new Object
        if (e.target.hasAttribute("data-dialog-options")) {
          options = JSON.parse(e.target.getAttribute("data-dialog-options"))
        }
        new DialogClass(dialog, options).open()
      })
    })
    if (typeof callback === "function" && callback()) {
      callback()
    }
  },
  create: (element, options = new Object, callback) => {
    if (config.global.isPolyfill) {
      dialogPolyfill.registerDialog(element)
    }
    new DialogClass(element, options).open()
    if (typeof callback === "function" && callback()) {
      callback()
    }
  }
}
/* Uncomment the following line if you need to initialize
  the class in another JS file, without using "import" */
window.globalDialog = DialogClass

export default dialog

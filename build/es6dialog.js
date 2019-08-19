"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _dialogPolyfill=_interopRequireDefault(require("dialog-polyfill"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),l.push.apply(l,o)}return l}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(l,!0).forEach(function(e){_defineProperty(t,e,l[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):ownKeys(l).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))})}return t}function _defineProperty(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var l=0;l<t.length;l++){var o=t[l];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,l){return t&&_defineProperties(e.prototype,t),l&&_defineProperties(e,l),e}var config={global:{linkClass:".js-dialog",isPolyfill:!0,closeText:'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.982 212.982" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/></svg>'},default:{allowScroll:!0,height:"auto",width:"600px",fixed:!1,shadow:!1}},DialogClass=function(){function s(e){var t=this,l=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new Object;_classCallCheck(this,s),this.el=e,this.close=function(e){return t._close(e)},this.options=_objectSpread({},config.default,{},l),Object.assign(this.el.style,this.options),this.el.removeAttribute("class"),this.el.classList.add("dialog"),this.options.fixed&&this.el.classList.add("-fixed"),this.options.shadow&&this.el.classList.add("-shadow"),this.options.allowScroll||document.body.classList.add("dialog-no-scroll");function o(e){return null!==t.el.querySelector(e)}if(!o(".dialog__wrapper")){var i=document.createElement("div");for(i.classList.add("dialog__wrapper");this.el.children.length;)i.appendChild(this.el.children[0]);this.el.appendChild(i)}if(!o(".js-close-dialog")){var n=document.createElement("a");n.classList.add("js-close-dialog","dialog__close"),n.setAttribute("data-dialog-id",this.el.getAttribute("id")),n.innerHTML=config.global.closeText,this.el.appendChild(n)}}return _createClass(s,[{key:"open",value:function(){var t=this;config.global.isPolyfill&&_dialogPolyfill.default.registerDialog(this.el),document.querySelector("body").appendChild(this.el),this.el.showModal(),this.el.querySelector(".js-close-dialog").addEventListener("click",this.close),document.addEventListener("click",function(e){e.target===t.el&&t.close()}),document.querySelector("._dialog_overlay")&&document.querySelector("._dialog_overlay").addEventListener("click",this.close)}},{key:"_close",value:function(){this.el.querySelector(".js-close-dialog").removeEventListener("click",this.close),document.body.classList.contains("dialog-no-scroll")&&document.body.classList.remove("dialog-no-scroll"),this.el.close()}}]),s}(),dialog={init:function(e){document.querySelectorAll(config.global.linkClass).forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var t=this.getAttribute("data-dialog-id"),l=document.getElementById(t),o=new Object;this.hasAttribute("data-dialog-options")&&(o=JSON.parse(this.getAttribute("data-dialog-options"))),new DialogClass(l,o).open()})}),"function"==typeof e&&e()&&e()},create:function(e,t,l){var o=1<arguments.length&&void 0!==t?t:new Object,i=2<arguments.length?l:void 0;config.global.isPolyfill&&_dialogPolyfill.default.registerDialog(e),new DialogClass(e,o).open(),"function"==typeof i&&i()&&i()}};window.globalDialog=DialogClass;var _default=dialog;exports.default=_default;
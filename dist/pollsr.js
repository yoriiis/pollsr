!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var n in s)("object"==typeof exports?exports:t)[n]=s[n]}}(window,(function(){return function(t){var e={};function s(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,s),o.l=!0,o.exports}return s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s="./src/scripts/index.js")}({"./src/scripts/index.js":function(t,e,s){"use strict";s.r(e);var n=s("./src/scripts/pollsr-core.js");s.d(e,"PollsrCore",(function(){return n.default}));var o=s("./src/scripts/pollsr-template.js");s.d(e,"PollsrTemplate",(function(){return o.default}))},"./src/scripts/pollsr-core.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return o}));var n=s("./src/scripts/pollsr-template.js");
/**
 * @license MIT
 * @name Pollsr
 * @version 1.0.2
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Pollsr library to dynamically create polls with a minimalist elegant theme
 * {@link https://github.com/yoriiis/pollsr}
 * @copyright 2020 Joris DANIEL
 **/class o{constructor(t){const e=t||{};this.options=Object.assign({element:null,template:null,datas:null,hasVoted:!1,onAction:null},e)}create(){if(null===this.options.template&&(this.options.template=new n.default),"function"!=typeof this.options.template.init)throw new Error('Pollsr::PollsrTemplate need an "init" function.');this.initTemplate()}initTemplate(){this.options.template.init({element:this.options.element,datas:this.options.datas,hasVoted:this.options.hasVoted,onAction:this.options.onAction})}destroy(){this.options.template.destroy()}}},"./src/scripts/pollsr-template.js":function(t,e,s){"use strict";s.d(e,"default",(function(){return n}));s("./src/styles/base.css");class n{constructor(){var t,e,s;s=async t=>{t.preventDefault(),this.options.hasVoted||(this.options.hasVoted=!0,"function"==typeof this.options.onAction&&(this.currentAnswer=t.target.getAttribute("data-answer-id"),await this.options.onAction(this.currentAnswer),this.updateTemplateAfterVote()))},(e="clickToRespond")in(t=this)?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s}init(t){this.options=t,this.buildDOM(this.getTemplate(this.options.datas)),this.addEvents(),this.options.hasVoted&&this.updateTemplateAfterVote()}getTemplate(t){return`<div class="pollsr${this.options.hasVoted?" has-voted":""}">\n\t\t\t\t\t<p class="pollsr-question">${t.question}</p>\n\t\t\t\t\t<ul class="pollsr-answers">\n\t\t\t\t\t\t${this.getAnswersList(t.answers)}\n\t\t\t\t\t</ul>\n\t\t\t\t</div>`}getAnswersList(t){let e="";return t.forEach(t=>{let s="";t.image&&(s=`<div class="pollsr-picture">\n\t\t\t\t\t\t\t<img src="${t.image}" alt="${t.title}" />\n\t\t\t\t\t\t</div>`),e+=`<li class="pollsr-answerItem">\n\t\t\t\t\t\t<button class="pollsr-button" data-answer-id="${t.id}" data-pollsr-respond>\n\t\t\t\t\t\t\t<figure>\n\t\t\t\t\t\t\t\t${s}\n\t\t\t\t\t\t\t\t<figcaption>\n\t\t\t\t\t\t\t\t\t<p>${t.title}</p>\n\t\t\t\t\t\t\t\t</figcaption>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</li>`}),e}buildDOM(t){this.options.element.insertAdjacentHTML("beforeend",t)}addEvents(){this.onClickToElement=t=>{const e=t.target;"button"===e.nodeName.toLowerCase()&&e.hasAttribute("data-pollsr-respond")&&this.clickToRespond(t)},this.options.element.addEventListener("click",this.onClickToElement,!1)}updateTemplateAfterVote(){this.options.element.querySelector(".pollsr").classList.add("has-voted")}destroy(){this.options.element.removeEventListener("click",this.onClickToElement),this.options.element.removeChild(this.options.element.querySelector(".pollsr"))}}},"./src/styles/base.css":function(t,e,s){}})}));
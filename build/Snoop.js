"use strict";var _createClass=function(){function n(n,t){for(var o in t){var r=t[o];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(n,t)}return function(t,o,r){return o&&n(t.prototype,o),r&&n(t,r),t}}(),_classCallCheck=function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")},Snoop;!function(n){function t(n,t){if(this.hasOwnProperty(n))throw new Error("Already snooping on "+n);var o={execute:!0,showReturn:!0,showArgNames:!0},r=i(t),e={};r.forEach(function(r){var u=c(t,n,r,o);e[r]=new a(u)}),this[n]=e}function o(n){var t=n.toString().replace(p,""),o=t.match(s);return o?o[1].split(f).map(function(n){return n.trim()}):[]}function r(n){return"string"==typeof n?'"'+n+'"':n}function e(n,t,o){var e,u=[n.objectName+"#"+n.funcName+"("];for(e=0;e<t.length;e++)0!==e&&u.push(","),n.options.showArgNames&&n.funcSig[e]&&u.push(n.funcSig[e]+" ="),u.push(r(t[e]));return u.push(")"),n.options.showReturn&&(u.push("->"),u.push(r(o))),u}function u(n){return function(){for(var t=arguments.length,o=Array(t),r=0;t>r;r++)o[r]=arguments[r];var u;return n.options.execute&&(u=n.func.apply(this,o)),console.log.apply(console,e(n,o,u)),u}}function c(n,t,r,e){var u=n[r];return{object:n,objectName:t,func:u,funcName:r,funcSig:o(u),options:e}}function i(n){var t=[];for(var o in n)"[object Function]"===Object.prototype.toString.call(n[o])&&t.push(o);return t}n.register=t;var a=function(){function n(t){_classCallCheck(this,n),this.info=t}return _createClass(n,{on:{value:function(){var n=this.info,t=n.object,o=n.funcName;t[o]=u(this.info)}},off:{value:function(){var n=this.info,t=n.object,o=n.funcName,r=n.func;t[o]=r}}}),n}(),s=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,f=/,/,p=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm}(Snoop||(Snoop={}));
//# sourceMappingURL=Snoop.js.map

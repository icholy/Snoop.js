"use strict";var _createClass=function(){function n(n,o){for(var t in o){var e=o[t];e.configurable=!0,e.value&&(e.writable=!0)}Object.defineProperties(n,o)}return function(o,t,e){return t&&n(o.prototype,t),e&&n(o,e),o}}(),_classCallCheck=function(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")},Snoop;!function(n){function o(n,o){function t(t){var u=i(o,n,t,r);s[t]=new c(u),e&&s[t].on()}var e=void 0===arguments[2]?!1:arguments[2];if(this.hasOwnProperty(n))throw new Error("Already snooping on "+n);var r={execute:!0,showReturn:!0,showArgNames:!0},u=a(o),s={};u.forEach(t),s.snoop=t,this[n]=s}function t(n){var o=n.toString().replace(p,""),t=o.match(s);return t?t[1].split(f).map(function(n){return n.trim()}):[]}function e(n){return"string"==typeof n?'"'+n+'"':n}function r(n,o,t){var r,u=[n.objectName+"#"+n.funcName+"("];for(r=0;r<o.length;r++)0!==r&&u.push(","),n.options.showArgNames&&n.funcSig[r]&&u.push(n.funcSig[r]+" ="),u.push(e(o[r]));return u.push(")"),n.options.showReturn&&(u.push("->"),u.push(e(t))),u}function u(n){return function(){for(var o=arguments.length,t=Array(o),e=0;o>e;e++)t[e]=arguments[e];var u;return n.options.execute&&(u=n.func.apply(this,t)),console.log.apply(console,r(n,t,u)),u}}function i(n,o,e,r){var u=n[e];return{object:n,objectName:o,func:u,funcName:e,funcSig:t(u),options:r}}function a(n){var o=[];for(var t in n)"[object Function]"===Object.prototype.toString.call(n[t])&&o.push(t);return o}n.register=o;var c=function(){function n(o){_classCallCheck(this,n),this.info=o}return _createClass(n,{on:{value:function(){var n=this.info,o=n.object,t=n.funcName;o[t]=u(this.info)}},off:{value:function(){var n=this.info,o=n.object,t=n.funcName,e=n.func;o[t]=e}}}),n}(),s=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,f=/,/,p=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;n.enumerateMethods=a}(Snoop||(Snoop={})),"undefined"!=typeof module&&(module.exports=Snoop);
//# sourceMappingURL=Snoop.js.map
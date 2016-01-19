Snoop.js
========

> This is a debugging tool that logs method invocations on an object.
> The API was designed to be easy to use interactively with autocomplete.

![](http://i.imgur.com/nQv8ADL.jpg)

### Register an object to snoop on.

``` js
Snoop.register('$', $);

// turn on snooping for all methods
Snoop.register('$', $, true);
```

### Turn on snooping for `$.ajax`
``` js
Snoop.$.ajax.on();
```

### Turn off snooping for `$.ajax`
``` js
Snoop.$.ajax.off();
```

### Demo
![](http://i.imgur.com/GeYpexW.gif)

[Bookmarklet](javascript:void%20function(){var%20n,t=function(){function%20n(n,t){for(var%20o%20in%20t){var%20r=t[o];r.configurable=!0,r.value%26%26(r.writable=!0)}Object.defineProperties(n,t)}return%20function(t,o,r){return%20o%26%26n(t.prototype,o),r%26%26n(t,r),t}}(),o=function(n,t){if(!(n%20instanceof%20t))throw%20new%20TypeError(%22Cannot%20call%20a%20class%20as%20a%20function%22)};!function(n){function%20r(n,t){function%20o(o){var%20u=a(t,n,o,e);i[o]=new%20s(u),r%26%26i[o].on()}var%20r=void%200===arguments[2]%3F!1:arguments[2];if(this.hasOwnProperty(n))throw%20new%20Error(%22Already%20snooping%20on%20%22+n);var%20e={execute:!0,showReturn:!0,showArgNames:!0},u=f(t),i={};u.forEach(o),i.snoop=o,this[n]=i}function%20e(n){var%20t=n.toString().replace(l,%22%22),o=t.match(p);return%20o%3Fo[1].split(h).map(function(n){return%20n.trim()}):[]}function%20u(n){return%22string%22==typeof%20n%3F'%22'+n+'%22':n}function%20i(n,t,o){var%20r,e=[n.objectName+%22%23%22+n.funcName+%22(%22];for(r=0;r%3Ct.length;r++)0!==r%26%26e.push(%22,%22),n.options.showArgNames%26%26n.funcSig[r]%26%26e.push(n.funcSig[r]+%22%20=%22),e.push(u(t[r]));return%20e.push(%22)%22),n.options.showReturn%26%26(e.push(%22-%3E%22),e.push(u(o))),e}function%20c(n){return%20function(){for(var%20t=arguments.length,o=Array(t),r=0;t%3Er;r++)o[r]=arguments[r];var%20e;return%20n.options.execute%26%26(e=n.func.apply(this,o)),console.log.apply(console,i(n,o,e)),e}}function%20a(n,t,o,r){var%20u=n[o];return{object:n,objectName:t,func:u,funcName:o,funcSig:e(u),options:r}}function%20f(n){var%20t=[];for(var%20o%20in%20n)%22[object%20Function]%22===Object.prototype.toString.call(n[o])%26%26t.push(o);return%20t}n.register=r;var%20s=function(){function%20n(t){o(this,n),this.info=t}return%20t(n,{on:{value:function(){var%20n=this.info,t=n.object,o=n.funcName;t[o]=c(this.info)}},off:{value:function(){var%20n=this.info,t=n.object,o=n.funcName,r=n.func;t[o]=r}}}),n}(),p=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,h=/,/,l=/((\/\/.*$)|(\/\*[\s\S]*%3F\*\/))/gm;n.enumerateMethods=f}(n||(n={})),%22undefined%22!=typeof%20module%26%26(module.exports=n)}();)

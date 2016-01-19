Snoop.js
========

> This is a debugging tool that logs method invocations on an object.

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

![](http://i.imgur.com/GeYpexW.gif)


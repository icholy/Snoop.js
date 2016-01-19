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


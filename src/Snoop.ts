var snoop = function (className, object, options) {
  
  var options      = options || {},
      execute      = options.execute,
      showReturn   = options.showReturn,
      showArgNames = options.showArgNames,
      whitelist    = options.whitelist,
      blacklist    = options.blacklist,
      callback     = options.callback;

  var noop = function () {};

  if (typeof execute      === 'undefined') { execute      = true; }
  if (typeof showReturn   === 'undefined') { showReturn   = true; }
  if (typeof showArgNames === 'undefined') { showArgNames = true; }
  if (typeof whitelist    === 'undefined') { whitelist    = [];   }
  if (typeof blacklist    === 'undefined') { blacklist    = [];   }
  if (typeof callback     === 'undefined') { callback     = noop; }

  var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      FN_ARG_SPLIT   = /,/,
      STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
 
  var fnSignature = function (fn) {
    var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
        args   = fnText.match(FN_ARGS);
    if (!args) { return []; }
    return args[1].split(FN_ARG_SPLIT).map(function (arg) {
      return arg.trim();
    });
  };
 
  var formatArg = function (arg) {
    if (typeof arg === 'string') {
      return '"' + arg + '"';
    } else {
      return arg;
    }
  };
 
  var formatMsg = function (method, sig, args, ret) {
    var msg = [className + '#' + method + '('],
        i;
    for (i = 0; i < args.length; i++) {
      if (i !== 0) {
        msg.push(',');
      }
      if (showArgNames && sig[i]) {
        msg.push(sig[i] + ' =');
      }
      msg.push(formatArg(args[i]));
    }
    msg.push(')')
    if (showReturn) {
      msg.push('->');
      msg.push(formatArg(ret));
    }
    return msg;
  };
 
  var makeFn = function (method) {
    var fn  = object[method],
        sig = fnSignature(fn);
    return function (/* ... */) {
      var args = Array.prototype.slice.call(arguments),
          ret;
      if (execute) {
        ret = fn.apply(this, args);
      }
      console.log.apply(
        console,
        formatMsg(method, sig, args, ret)
      );
      return ret;
    };
  };

  // enumerate all the methods
  var methods = [];
  for (var key in object) {
    if (Object.prototype.toString.call(object[key]) === '[object Function]') {
      methods.push(key);
    }
  }

  // enforce white and black lists
  if (whitelist.length > 0) {
    methods = methods.filter(function (method) {
      return whitelist.indexOf(method) !== -1;
    });
  }
  if (blacklist.length > 0) {
    methods = methods.filter(function (method) {
      return blacklist.indexOf(method) === -1;
    });
  }

  // augment the methods
  methods.forEach(function (method) {
    object[method] = makeFn(method);
  });

  return object;
};

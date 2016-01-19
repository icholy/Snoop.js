var snoop = function (className, object, options) {
  
  var options      = options || {},
      execute      = options.execute,
      showReturn   = options.showReturn, 
      showArgNames = options.showArgNames;

  if (typeof execute      === 'undefined') { execute      = true; }
  if (typeof showReturn   === 'undefined') { showReturn   = true; }
  if (typeof showArgNames === 'undefined') { showArgNames = true; }

  var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      FN_ARG_SPLIT   = /,/,
      FN_ARG         = /^\s*(_?)(\S+?)\1\s*$/,
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
 
  var formatMsg = function (key, sig, args, ret) {
    var msg = [className + '#' + key + '('],
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
 
  var makeFn = function (key) {
    var fn  = object[key],
        sig = fnSignature(fn);
    return function (/* ... */) {
      var args = Array.prototype.slice.call(arguments),
          ret;
      if (execute) {
        ret = fn.apply(this, args);
      }
      console.log.apply(
        console,
        formatMsg(key, sig, args, ret)
      );
      return ret;
    };
  };
 
  for (var key in object) {
    if (Object.prototype.toString.call(object[key]) === '[object Function]') {
      object[key] = makeFn(key);
    }
  }
 
  return object;
};

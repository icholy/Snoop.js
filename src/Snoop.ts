
module Snoop {

  export interface Options {
    execute:      boolean;
    showReturn:   boolean;
    showArgNames: boolean;
    whitelist:    string[];
    blacklist:    string[];
  }

  interface MethodInfo {
    object:     any;
    objectName: string;
    func:       Function;
    funcName:   string;
    funcSig:    string[];
    options:    Options;
  }

  export var objects = {};

  export function register(name: string, object: any, options: Options): void {
    if (objects.hasOwnProperty(name)) {
      throw new Error(`Already snooping on ${name}`);
    }
    let methods = enumerateMethods(objects);
    let wrapper = {};
    methods.forEach((method: string) => {
      let info = methodInfo(object, name, method, options);
      wrapper[method] = new Method(info);
    });
    objects[name] = wrapper;
  }

  class Method {

    constructor(public info: MethodInfo) {}

    on(): void {
      let { object, funcName } = this.info;
      object[funcName] = makeFn(this.info);
    }

    off(): void {
      let { object, funcName, func } = this.info;
      object[funcName] = func;
    }
  }

  var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      FN_ARG_SPLIT   = /,/,
      STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
 
  function fnSignature(fn: Function): string[] {
    var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
        args   = fnText.match(FN_ARGS);
    if (!args) { return []; }
    return args[1].split(FN_ARG_SPLIT).map(function (arg) {
      return arg.trim();
    });
  };
 
  function formatArg(arg: any): any {
    if (typeof arg === 'string') {
      return '"' + arg + '"';
    } else {
      return arg;
    }
  }
 
  function formatMsg(info: MethodInfo, args: any[], ret: any): string[] {
    var msg = [info.objectName + '#' + info.funcName + '('],
        i;
    for (i = 0; i < args.length; i++) {
      if (i !== 0) {
        msg.push(',');
      }
      if (info.options.showArgNames && info.funcSig[i]) {
        msg.push(info.funcSig[i] + ' =');
      }
      msg.push(formatArg(args[i]));
    }
    msg.push(')')
    if (info.options.showReturn) {
      msg.push('->');
      msg.push(formatArg(ret));
    }
    return msg;
  }
 
  function makeFn(info: MethodInfo): Function {
    return function (/* ... */) {
      var args = Array.prototype.slice.call(arguments),
          ret;
      if (info.options.execute) {
        ret = info.func.apply(this, args);
      }
      console.log.apply(
        console,
        formatMsg(info, args, ret)
      );
      return ret;
    };
  }

  function methodInfo(object: any, objectName: string, funcName: string, options: Options): MethodInfo {
    let func = object[funcName];
    return {
      object:     object,
      objectName: objectName,
      func:       func,
      funcName:   funcName,
      funcSig:    fnSignature(func),
      options:    options
    };
  }

  function enumerateMethods(object: any): string[] {
    var methods = [];
    for (var key in object) {
      if (Object.prototype.toString.call(object[key]) === '[object Function]') {
        methods.push(key);
      }
    }
    return methods;
  }

}

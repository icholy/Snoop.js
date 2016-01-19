
module Snoop {

  export interface Options {
    showReturn:   boolean;
    showArgNames: boolean;
  }

  interface MethodInfo {
    object:     any;
    objectName: string;
    func:       Function;
    funcName:   string;
    funcSig:    string[];
    options:    Options;
  }

  /**
   * Register an object for snooping
   *
   * @param name The object's name
   * @param object The object
   * @param allon Turn on snooping on all methods
   */
  export function register(name: string, object: any, allon: boolean = false): void {
    if (this.hasOwnProperty(name)) {
      throw new Error(`Already snooping on ${name}`);
    }
    let options = {
      showReturn:   true,
      showArgNames: true
    };
    let methods = enumerateMethods(object);
    let wrapper: any = {};
    function snoop(method: string) {
      let info = methodInfo(object, name, method, options);
      wrapper[method] = new Method(info);
      if (allon) {
        wrapper[method].on();
      }
    }
    methods.forEach(snoop);
    wrapper.snoop = snoop;
    this[name] = wrapper;
  }

  class Method {

    constructor(public info: MethodInfo) {}

    /**
     * Turn on snooping for this method
     */
    on(): void {
      let { object, funcName } = this.info;
      object[funcName] = makeFn(this.info);
    }

    /**
     * Turn off snooping for this method
     */
    off(): void {
      let { object, funcName, func } = this.info;
      object[funcName] = func;
    }
  }

  var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      FN_ARG_SPLIT   = /,/,
      STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
 
  /**
   * Extract a function's parameter names
   *
   * @param fn The Function
   * @return An array of the parameters
   */
  function fnSignature(fn: Function): string[] {
    var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
        args   = fnText.match(FN_ARGS);
    if (!args) { return []; }
    return args[1].split(FN_ARG_SPLIT).map(function (arg) {
      return arg.trim();
    });
  }
 
  /**
   * Format an argument for printing
   *
   * @param arg The argument to format
   * @return Formatted argument
   */
  function formatArg(arg: any): any {
    if (typeof arg === 'string') {
      return '"' + arg + '"';
    } else {
      return arg;
    }
  }
 
  /**
   * Format a method invokation for printing
   *
   * @param info Context information for the method
   * @param args Arguments the method was invoked with
   * @param ret Method return value
   * @return Message ready to print
   */
  function formatMsg(msgType: string, info: MethodInfo, args: any[], ret: any): string[] {
    var msg = [msgType + ' - ' + info.objectName + '#' + info.funcName + '('],
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
 
  /**
   * Make a proxy function that logs invocations
   *
   * @param info Context information for the method
   * @return The proxy function
   */
  function makeFn(info: MethodInfo): Function {
    return function (...args:any[]) {
      console.log.apply(
        console,
        formatMsg('call', info, args, undefined)
      );
      let ret = info.func.apply(this, args);
      console.log.apply(
        console,
        formatMsg('return', info, args, ret)
      );
      return ret;
    };
  }

  /**
   * Create context information for a method
   *
   * @param object Method's parent object
   * @param objectName parent object's name
   * @param funcName The method property name
   * @param options Snoop options
   * @return Context information for method
   */
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

  /**
   * Enumerate methods on an object
   *
   * @param object The object to get method names from
   * @return Array of method names
   */
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

declare var module: any;
if (typeof module !== 'undefined') {
  module.exports = Snoop;
}


declare module Snoop {
    interface Options {
        execute: boolean;
        showReturn: boolean;
        showArgNames: boolean;
        whitelist: string[];
        blacklist: string[];
    }
    var objects: {};
    function register(name: string, object: any, options: Options): void;
}

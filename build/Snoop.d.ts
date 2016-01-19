declare module Snoop {
    interface Options {
        execute: boolean;
        showReturn: boolean;
        showArgNames: boolean;
    }
    function register(name: string, object: any): void;
    function enumerateMethods(object: any): string[];
}
declare var module: any;

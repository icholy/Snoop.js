declare module Snoop {
    interface Options {
        execute: boolean;
        showReturn: boolean;
        showArgNames: boolean;
    }
    function register(name: string, object: any, allon?: boolean): void;
    function enumerateMethods(object: any): string[];
}
declare var module: any;

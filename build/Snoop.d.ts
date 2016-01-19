declare module Snoop {
    interface Options {
        execute: boolean;
        showReturn: boolean;
        showArgNames: boolean;
    }
    /**
     * Register an object for snooping
     *
     * @param name The object's name
     * @param object The object
     * @param allon Turn on snooping on all methods
     */
    function register(name: string, object: any, allon?: boolean): void;
}
declare var module: any;

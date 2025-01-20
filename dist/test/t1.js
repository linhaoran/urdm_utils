"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greeter(fn) {
    fn("Hello, World");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);

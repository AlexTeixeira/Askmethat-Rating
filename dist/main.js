"use strict";
var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () {
        return "Hello";
    };
    return Greeter;
}());
exports.__esModule = true;
exports["default"] = Greeter;
var greeter = new Greeter();

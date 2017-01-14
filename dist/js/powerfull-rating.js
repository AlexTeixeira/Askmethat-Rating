define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    var Greeter = (function () {
        function Greeter() {
        }
        Greeter.prototype.greet = function () {
            return "Hello";
        };
        return Greeter;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Greeter;
    var greeter = new Greeter();
});

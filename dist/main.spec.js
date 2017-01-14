"use strict";
var main_1 = require("main");
var subject;
beforeEach(function () {
    subject = new main_1["default"]();
});
describe('#display', function () {
    it('expecting hello', function () {
        var result = subject.greet();
        if (result !== "Hello") {
            throw new Error("Expected Hello");
        }
    });
});

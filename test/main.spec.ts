import * as mocha from 'mocha';
import Greeter from '../src/ts/main';

var subject : Greeter;

mocha.beforeEach(function () {
    subject = new Greeter();
});


mocha.describe('#display', () => {
  mocha.it('expecting hello', () => {
    var result : string = subject.greet();
      if (result !== "Hello") {
        throw new Error("Expected Hello");
      }
    });
  });

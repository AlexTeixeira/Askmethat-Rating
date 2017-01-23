/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/modules/chai/index.d.ts" />

import { expect, assert } from 'chai';

import {AskmethatRating} from '../src/ts/amt-rating';


var subject : AskmethatRating;
var div : HTMLDivElement;

beforeEach(function () {
     div = <HTMLDivElement>document.getElementById("amtTest");
    if(div){
      div.innerHTML = "";
    }
    else{
        div = document.createElement("div");
        div.id = "amtTest";
    }
     var options = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 2,
        maxRating: 5
      
      };

    subject = new AskmethatRating(div,options);

});


describe('#configuration', () => {
     it('expecting to have specific options', () => {
       var options = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 0,
        maxRating: 5
      
      };
      var amt = new AskmethatRating(div, options );

      expect(amt.defaultOptions).deep.equal(options);
    });

    it('expecting to have two object with two configuration different', () => {
       var options1 = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 0,
        maxRating: 5
      
      };

      var options2 = {
        backgroundColor : "#ffff66",
        hoverColor: "#e5e500",
        fontClass: "fa fa-class",
        minRating: 0,
        maxRating: 5
      
      };
      var amt1 = new AskmethatRating(div, options1 );
      var amt2 = new AskmethatRating(div, options2 );

      expect(amt1.defaultOptions).deep.equal(options1);
      expect(amt2.defaultOptions).deep.equal(options2);

    });
});

describe('#display', () => {
  it('expecting to create multiple span in div', () => {
      expect(div.innerHTML.indexOf("span")).to.be.least(0);
    });

    it("expecting max number of span", () => {
      expect(div.childElementCount ).to.be.equal(subject.defaultOptions.maxRating);
    });

     it("expecting specific number of actives", () => {
      var spans = div.children;

      var total = 0;
      for(var i = 0; i < subject.defaultOptions.maxRating; i++){  
        var element = spans[i];      
        if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" amt-active ") > -1 ) 
          total += 1;
      }

      expect(total).to.be.equal(subject.defaultOptions.minRating);
      
    });

    it("expecting last active is selected", () => {
      var spans = div.querySelectorAll(".amt-active");

      var last = <HTMLSpanElement>spans[subject.defaultOptions.minRating - 1];

      expect(last.classList.contains(".amt-selected")).to.be.not.equal(undefined);


    });

     it("expecting to retrieve rating value after first render", () => {
        expect(subject.value).to.be.equal(subject.defaultOptions.minRating);
     });


  });

  describe('#value', () => {

      it("expecting to retrieve correct rating value after an update", () => {
        let val = 3
        subject.value = val;

        expect(subject.value).to.be.equal(val);

     });

     it("expecting that throw an error if new value is less than min rating", () => {
       let val = 1;
        expect(() => {subject.value = val }).to.throw(Error,"New value cannot be less than min rating value");
     });

  });


    describe('#events', () => {

      it("Trigger a click in a specific rating element", () => {
        let val = 2;
        var span = <HTMLSpanElement> div.children[val];
        span.click();

        expect(subject.value).to.be.equal(val+1);

     });

    it("Trigger a mouseenter in specific rating element", () => {
        let val = 3;
        var span = <HTMLSpanElement> div.children[val];

        var event;
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('mouseenter', true, true, window);
        span.dispatchEvent(event);

        expect(span.classList.contains("amt-active")).to.be.true;

     });

     it("Trigger a mouseout in specific rating element", () => {
        let val = 3;
        var span = <HTMLSpanElement> div.children[val];

        var event;
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('mouseenter', true, true, window);
        span.dispatchEvent(event);

        event.initMouseEvent('mouseout', true, true, window);
        span.dispatchEvent(event);

        expect(span.classList.contains("amt-active")).to.be.false;

     });


  });

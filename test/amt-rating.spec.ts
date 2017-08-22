import { expect, assert } from 'chai';

import {AskmethatRatingPopover} from "../src/ts/amt-rating-popover";

import {AskmethatRating} from '../src/ts/amt-rating';


class TestPrivates extends AskmethatRating{
  constructor(element: HTMLDivElement, defaultValue?: number, options?: any){
    super(element,defaultValue,options);
  }

  public testGetValueAccordingToStep(value: number){
    return this.getValueAccordingToStep(value);
  }

  public testSetorUnset(value: number){
    return this.setOrUnsetActive(value);
  }

  public testMutationDisableEvent(mutations: MutationRecord[]){
    return this.mutationDisableEvent(mutations);
  }
}


var subject : AskmethatRating;
var div : HTMLDivElement;
var defaultValue : number = 1;

beforeEach(function () {
     div = <HTMLDivElement>document.getElementById("amtTest");
    if(div){
      div.innerHTML = "";
    }
    else{
        div = document.createElement("div");
        div.id = "amtTest";
        document.body.appendChild(div);
    }

   
    var options = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 1,
        maxRating: 5,
        readonly: false,
        step: 2
      
      };
      subject = new AskmethatRating(div, 1, options);
});


describe('#configuration', () => {
     it('expecting to have specific options', () => {
       var options = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 1,
        maxRating: 5,
        readonly: false,
        step: 0,
        inputName: "AmtRating"
      
      };
      var amt = new AskmethatRating(div, 1, options);

      expect(amt.defaultOptions).deep.equal(options);
    });

    it('expecting to have two object with two configuration different', () => {
       var options1 = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 0,
        maxRating: 5,
        readonly: false,
        step: 0,
        inputName: "AmtRating"

      
      };

      var options2 = {
        backgroundColor : "#ffff66",
        hoverColor: "#e5e500",
        fontClass: "fa fa-class",
        minRating: 0,
        maxRating: 5,
        readonly: false,
        step: 0,
        inputName: "AmtRating2"

      };
      var amt1 = new AskmethatRating(div, 1, options1 );
      var amt2 = new AskmethatRating(div, 1, options2 );

      expect(amt1.defaultOptions).deep.equal(options1);
      expect(amt2.defaultOptions).deep.equal(options2);

    });

  it('expecting to throw an error if default value is less than minRating', () => {
       var options = {
        backgroundColor : "#ccc",
        hoverColor: "#eee",
        fontClass: "fa fa-class",
        minRating: 2,
        maxRating: 5,
        readonly: false,
        step: 0
      
      };
      expect(() => {new AskmethatRating(div, 1, options)}).to.throw(Error,"Default value should be higher than minRating options");

    });

     it('expecting have number of spans equal to maxRating', () => {
       
      var nbSpan = div.querySelectorAll("span.amt-rating-elem").length;
      expect(nbSpan).to.be.equal(subject.defaultOptions.maxRating);

    });

    it('expecting to have custom input name', () => {
       var cOptions = {
        inputName: "toto"
      };
      var amt1 = new AskmethatRating(div, 1, cOptions);
      var inputName = div.querySelector("input").getAttribute("name");
      expect(amt1.defaultOptions.inputName).deep.equal(inputName);
    });

});

describe('#display', () => {
  it('expecting to create multiple span in div', () => {
      expect(div.innerHTML.indexOf("span")).to.be.least(0);
    });

     it("expecting specific number of actives", () => {
      var spans = div.children;

      var total = 0;
      for(var i = 0; i < subject.defaultOptions.maxRating; i++){  
        var element = spans[i];      
        if ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" amt-active ") > -1 ) 
          total += 1;
      }

      expect(total).to.be.equal(defaultValue);
      
    });

    it("expecting last active is selected", () => {
      var spans = div.querySelectorAll(".amt-active");

      var last = <HTMLSpanElement>spans[defaultValue - 1];

      expect(last.classList.contains(".amt-selected")).to.be.not.equal(undefined);

    });

     it("expecting to retrieve rating value after first render", () => {
        expect(subject.value).to.be.equal(defaultValue);
     });

     it("expection selected span to have width in under", () =>{
         var options = {
          backgroundColor : "#ccc",
          hoverColor: "#eee",
          fontClass: "fa fa-class",
          minRating: 1,
          maxRating: 5,
          readonly: false,
          step: 0
        
        };

      subject = new AskmethatRating(div,1.2, options);
      var span = <HTMLSpanElement>div.querySelector(".amt-selected");
      var underSpan =  <HTMLSpanElement>span.querySelector(".amt-rating-under");

       var m = parseFloat((1.2 % 1).toFixed(1));
       var w = (m * 100) + "%";

       expect(underSpan.style.width).to.be.equal(w);
     });


  });

  describe('#value', () => {

      it("expecting to retrieve correct rating value after an update", () => {
        let val = 3
        subject.value = val;

        expect(subject.value).to.be.equal(val);

     });

     it("expecting that throw an error if new value is less than min rating", () => {
       let val = 0.5;
        expect(() => {subject.value = val }).to.throw(Error,"New value cannot be less than min rating value");
     });


     it("Throw error trying to retrieve value without object", () => {
        expect(() => {
          AskmethatRating.value("#toto")
        
        }).to.throw(Error,"container do not exist");

     });

    it("Retrieve value without object", () => {
      var val =  AskmethatRating.value("#amtTest")
        expect(val).to.be.equal(defaultValue);
     });

     it("Expecting to have the same value for input & plugin", () => {
        var val =  subject.value;
        var div = document.getElementById("amtTest");
        var inputVal = div.getElementsByTagName("input")[0].value;
        
        expect(val.toString()).to.be.equal(inputVal);
     });
  });


    describe('#events', () => {

      it("Trigger a click in a specific rating element", () => {
        let val = 3;
        var span = <HTMLSpanElement> div.querySelector(".amt-rating-elem[data-rating='"+ val +"']");
        span.click();
        expect(subject.value).to.be.equal(val - 1);

     });

    it("Trigger a mousemove in specific rating element", () => {
        let val = 3;
        var span = <HTMLSpanElement> div.querySelector(".amt-rating-elem[data-rating='"+ val +"']");

        var event;
        event = document.createEvent('MouseEvents');
        event.initEvent('mousemove', true, true);
        span.dispatchEvent(event);

        expect(span.classList.contains("amt-active")).to.be.true;

     });

  
     it("Trigger a mouseleave in specific rating element", () => {
        let val = 4;
        var span = <HTMLSpanElement> div.querySelector(".amt-rating-elem[data-rating='"+ val +"']");

        var event;
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('mousemove', true, true, window);
        span.dispatchEvent(event);

        event.initMouseEvent('mouseleave', true, true, window);
        div.dispatchEvent(event);

        expect(span.classList.contains("amt-active")).to.be.false;

     });

     it("Do not trigger event if readonly is true", () => {
        var options = {
          backgroundColor : "#ccc",
          hoverColor: "#eee",
          fontClass: "fa fa-class",
          minRating: 1,
          maxRating: 5,
          readonly: true,
          step: 0
       };

       subject = new AskmethatRating(div,1, options);
       let val = 2;
       var span = <HTMLSpanElement> div.children[val];
       span.click();

       expect(subject.value).not.to.be.equal(val+1);

     });


    it('expecting to do not set a rating value less than the min rating on click', () => {
      var options = {
          backgroundColor : "#ccc",
          hoverColor: "#eee",
          fontClass: "fa fa-class",
          minRating: 2,
          maxRating: 5,
          readonly: false,
          step: 0
        
        };
        
        var amt = new AskmethatRating(div, 2, options);

        let val = 0;
        var span = <HTMLSpanElement> div.children[val];
        span.click();

        expect(amt.value).to.be.equal(2);
      
    });

    it('expecting to do not set a active rating if is less than the min rating on mouse over', () => {
      var options = {
          backgroundColor : "#ccc",
          hoverColor: "#eee",
          fontClass: "fa fa-class",
          minRating: 2,
          maxRating: 5,
          readonly: false,
          step: 0
        
        };
        
        var amt = new AskmethatRating(div, 2, options);

        let val = 0;
        var span = <HTMLSpanElement> div.children[val];

        var event;
        event = document.createEvent('MouseEvents');
        event.initEvent('mousemove', true, true);
        span.dispatchEvent(event);

        expect(span.classList.contains("amt-active")).to.be.true;
      
    });


    it("expecting no event if disabled or not is set to input", () =>{
        var input = div.querySelector("input[type='hidden']");
        input.setAttribute("disabled", "disabled");

        window.setTimeout(() =>{
          let val = 3;
          var span = <HTMLSpanElement> div.querySelector(".amt-rating-elem[data-rating='"+ val +"']");
          span.click();


          //expect to not bet changed
          expect(subject.value).to.be.equal(1);

          input.removeAttribute("disabled");

           window.setTimeout(() =>{
            span.click();


            //expect to not bet changed
            expect(subject.value).to.be.equal(val - 1);

           },1500);

        }, 1500);
    });
  });

  describe("Private functions", () =>{

      it("test get according value for half steps", () => {
        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: true,
            step: 1
          };

          var amtTest = new TestPrivates(div,2,options);
          var val = amtTest.testGetValueAccordingToStep(1.4);

          expect(val).to.be.equals(1.5);
        });

         it("test get according value for decimal steps", () => {
        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: true,
            step: 2
          };

          var amtTest = new TestPrivates(div,2,options);
          var val = amtTest.testGetValueAccordingToStep(1.4);

          expect(val).to.be.equals(2);
        });

        it("test selected for an decimal value", () => {
          var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: true,
            step: 1
          };

          var amtTest = new TestPrivates(div,2,options);
          var val = amtTest.testSetorUnset(3.5);
          
          var span = <HTMLSpanElement> div.children[2];

          expect(span.classList.contains("amt-active")).to.be.true;
        });

        it("test input set to disabled", () => {
          var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: true,
            step: 1
          };

           var input = div.querySelector("input[type='hidden']");
           input.setAttribute("disabled", "disabled");

           var amtTest = new TestPrivates(div,2,options);
           var mutation : MutationRecord = {
               target: input,
               attributeName: "disabled",
               oldValue : "",
               addedNodes: undefined,
               attributeNamespace: undefined,
               nextSibling: undefined,
               previousSibling: undefined,
               removedNodes: undefined,
               type: undefined
           };
          
           amtTest.testMutationDisableEvent([mutation]);
           expect(amtTest.defaultOptions.readonly).to.be.true;

        });

        it("test input set to enable", () => {
          var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: true,
            step: 1
          };

           var input = div.querySelector("input[type='hidden']");

           var amtTest = new TestPrivates(div,2,options);
           var mutation : MutationRecord = {
               target: input,
               attributeName: "disabled",
               oldValue : "",
               addedNodes: undefined,
               attributeNamespace: undefined,
               nextSibling: undefined,
               previousSibling: undefined,
               removedNodes: undefined,
               type: undefined
           };
          
           amtTest.testMutationDisableEvent([mutation]);
           expect(amtTest.defaultOptions.readonly).to.be.false;

        });

  });

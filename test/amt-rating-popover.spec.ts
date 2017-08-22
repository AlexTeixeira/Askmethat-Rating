import { AskmethatRating, AskmethatRatingOptions } from '../src/ts/amt-rating';
import { expect } from 'chai';
import { AskmethatRatingPopoverDirection } from '../src/ts/amt-rating-popover';

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
       step: 2,
       popover: {
        color: "#e5e500",
        fontClass: "fa fa-star",
        direction: "top",
        values : [20,20,20,20,20]
      }   
     
     };
     subject = new AskmethatRating(div, 1, options);
});

describe('#configuration', () => {
    it('expecting div to have specific class', () => {
         expect(div.className.indexOf("amt-rating-container")).to.be.above(-1);
     });

    it('expecting div to set default direction', () => {
        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: false,
            step: 0,
            inputName: "AmtRating",
            popover: {
                color: "#e5e500",
                fontClass: "fa fa-star",
                values : [20,20,20,20,20]
              }  
          
          };
          var amt = new AskmethatRating(div, 1, options);
          expect(div.querySelector("ul").className.indexOf("bottom")).to.be.above(-1);
        });

     it('expecting div to have ul elements ', () => {
        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: false,
            step: 2,
            popover: {
             color: "#e5e500",
             fontClass: "fa fa-star",
             direction: "top",
             values : [20,20,20,20,20]
           }   
          
          };
        var amt = new AskmethatRating(div, 1, options);
        
        expect(div.querySelector("ul")).to.not.be.null;
    });
});

describe('#dom', () => {
    it('expecting to throw error if values are different than maxrating', () => {

        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: false,
            step: 0,
            inputName: "AmtRating",
            popover: {
                color: "#e5e500",
                fontClass: "fa fa-star",
                direction: "top",
                values : [20,20,20,20,20,20]
              }  
          
          };
          var amt = new AskmethatRating(div, 1, options);
          expect(div.className.indexOf("amt-rating-container")).to.be.least(0);
    });

    
    it('expecting div have ul with top', () => {
        var options = {
            backgroundColor : "#ccc",
            hoverColor: "#eee",
            fontClass: "fa fa-class",
            minRating: 1,
            maxRating: 5,
            readonly: false,
            step: 0,
            inputName: "AmtRating",
            popover: {
                color: "#e5e500",
                fontClass: "fa fa-star",
                values : [20,20,20,20,20],
                direction : AskmethatRatingPopoverDirection.top
            }  
          
          };

          var amt = new AskmethatRating(div, 1, options);
          
          expect(div.querySelector("ul").className.indexOf("top")).to.be.above(-1);
        });

        it('expecting div have ul with bottom', () => {
            var options = {
                backgroundColor : "#ccc",
                hoverColor: "#eee",
                fontClass: "fa fa-class",
                minRating: 1, 
                maxRating: 5,
                readonly: false,
                step: 0,
                inputName: "AmtRating",
                popover: {
                    color: "#e5e500",
                    fontClass: "fa fa-star",
                    values : [20,20,20,20,20],
                    direction : AskmethatRatingPopoverDirection.bottom
                  }               
              };
              var amt = new AskmethatRating(div, 1, options);

              expect(div.querySelector("ul").className.indexOf("bottom")).to.be.above(-1);
            });

});   
    
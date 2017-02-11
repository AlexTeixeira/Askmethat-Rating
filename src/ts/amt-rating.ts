//this is the available options for the plugin
export interface IAskmethatRatingOptions {
    hoverColor?: string,
    backgroundColor?: string,
    minRating?: number,
    maxRating?: number,
    fontClass: string,
    readonly: boolean,
    step: AskmethatRatingSteps
}

//This enum set the step for the rating
enum AskmethatRatingSteps{
    DecimalStep, //0.1 step
    HalfStep, //0.5 step
    OnePerOneStep //1 step
}

export class AskmethatRating {
    //this is the container to create the ratings element
    private _parentElement: HTMLDivElement;
    private _value : number;
    private _styleSheet : any;
    private _changeEvent: CustomEvent;

    get value():number {
        return this._value;
    }
    set value(_value:number) {
        if(_value < this._defaultOptions.minRating)
            throw Error("New value cannot be less than min rating value");
        this._value = _value;

        this.render(_value);
    }

    //default options
    private _defaultOptions: IAskmethatRatingOptions =
    {
        hoverColor: '#ffff66',
        backgroundColor: '#e5e500',
        minRating: 1,
        maxRating: 5,
        fontClass: "fa fa-star",
        readonly: false,
        step: AskmethatRatingSteps.DecimalStep
    };

    get defaultOptions():IAskmethatRatingOptions {
        return this._defaultOptions;
    }

    constructor(element: HTMLDivElement, defaultValue?: number, options?: IAskmethatRatingOptions) {
        this._parentElement = element;

        //override default options
        if(options)
            this._defaultOptions = options;

        if(this._defaultOptions.minRating > defaultValue){
            throw new Error("Default value should be higher than minRating options");
        }

         //if is not readonly, activate events
         if(!this._defaultOptions.readonly){
            //define events
            this._parentElement.addEventListener("mouseleave",(e) => this.onMouseLeave(e));
        }

        this.render(defaultValue);

        

    }

    /*
    * This will render the rating
    */
    public render(value: number = this._defaultOptions.minRating) {
        this._parentElement.innerHTML = '';
        for (let i = 1; i <= this._defaultOptions.maxRating; i++) {
            let spanUnder = document.createElement("span");
            let spanOuter = document.createElement("span");
            
            spanOuter.className = this._defaultOptions.fontClass;
            spanOuter.className += " amt-rating-elem amt-rating-under amt-rating";

            spanOuter.setAttribute("data-rating", i.toString());
            spanOuter.style.color = this._defaultOptions.backgroundColor;

            //configure outer
            spanUnder.className += this._defaultOptions.fontClass;
            spanUnder.className += " amt-rating-under am-rating";
            spanUnder.style.color = this._defaultOptions.hoverColor;
            spanUnder.style.width = "0%";

            //all span before minRating should be direclty active
             if (i <= value) {
                if(!spanOuter.classList.contains("amt-active")){
                    spanOuter.className += " amt-active";
                }

                spanUnder.style.width = "100%";    

                if(i === value)            
                    spanOuter.className += " amt-selected";      
             } else{
                
                if(Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0 ){
                    spanOuter.className += " amt-active amt-selected";
                    var m = Number((value % 1).toFixed(1));
                    spanUnder.style.width = (m * 100) + "%";

                } else{
                    spanOuter.style.color = this._defaultOptions.backgroundColor;
                    spanOuter.classList.remove("amt-active");
                    spanUnder.style.width = "0%";  
                }
            }
            

            //set default value
            this._value = value;

            //if is not readonly, activate events
            if(!this._defaultOptions.readonly){
                //define events
                spanOuter.addEventListener("click",(e) => this.onRatingClick(e));
                spanOuter.addEventListener("mousemove",(e) => this.onMouseMove(e));
            }
            
            spanOuter.appendChild(spanUnder);
            this._parentElement.appendChild(spanOuter);

        }

        
    }

    /**
    * @function when a rating is clicked
    * @param  {type} event : Event {event object}
    */
    private onRatingClick(event? : Event):void{
        
        var span = <HTMLSpanElement>event.srcElement;
        var underSpan = <HTMLSpanElement> span.querySelector(".amt-rating-under");

        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width,10) * 0.01).toFixed(1));

        if(value < this._defaultOptions.minRating){
            return;
        }

        //delete current selected
        if(this.value !== 0){
            this._parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
        }
      
        this._value = value;

        //set selected if is not 0
        if(this.value != 0)
            span.className += " amt-selected";       

        
        this._changeEvent = new CustomEvent("amt-change", { 'detail' : this.value})
        this._changeEvent.initEvent("amt-change", false, true);
        this._parentElement.dispatchEvent(this._changeEvent);
    }

    /**
    * @function Calculate the value according to the step provided in options
    * @param  {Number} value:number the current value
    * @return {Number} the new value according to step
    */
    protected getValueAccordingToStep(value:number): number{
        switch(this.defaultOptions.step){
            case AskmethatRatingSteps.HalfStep:
                return  Math.round(value * 2) / 2;
            case AskmethatRatingSteps.OnePerOneStep:
                return Math.ceil(value);
            default:
                return value;
        }
    }

    /**
    * @function mouse event enter in rating
    * @param  {type} event?: Event {event}
    */
    private onMouseMove(event?: MouseEvent) : void{
        var current = <HTMLSpanElement>event.srcElement;
        var data = Number(current.getAttribute("data-rating"));
        var mousePos =  Number(((event.offsetX /  event.srcElement.clientWidth )* 100).toFixed(0)); 
        var value = (data - 1) + Number((mousePos * 0.01).toFixed(1));
        value = this.getValueAccordingToStep(value);

        if(Number(value) && isFinite(value)){
            this.setOrUnsetActive(value);
        }
        else{
            if(value == 0){
                this.setOrUnsetActive(value);
                return;
            }
             
            this.setOrUnsetActive(data);
        }
    }


    /**
    * @function mouse out event in rating
    * @param  {type} event?: Event {event}
    */
    private onMouseLeave(event?: Event): void{
        this.setOrUnsetActive(this.value);
    }
    
    /**
    * @function set or unset the active class and color
    * @param  {HTMLSpanElement} current :  current span element
    * @param  {number} current :  value needed for the if
    */
    protected setOrUnsetActive(value: number){
        //delete hover color only if amt-selected is not present into the current span
        for(let i = 1; i <= this._defaultOptions.maxRating; i++){
            //keep min rating 
            if(i < this._defaultOptions.minRating){
                continue;
            }
            var span = <HTMLSpanElement> this._parentElement.querySelector(".amt-rating-elem[data-rating='"+i+"']");
            //all span before minRating should be direclty active
            var underSpan = <HTMLSpanElement> span.querySelector(".amt-rating-under");
            if (i <= value) {
                if(!span.classList.contains("amt-active")){
                    span.className += " amt-active";
                }

                var underSpan = <HTMLSpanElement> span.querySelector(".amt-rating-under");
                underSpan.style.width = "100%";                      
             } else{
                if(Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0 ){
                    underSpan.className += " amt-active";
                    var m = Number((value % 1).toFixed(1));
                    underSpan.style.width = (m * 100) + "%";

                } else{
                    span.style.color = this._defaultOptions.backgroundColor;
                    span.classList.remove("amt-active");
                    underSpan.style.width = "0%";  
                }
            }
        }
    }

    /**
    * @function static method to retrieve with identifier the value 
    * @param  {string} identifier: string container identifier
    * @return {number} current rating
    */
    public static value(identifier: string): number{
        var div = document.querySelector(identifier);
        if(div === undefined || div === null) 
            throw new Error("container do not exist");
        
        var span = <HTMLSpanElement>div.querySelector(".amt-selected");
        var underSpan = <HTMLSpanElement> span.querySelector(".amt-rating-under");

        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width,10) * 0.01).toFixed(1));

        return value;
    }
    
}

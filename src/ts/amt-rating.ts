//This enum set the step for the rating
export enum AskmethatRatingSteps{
    /**
     * Step 0.1 per 0.1
     */
    DecimalStep,
    /**
     * Step 0.5 per 0.5
     */
    HalfStep,
    /**
     * Step 1 per 1
     */
    OnePerOneStep 
}
//this is the available options for the plugin
export interface AskmethatRatingOptions {
    hoverColor?: string,
    /** 
     * Color when the rating is not hovered
     */
    backgroundColor?: string,
     /** 
     * Mininmum rating that the user can set
     */
    minRating?: number,
    /**
     * Maximum rating that the plugin display
     */
    maxRating?: number,
    /**
     * Class to display as rating (FontAwesome or Rating for exemple)
     */
    fontClass: string,
    /**
     * Set the rating to readonly
     */
    readonly: boolean,
    /** 
    * The stepping for the rating
    */
    step: AskmethatRatingSteps,
    /**
     * Input name (Default is AskmethatRating)
     */
    inputName: string

}
export class AskmethatRating {
    //this is the container to create the ratings element
    private parentElement: HTMLDivElement;
    private pValue : number;
    private styleSheet : any;
    private changeEvent: CustomEvent;
    private ratingClick : any;
    private mouseMove : any;


    /**
     * @function get the current value for the rating
     */
    get value():number {
        return this.pValue;
    }
    /**
     * @function set a new value for the rating
     * 
     * @param _value this is the new value you want to set to the rating
     * @returns the current number
     */

    set value(value:number) {
        if(value < this._defaultOptions.minRating)
            throw Error("New value cannot be less than min rating value");
        this.pValue = value;

        this.render(this.pValue);
    }

    /**
     * Default option base on @type IAskmethatRatingOptions
     */
    //default options
    private _defaultOptions: AskmethatRatingOptions =
    {
        hoverColor: '#ffff66',
        backgroundColor: '#e5e500',
        minRating: 1,
        maxRating: 5,
        fontClass: "fa fa-star",
        readonly: false,
        step: AskmethatRatingSteps.DecimalStep,
        inputName: "AskmethatRating"
    };

    /**
     * @function get the default option for the rating
     * 
     * @return  options based on @type AskmethatRatingOptions
     */
    get defaultOptions() : any {
        return this._defaultOptions;
    }

    /**
     * constructor with div element, default rating value & default options
     * 
     * @param element This is the html container for the rating elements
     * @param defaultValue Default value set when the plugin render the rating
     * @param options Default option base on AskmethatRatingOptions type
     */
    constructor(element: HTMLDivElement, defaultValue?: number, options?: any) {
        this.parentElement = element;

        //override default options
        if(options){
            this._defaultOptions.hoverColor = options.hoverColor != null ? options.hoverColor :  this._defaultOptions.hoverColor;
            this._defaultOptions.backgroundColor = options.backgroundColor != null ? options.backgroundColor :  this._defaultOptions.backgroundColor;
            this._defaultOptions.minRating = options.minRating != null ? options.minRating :  this._defaultOptions.minRating;
            this._defaultOptions.maxRating = options.maxRating != null ? options.maxRating :  this._defaultOptions.maxRating;
            this._defaultOptions.fontClass = options.fontClass != null ? options.fontClass :  this._defaultOptions.fontClass;
            this._defaultOptions.readonly = options.readonly != null ? options.readonly :  this._defaultOptions.readonly;
            this._defaultOptions.step = options.step != null ? options.step :  this._defaultOptions.step;
            this._defaultOptions.inputName=  options.inputName != null ? options.inputName :  this._defaultOptions.inputName;
             
        }

        if(this._defaultOptions.minRating > defaultValue){
            throw new Error("Default value should be higher than minRating options");
        }

         //if is not readonly, activate events
         if(!this._defaultOptions.readonly){
            //define events
            this.parentElement.addEventListener("mouseleave",(e) => this.onMouseLeave(e));
        }
        
        this.mouseMove = this.onMouseMove.bind(this);
        this.ratingClick = this.onRatingClick.bind(this);


        this.render(defaultValue);
        

    }

    /**
     * render a new rating, by default value is the minRating
     * 
     * @param value this is the default value set when the plugin is rendered, by default IAskmethatRatingOptions.minRating
     */
    public render(value: number = this._defaultOptions.minRating) {
        this.parentElement.innerHTML = '';
        for (let i = 1; i <= this._defaultOptions.maxRating; i++) {
            let spanOuter = document.createElement("span");
            let spanUnder = document.createElement("span");
            
            spanUnder.className = this._defaultOptions.fontClass;
            spanUnder.className += " amt-rating-elem amt-rating-under amt-rating";

            spanUnder.setAttribute("data-rating", i.toString());
            spanUnder.style.color = this._defaultOptions.backgroundColor;

            //configure outer
            spanOuter.className += this._defaultOptions.fontClass;
            spanOuter.className += " amt-rating-under am-rating";
            spanOuter.style.color = this._defaultOptions.hoverColor;
            spanOuter.style.width = "0%";

            //all span before minRating should be direclty active
             if (i <= value) {
                if(!spanUnder.classList.contains("amt-active")){
                    spanUnder.className += " amt-active";
                }

                spanOuter.style.width = "100%";    

                if(i === value)            
                    spanUnder.className += " amt-selected";      
             } else{
                
                if(Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0 ){
                    spanUnder.className += " amt-active amt-selected";
                    var m = Number((value % 1).toFixed(1));
                    spanOuter.style.width = (m * 100) + "%";

                } else{
                    spanUnder.style.color = this._defaultOptions.backgroundColor;
                    spanUnder.classList.remove("amt-active");
                    spanOuter.style.width = "0%";  
                }
            }
            

            //set default value
            this.pValue = value;

            //if is not readonly, activate events
            if(!this._defaultOptions.readonly){
                //define events
                spanUnder.addEventListener("click",this.ratingClick);
                spanUnder.addEventListener("mousemove",this.mouseMove);
            }
            
            spanUnder.appendChild(spanOuter);
            this.parentElement.appendChild(spanUnder);          
        }
        
        //create input type number
        var numberInput = <HTMLInputElement>document.createElement("input");
        numberInput.setAttribute("type", "hidden");
        numberInput.setAttribute("value",this.pValue.toString());
        numberInput.setAttribute("name", this._defaultOptions.inputName);
        this.parentElement.appendChild(numberInput);

        this.mutationEvent();
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
            this.parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
        }
      
        this.pValue = value;

        //set selected if is not 0
        if(this.value != 0)
            span.className += " amt-selected";       

        
        this.changeEvent = new CustomEvent("amt-change", { 'detail' : this.value})
        this.changeEvent.initEvent("amt-change", false, true);
        this.parentElement.dispatchEvent(this.changeEvent);

        //update input
        var input = <HTMLInputElement>this.parentElement.getElementsByTagName("input")[0];
        input.value = this.pValue.toString();
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
            var span = <HTMLSpanElement> this.parentElement.querySelector(".amt-rating-elem[data-rating='"+i+"']");
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
     * Check if disabled attribute is added or removed from the input
     * Update readonly status if needed for the rating
     */
    private mutationEvent(){
        let target : HTMLInputElement = <HTMLInputElement>this.parentElement.querySelector("input");

        // create an observer instance
       var observer = new MutationObserver((mutations : MutationRecord[]) => {
            mutations.forEach((mutation) => {
                if(mutation.attributeName === "disabled"){
                    var target : HTMLElement = <HTMLElement>mutation.target;
                    var hasDisabled = target.hasAttribute("disabled")
                    var spanOuters = this.parentElement.querySelectorAll(".amt-rating-elem");

                    if(hasDisabled){
                        for(var i=0;i < spanOuters.length; i++){
                            spanOuters[i].removeEventListener("click", this.ratingClick);
                            spanOuters[i].removeEventListener("mousemove", this.mouseMove);                    
                        }                     
                    } else {
                        for(var i=0;i < spanOuters.length; i++){
                            spanOuters[i].addEventListener("click", this.ratingClick);
                            spanOuters[i].addEventListener("mousemove", this.mouseMove);             
                        }
                    }

                } 
            });
        });

        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
        
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
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



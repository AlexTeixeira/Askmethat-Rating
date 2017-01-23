//this is the available options for the plugin
export interface IAskmethatRatingOptions {
    hoverColor?: string,
    backgroundColor?: string,
    minRating?: number,
    maxRating?: number,
    fontClass: string,
    half?: boolean
}

export class AskmethatRating {
    //this is the container to create the ratings element
    private _parentElement: HTMLDivElement;
    private _value : number;


    get value():number {
        return this._value;
    }
    set value(_value:number) {
        if(_value < this._defaultOptions.minRating)
            throw Error("New value cannot be less than min rating value");
        this._value = _value;
    }

    //default options
    private _defaultOptions: IAskmethatRatingOptions =
    {
        hoverColor: '#ffff66',
        backgroundColor: '#e5e500',
        minRating: 1,
        maxRating: 5,
        fontClass: "fa fa-star",
        half: false
    };

    get defaultOptions():IAskmethatRatingOptions {
        return this._defaultOptions;
    }

    constructor(element: HTMLDivElement, options?: IAskmethatRatingOptions) {
        this._parentElement = element;

        //override default options
        if(options)
            this._defaultOptions = options;

        this.render();

    }

    /*
    * This will render the rating
    */
    public render() {
        for (let i = 1; i <= this._defaultOptions.maxRating; i++) {
            let span = document.createElement("span");

            span.className = this._defaultOptions.fontClass;
            span.className += " amt-rating-elem";

            span.setAttribute("data-rating", i.toString());
            span.style.color = this._defaultOptions.backgroundColor;

            //all span before minRating should be direclty active
            if (i <= this._defaultOptions.minRating) {
                span.className += " amt-active";
                span.style.color = this._defaultOptions.hoverColor;

                if(i === this._defaultOptions.minRating)
                    span.className += " amt-selected";
            }

            this._parentElement.appendChild(span);

            //set default value
            this.value = this._defaultOptions.minRating;

            //define events
            span.addEventListener("click",(e) => this.onRatingClick(e));
            span.addEventListener("mouseenter",(e) => this.onMouseEnter(e));
            span.addEventListener("mouseout",(e) => this.onMouseOut(e));


        }
    }

    /**
    * @function when a rating is clicked
    * @param  {type} event : Event {event object}
    */
    private onRatingClick(event? : Event):void{
        var span = <HTMLSpanElement>event.srcElement;

        this.value = parseInt(span.getAttribute("data-rating"),10);
        
        //delete current selected
        this._parentElement.querySelector(".amt-selected").classList.remove("amt-selected");

        if(span.classList.contains("amt-selected")){
            span.style.color = this._defaultOptions.backgroundColor;
            span.classList.remove("amt-selected");

        } else{        
            span.style.color = this._defaultOptions.hoverColor;
            span.className += " amt-selected";
        }

    }

    /**
    * @function mouse event enter in rating
    * @param  {type} event?: Event {event}
    */
    private onMouseEnter(event?: Event) : void{
        var current = <HTMLSpanElement>event.srcElement;
        var value = parseInt(current.getAttribute("data-rating"),10);
        this.setOrUnsetActive(current, value);
    }


    /**
    * @function mouse out event in rating
    * @param  {type} event?: Event {event}
    */
    private onMouseOut(event?: Event): void{
        var current = <HTMLElement>event.srcElement;
        this.setOrUnsetActive(current, this.value);
    }
    
    /**
    * @function set or unset the active class and color
    * @param  {HTMLSpanElement} current :  current span element
    * @param  {number} current :  value needed for the if
    */
    private setOrUnsetActive(current : HTMLSpanElement, value: number){
        //delete hover color only if amt-selected is not present into the current span
        if(!current.classList.contains("amt-selected") ){
            for(let i = this._defaultOptions.minRating; i <= this._defaultOptions.maxRating; i++){
                var span = <HTMLSpanElement> this._parentElement.querySelector(".amt-rating-elem[data-rating='"+i+"']");
                //all span before minRating should be direclty active
                if (i > value) {
                    span.style.color = this._defaultOptions.backgroundColor;
                    span.classList.remove("amt-active");
                } else{
                    span.className += " amt-active";
                    span.style.color = this._defaultOptions.hoverColor;
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
        
        return parseInt(div.querySelector(".amt-selected").getAttribute("data-rating"),10)
    }
    
}

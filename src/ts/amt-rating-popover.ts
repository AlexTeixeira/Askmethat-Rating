
    export enum AskmethatRatingPopoverDirection{
        top,
        bottom
    }
    
    export interface AskmethatRatingPopoverOptions{
        /**
         * Color used by the font & progress bar inside popover
         */
        color : string,
        /**
         * fontClass used by the rating element inside popover
         */
        fontClass: string,
        /**
         * Display popover at bottom or top
         */
        direction?: AskmethatRatingPopoverDirection,
        /**
         * Array of percentage to display
         */
        values: number[]
    }


const liElementStr = function (progressValue, color, font): string {
    // <i style="width:${progressValue}%;color:${color};" class="${font} fa-under"></i>
    return `<li> 
<i style="color:${color};" class="${font} fa-inner"></i>
<div class="progress" data-label="${progressValue}%">
  <span style="background-color:${color};width:${progressValue}%;" class="value" style="width:${progressValue}%;"></span>
</div>            
</li>`
}

export class AskmethatRatingPopover{

    private _options: AskmethatRatingPopoverOptions;
    /**
     * @function get the default option for the rating
     * 
     * @return  options based on @type AskmethatRatingOptions
     */
    get options() : AskmethatRatingPopoverOptions {
        return this._options;
    }

    /**
     * @function set the default option for the rating
     * 
     * @return  options based on @type AskmethatRatingOptions
     */
    set options(value: AskmethatRatingPopoverOptions) {
        this._options = (<any>Object).assign({}, value);

       if(this.options.direction == undefined){
          this.options.direction = AskmethatRatingPopoverDirection.bottom;         
       }
    }

    /**
     *
     */
    constructor(options: AskmethatRatingPopoverOptions) { 
        this.options = options;
    }

    /**
     * Return a list of elements
     */
    public render() : HTMLUListElement{
        let list = document.createElement("ul");
        var items = "";
        list.classList.add(AskmethatRatingPopoverDirection[this.options.direction]);

        for(var value of this.options.values){
            items += liElementStr(value, this.options.color, this.options.fontClass);
        }

        list.innerHTML = items;

        return list;
    }

}


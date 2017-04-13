"use strict";
//This enum set the step for the rating
var AskmethatRatingSteps;
(function (AskmethatRatingSteps) {
    /**
     * Step 0.1 per 0.1
     */
    AskmethatRatingSteps[AskmethatRatingSteps["DecimalStep"] = 0] = "DecimalStep";
    /**
     * Step 0.5 per 0.5
     */
    AskmethatRatingSteps[AskmethatRatingSteps["HalfStep"] = 1] = "HalfStep";
    /**
     * Step 1 per 1
     */
    AskmethatRatingSteps[AskmethatRatingSteps["OnePerOneStep"] = 2] = "OnePerOneStep";
})(AskmethatRatingSteps = AskmethatRatingSteps || (AskmethatRatingSteps = {}));
var AskmethatRating = (function () {
    /**
     * constructor with div element, default rating value & default options
     *
     * @param element This is the html container for the rating elements
     * @param defaultValue Default value set when the plugin render the rating
     * @param options Default option base on AskmethatRatingOptions type
     */
    function AskmethatRating(element, defaultValue, options) {
        var _this = this;
        /**
         * Default option base on @type IAskmethatRatingOptions
         */
        //default options
        this._defaultOptions = {
            hoverColor: '#ffff66',
            backgroundColor: '#e5e500',
            minRating: 1,
            maxRating: 5,
            fontClass: "fa fa-star",
            readonly: false,
            step: AskmethatRatingSteps.DecimalStep,
            inputName: "AskmethatRating"
        };
        this.parentElement = element;
        //override default options
        if (options) {
            this._defaultOptions.hoverColor = options.hoverColor != null ? options.hoverColor : this._defaultOptions.hoverColor;
            this._defaultOptions.backgroundColor = options.backgroundColor != null ? options.backgroundColor : this._defaultOptions.backgroundColor;
            this._defaultOptions.minRating = options.minRating != null ? options.minRating : this._defaultOptions.minRating;
            this._defaultOptions.maxRating = options.maxRating != null ? options.maxRating : this._defaultOptions.maxRating;
            this._defaultOptions.fontClass = options.fontClass != null ? options.fontClass : this._defaultOptions.fontClass;
            this._defaultOptions.readonly = options.readonly != null ? options.readonly : this._defaultOptions.readonly;
            this._defaultOptions.step = options.step != null ? options.step : this._defaultOptions.step;
            this._defaultOptions.inputName = options.inputName != null ? options.inputName : this._defaultOptions.inputName;
        }
        if (this._defaultOptions.minRating > defaultValue) {
            throw new Error("Default value should be higher than minRating options");
        }
        //if is not readonly, activate events
        if (!this._defaultOptions.readonly) {
            //define events
            this.parentElement.addEventListener("mouseleave", function (e) { return _this.onMouseLeave(e); });
        }
        this.mouseMove = this.onMouseMove.bind(this);
        this.ratingClick = this.onRatingClick.bind(this);
        this.render(defaultValue);
    }
    Object.defineProperty(AskmethatRating.prototype, "value", {
        /**
         * @function get the current value for the rating
         */
        get: function () {
            return this.pValue;
        },
        /**
         * @function set a new value for the rating
         *
         * @param _value this is the new value you want to set to the rating
         * @returns the current number
         */
        set: function (value) {
            if (value < this._defaultOptions.minRating)
                throw Error("New value cannot be less than min rating value");
            this.pValue = value;
            this.render(this.pValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AskmethatRating.prototype, "defaultOptions", {
        /**
         * @function get the default option for the rating
         *
         * @return  options based on @type AskmethatRatingOptions
         */
        get: function () {
            return this._defaultOptions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * render a new rating, by default value is the minRating
     *
     * @param value this is the default value set when the plugin is rendered, by default IAskmethatRatingOptions.minRating
     */
    AskmethatRating.prototype.render = function (value) {
        if (value === void 0) { value = this._defaultOptions.minRating; }
        this.parentElement.innerHTML = '';
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            var spanUnder = document.createElement("span");
            var spanOuter = document.createElement("span");
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
                if (!spanOuter.classList.contains("amt-active")) {
                    spanOuter.className += " amt-active";
                }
                spanUnder.style.width = "100%";
                if (i === value)
                    spanOuter.className += " amt-selected";
            }
            else {
                if (Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0) {
                    spanOuter.className += " amt-active amt-selected";
                    var m = Number((value % 1).toFixed(1));
                    spanUnder.style.width = (m * 100) + "%";
                }
                else {
                    spanOuter.style.color = this._defaultOptions.backgroundColor;
                    spanOuter.classList.remove("amt-active");
                    spanUnder.style.width = "0%";
                }
            }
            //set default value
            this.pValue = value;
            //if is not readonly, activate events
            if (!this._defaultOptions.readonly) {
                //define events
                spanOuter.addEventListener("click", this.ratingClick);
                spanOuter.addEventListener("mousemove", this.mouseMove);
            }
            spanOuter.appendChild(spanUnder);
            this.parentElement.appendChild(spanOuter);
        }
        //create input type number
        var numberInput = document.createElement("input");
        numberInput.setAttribute("type", "hidden");
        numberInput.setAttribute("value", this.pValue.toString());
        numberInput.setAttribute("name", this._defaultOptions.inputName);
        this.parentElement.appendChild(numberInput);
        this.mutationEvent();
    };
    /**
    * @function when a rating is clicked
    * @param  {type} event : Event {event object}
    */
    AskmethatRating.prototype.onRatingClick = function (event) {
        var span = event.srcElement;
        var underSpan = span.querySelector(".amt-rating-under");
        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width, 10) * 0.01).toFixed(1));
        if (value < this._defaultOptions.minRating) {
            return;
        }
        //delete current selected
        if (this.value !== 0) {
            this.parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
        }
        this.pValue = value;
        //set selected if is not 0
        if (this.value != 0)
            span.className += " amt-selected";
        this.changeEvent = new CustomEvent("amt-change", { 'detail': this.value });
        this.changeEvent.initEvent("amt-change", false, true);
        this.parentElement.dispatchEvent(this.changeEvent);
        //update input
        var input = this.parentElement.getElementsByTagName("input")[0];
        input.value = this.pValue.toString();
    };
    /**
    * @function Calculate the value according to the step provided in options
    * @param  {Number} value:number the current value
    * @return {Number} the new value according to step
    */
    AskmethatRating.prototype.getValueAccordingToStep = function (value) {
        switch (this.defaultOptions.step) {
            case AskmethatRatingSteps.HalfStep:
                return Math.round(value * 2) / 2;
            case AskmethatRatingSteps.OnePerOneStep:
                return Math.ceil(value);
            default:
                return value;
        }
    };
    /**
    * @function mouse event enter in rating
    * @param  {type} event?: Event {event}
    */
    AskmethatRating.prototype.onMouseMove = function (event) {
        var current = event.srcElement;
        var data = Number(current.getAttribute("data-rating"));
        var mousePos = Number(((event.offsetX / event.srcElement.clientWidth) * 100).toFixed(0));
        var value = (data - 1) + Number((mousePos * 0.01).toFixed(1));
        value = this.getValueAccordingToStep(value);
        if (Number(value) && isFinite(value)) {
            this.setOrUnsetActive(value);
        }
        else {
            if (value == 0) {
                this.setOrUnsetActive(value);
                return;
            }
            this.setOrUnsetActive(data);
        }
    };
    /**
    * @function mouse out event in rating
    * @param  {type} event?: Event {event}
    */
    AskmethatRating.prototype.onMouseLeave = function (event) {
        this.setOrUnsetActive(this.value);
    };
    /**
    * @function set or unset the active class and color
    * @param  {HTMLSpanElement} current :  current span element
    * @param  {number} current :  value needed for the if
    */
    AskmethatRating.prototype.setOrUnsetActive = function (value) {
        //delete hover color only if amt-selected is not present into the current span
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            //keep min rating 
            if (i < this._defaultOptions.minRating) {
                continue;
            }
            var span = this.parentElement.querySelector(".amt-rating-elem[data-rating='" + i + "']");
            //all span before minRating should be direclty active
            var underSpan = span.querySelector(".amt-rating-under");
            if (i <= value) {
                if (!span.classList.contains("amt-active")) {
                    span.className += " amt-active";
                }
                var underSpan = span.querySelector(".amt-rating-under");
                underSpan.style.width = "100%";
            }
            else {
                if (Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0) {
                    underSpan.className += " amt-active";
                    var m = Number((value % 1).toFixed(1));
                    underSpan.style.width = (m * 100) + "%";
                }
                else {
                    span.style.color = this._defaultOptions.backgroundColor;
                    span.classList.remove("amt-active");
                    underSpan.style.width = "0%";
                }
            }
        }
    };
    /**
     * Check if disabled attribute is added or removed from the input
     * Update readonly status if needed for the rating
     */
    AskmethatRating.prototype.mutationEvent = function () {
        var _this = this;
        var target = this.parentElement.querySelector("input");
        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "disabled") {
                    var target = mutation.target;
                    var hasDisabled = target.hasAttribute("disabled");
                    var spanOuters = _this.parentElement.querySelectorAll(".amt-rating-elem");
                    if (hasDisabled) {
                        for (var i = 0; i < spanOuters.length; i++) {
                            spanOuters[i].removeEventListener("click", _this.ratingClick);
                            spanOuters[i].removeEventListener("mousemove", _this.mouseMove);
                        }
                    }
                    else {
                        for (var i = 0; i < spanOuters.length; i++) {
                            spanOuters[i].addEventListener("click", _this.ratingClick);
                            spanOuters[i].addEventListener("mousemove", _this.mouseMove);
                        }
                    }
                }
            });
        });
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
    };
    /**
    * @function static method to retrieve with identifier the value
    * @param  {string} identifier: string container identifier
    * @return {number} current rating
    */
    AskmethatRating.value = function (identifier) {
        var div = document.querySelector(identifier);
        if (div === undefined || div === null)
            throw new Error("container do not exist");
        var span = div.querySelector(".amt-selected");
        var underSpan = span.querySelector(".amt-rating-under");
        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width, 10) * 0.01).toFixed(1));
        return value;
    };
    return AskmethatRating;
}());

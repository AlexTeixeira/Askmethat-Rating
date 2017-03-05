"use strict";
<<<<<<< HEAD
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
})(AskmethatRatingSteps = exports.AskmethatRatingSteps || (exports.AskmethatRatingSteps = {}));
var AskmethatRating = (function () {
    /**
     * constructor with div element, default rating value & default options
     *
     * @param element This is the html container for the rating elements
     * @param defaultValue Default value set when the plugin render the rating
     * @param options Default option base on IAskmethatRatingOptions type
     */
    function AskmethatRating(element, defaultValue, options) {
        var _this = this;
        /**
         * Default option base on @type IAskmethatRatingOptions
         */
=======
var AskmethatRatingSteps;
(function (AskmethatRatingSteps) {
    AskmethatRatingSteps[AskmethatRatingSteps["DecimalStep"] = 0] = "DecimalStep";
    AskmethatRatingSteps[AskmethatRatingSteps["HalfStep"] = 1] = "HalfStep";
    AskmethatRatingSteps[AskmethatRatingSteps["OnePerOneStep"] = 2] = "OnePerOneStep";
})(AskmethatRatingSteps || (AskmethatRatingSteps = {}));
var AskmethatRating = (function () {
    function AskmethatRating(element, defaultValue, options) {
        var _this = this;
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        this._defaultOptions = {
            hoverColor: '#ffff66',
            backgroundColor: '#e5e500',
            minRating: 1,
            maxRating: 5,
            fontClass: "fa fa-star",
            readonly: false,
            step: AskmethatRatingSteps.DecimalStep
        };
<<<<<<< HEAD
        this._parentElement = element;
        //override default options
=======
        this.parentElement = element;
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        if (options)
            this._defaultOptions = options;
        if (this._defaultOptions.minRating > defaultValue) {
            throw new Error("Default value should be higher than minRating options");
        }
<<<<<<< HEAD
        //if is not readonly, activate events
        if (!this._defaultOptions.readonly) {
            //define events
            this._parentElement.addEventListener("mouseleave", function (e) { return _this.onMouseLeave(e); });
=======
        if (!this._defaultOptions.readonly) {
            this.parentElement.addEventListener("mouseleave", function (e) { return _this.onMouseLeave(e); });
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        }
        this.render(defaultValue);
    }
    Object.defineProperty(AskmethatRating.prototype, "value", {
<<<<<<< HEAD
        /**
         * @function get the current value for the rating
         */
        get: function () {
            return this._value;
        },
        /**
         * @function set a new value for the rating
         *
         * @param _value this is the new value you want to set to the rating
         * @returns the current number
         */
        set: function (_value) {
            if (_value < this._defaultOptions.minRating)
                throw Error("New value cannot be less than min rating value");
            this._value = _value;
            this.render(_value);
=======
        get: function () {
            return this.pValue;
        },
        set: function (value) {
            if (value < this._defaultOptions.minRating)
                throw Error("New value cannot be less than min rating value");
            this.pValue = value;
            this.render(this.pValue);
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AskmethatRating.prototype, "defaultOptions", {
<<<<<<< HEAD
        /**
         * @function get the default option for the rating
         *
         * @return  options based on @type IAskmethatRatingOptions
         */
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        get: function () {
            return this._defaultOptions;
        },
        enumerable: true,
        configurable: true
    });
<<<<<<< HEAD
    /**
     * render a new rating, by default value is the minRating
     *
     * @param value this is the default value set when the plugin is rendered, by default IAskmethatRatingOptions.minRating
     */
    AskmethatRating.prototype.render = function (value) {
        var _this = this;
        if (value === void 0) { value = this._defaultOptions.minRating; }
        this._parentElement.innerHTML = '';
=======
    AskmethatRating.prototype.render = function (value) {
        var _this = this;
        if (value === void 0) { value = this._defaultOptions.minRating; }
        this.parentElement.innerHTML = '';
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            var spanUnder = document.createElement("span");
            var spanOuter = document.createElement("span");
            spanOuter.className = this._defaultOptions.fontClass;
            spanOuter.className += " amt-rating-elem amt-rating-under amt-rating";
            spanOuter.setAttribute("data-rating", i.toString());
            spanOuter.style.color = this._defaultOptions.backgroundColor;
<<<<<<< HEAD
            //configure outer
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
            spanUnder.className += this._defaultOptions.fontClass;
            spanUnder.className += " amt-rating-under am-rating";
            spanUnder.style.color = this._defaultOptions.hoverColor;
            spanUnder.style.width = "0%";
<<<<<<< HEAD
            //all span before minRating should be direclty active
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
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
<<<<<<< HEAD
            //set default value
            this._value = value;
            //if is not readonly, activate events
            if (!this._defaultOptions.readonly) {
                //define events
=======
            this.pValue = value;
            if (!this._defaultOptions.readonly) {
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
                spanOuter.addEventListener("click", function (e) { return _this.onRatingClick(e); });
                spanOuter.addEventListener("mousemove", function (e) { return _this.onMouseMove(e); });
            }
            spanOuter.appendChild(spanUnder);
<<<<<<< HEAD
            this._parentElement.appendChild(spanOuter);
        }
    };
    /**
    * @function when a rating is clicked
    * @param  {type} event : Event {event object}
    */
=======
            this.parentElement.appendChild(spanOuter);
        }
    };
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
    AskmethatRating.prototype.onRatingClick = function (event) {
        var span = event.srcElement;
        var underSpan = span.querySelector(".amt-rating-under");
        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width, 10) * 0.01).toFixed(1));
        if (value < this._defaultOptions.minRating) {
            return;
        }
<<<<<<< HEAD
        //delete current selected
        if (this.value !== 0) {
            this._parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
        }
        this._value = value;
        //set selected if is not 0
        if (this.value != 0)
            span.className += " amt-selected";
        this._changeEvent = new CustomEvent("amt-change", { 'detail': this.value });
        this._changeEvent.initEvent("amt-change", false, true);
        this._parentElement.dispatchEvent(this._changeEvent);
    };
    /**
    * @function Calculate the value according to the step provided in options
    * @param  {Number} value:number the current value
    * @return {Number} the new value according to step
    */
=======
        if (this.value !== 0) {
            this.parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
        }
        this.pValue = value;
        if (this.value != 0)
            span.className += " amt-selected";
        this.changeEvent = new CustomEvent("amt-change", { 'detail': this.value });
        this.changeEvent.initEvent("amt-change", false, true);
        this.parentElement.dispatchEvent(this.changeEvent);
    };
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
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
<<<<<<< HEAD
    /**
    * @function mouse event enter in rating
    * @param  {type} event?: Event {event}
    */
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
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
<<<<<<< HEAD
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
            var span = this._parentElement.querySelector(".amt-rating-elem[data-rating='" + i + "']");
            //all span before minRating should be direclty active
=======
    AskmethatRating.prototype.onMouseLeave = function (event) {
        this.setOrUnsetActive(this.value);
    };
    AskmethatRating.prototype.setOrUnsetActive = function (value) {
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            if (i < this._defaultOptions.minRating) {
                continue;
            }
            var span = this.parentElement.querySelector(".amt-rating-elem[data-rating='" + i + "']");
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
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
<<<<<<< HEAD
    /**
    * @function static method to retrieve with identifier the value
    * @param  {string} identifier: string container identifier
    * @return {number} current rating
    */
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b
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
<<<<<<< HEAD
exports.AskmethatRating = AskmethatRating;
=======
>>>>>>> 41600ba86b0e64fb3b3d87115cbf59ad09d7e18b

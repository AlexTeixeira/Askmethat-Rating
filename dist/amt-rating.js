(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Askmethat", [], factory);
	else if(typeof exports === 'object')
		exports["Askmethat"] = factory();
	else
		root["Askmethat"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                var spanOuter = document.createElement("span");
                var spanUnder = document.createElement("span");
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
                    if (!spanUnder.classList.contains("amt-active")) {
                        spanUnder.className += " amt-active";
                    }
                    spanOuter.style.width = "100%";
                    if (i === value)
                        spanUnder.className += " amt-selected";
                }
                else {
                    if (Number(value.toFixed(1)) >= (i - 1) && Number(value.toFixed(1)) < i && (value % 1) !== 0) {
                        spanUnder.className += " amt-active amt-selected";
                        var m = Number((value % 1).toFixed(1));
                        spanOuter.style.width = (m * 100) + "%";
                    }
                    else {
                        spanUnder.style.color = this._defaultOptions.backgroundColor;
                        spanUnder.classList.remove("amt-active");
                        spanOuter.style.width = "0%";
                    }
                }
                //set default value
                this.pValue = value;
                //if is not readonly, activate events
                if (!this._defaultOptions.readonly) {
                    //define events
                    spanUnder.addEventListener("click", this.ratingClick);
                    spanUnder.addEventListener("mousemove", this.mouseMove);
                }
                spanUnder.appendChild(spanOuter);
                this.parentElement.appendChild(spanUnder);
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
    exports.AskmethatRating = AskmethatRating;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW10LXJhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy90cy9hbXQtcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLHVDQUF1QztJQUN2QyxJQUFZLG9CQWFYO0lBYkQsV0FBWSxvQkFBb0I7UUFDNUI7O1dBRUc7UUFDSCw2RUFBVyxDQUFBO1FBQ1g7O1dBRUc7UUFDSCx1RUFBUSxDQUFBO1FBQ1I7O1dBRUc7UUFDSCxpRkFBYSxDQUFBO0lBQ2pCLENBQUMsRUFiVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQWEvQjtJQWtDRDtRQXdESTs7Ozs7O1dBTUc7UUFDSCx5QkFBWSxPQUF1QixFQUFFLFlBQXFCLEVBQUUsT0FBYTtZQUF6RSxpQkFpQ0M7WUFqRUQ7O2VBRUc7WUFDSCxpQkFBaUI7WUFDVCxvQkFBZSxHQUN2QjtnQkFDSSxVQUFVLEVBQUUsU0FBUztnQkFDckIsZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixJQUFJLEVBQUUsb0JBQW9CLENBQUMsV0FBVztnQkFDdEMsU0FBUyxFQUFFLGlCQUFpQjthQUMvQixDQUFDO1lBbUJFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1lBRTdCLDBCQUEwQjtZQUMxQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO2dCQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JILElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7Z0JBQ3pJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pILElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pILElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pILElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQzdHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQzdGLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFFckgsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFBLENBQUM7Z0JBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUM3RSxDQUFDO1lBRUEscUNBQXFDO1lBQ3JDLEVBQUUsQ0FBQSxDQUFD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

/***/ })
/******/ ]);
});
//# sourceMappingURL=amt-rating.js.map
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
                this.defaultOptions = options;
            }
            if (this.defaultOptions.minRating > defaultValue) {
                throw new Error("Default value should be higher than minRating options");
            }
            //if is not readonly, activate events
            if (!this.defaultOptions.readonly) {
                //define events
                this.parentElement.addEventListener("mouseleave", function (e) { return _this.onMouseLeave(e); });
            }
            this.mouseMove = this.onMouseMove.bind(this);
            this.ratingClick = this.onRatingClick.bind(this);
            this.pValue = this.defaultOptions.minRating;
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
            /**
             * @function set the default option for the rating
             *
             * @return  options based on @type AskmethatRatingOptions
             */
            set: function (value) {
                Object.assign(this._defaultOptions, value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW10LXJhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy90cy9hbXQtcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLHVDQUF1QztJQUN2QyxJQUFZLG9CQWFYO0lBYkQsV0FBWSxvQkFBb0I7UUFDNUI7O1dBRUc7UUFDSCw2RUFBVyxDQUFBO1FBQ1g7O1dBRUc7UUFDSCx1RUFBUSxDQUFBO1FBQ1I7O1dBRUc7UUFDSCxpRkFBYSxDQUFBO0lBQ2pCLENBQUMsRUFiVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQWEvQjtJQWtDRDtRQWlFSTs7Ozs7O1dBTUc7UUFDSCx5QkFBWSxPQUF1QixFQUFFLFlBQXFCLEVBQUUsT0FBYTtZQUF6RSxpQkEwQkM7WUFuRUQ7O2VBRUc7WUFDSCxpQkFBaUI7WUFDVCxvQkFBZSxHQUN2QjtnQkFDSSxVQUFVLEVBQUUsU0FBUztnQkFDckIsZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixJQUFJLEVBQUUsb0JBQW9CLENBQUMsV0FBVztnQkFDdEMsU0FBUyxFQUFFLGlCQUFpQjthQUMvQixDQUFDO1lBNEJFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1lBRTdCLDBCQUEwQjtZQUMxQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO2dCQUNSLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQSxDQUFDO2dCQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFDN0UsQ0FBQztZQUVBLHFDQUFxQztZQUNyQyxFQUFFLENBQUEsQ0FB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

/***/ })
/******/ ]);
});
//# sourceMappingURL=amt-rating.js.map
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
            this.value = defaultValue;
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
                if (value < this.defaultOptions.minRating)
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
            if (value === void 0) { value = this.defaultOptions.minRating; }
            this.parentElement.innerHTML = '';
            for (var i = 1; i <= this.defaultOptions.maxRating; i++) {
                var spanOuter = document.createElement("span");
                var spanUnder = document.createElement("span");
                spanUnder.className = this.defaultOptions.fontClass;
                spanUnder.className += " amt-rating-elem amt-rating-under amt-rating";
                spanUnder.setAttribute("data-rating", i.toString());
                spanUnder.style.color = this.defaultOptions.backgroundColor;
                //configure outer
                spanOuter.className += this.defaultOptions.fontClass;
                spanOuter.className += " amt-rating-under am-rating";
                spanOuter.style.color = this.defaultOptions.hoverColor;
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
                        spanUnder.style.color = this.defaultOptions.backgroundColor;
                        spanUnder.classList.remove("amt-active");
                        spanOuter.style.width = "0%";
                    }
                }
                //set default value
                this.pValue = value;
                //if is not readonly, activate events
                if (!this.defaultOptions.readonly) {
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
            numberInput.setAttribute("value", this.value.toString());
            numberInput.setAttribute("name", this.defaultOptions.inputName);
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
            if (value < this.defaultOptions.minRating) {
                return;
            }
            //delete current selected
            if (this.value !== 0) {
                this.parentElement.querySelector(".amt-selected").classList.remove("amt-selected");
            }
            this.value = value;
            //set selected if is not 0
            if (this.value != 0)
                span.className += " amt-selected";
            this.changeEvent = new CustomEvent("amt-change", { 'detail': this.value });
            this.changeEvent.initEvent("amt-change", false, true);
            this.parentElement.dispatchEvent(this.changeEvent);
            //update input
            var input = this.parentElement.getElementsByTagName("input")[0];
            input.value = this.value.toString();
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
            for (var i = 1; i <= this.defaultOptions.maxRating; i++) {
                //keep min rating 
                if (i < this.defaultOptions.minRating) {
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
                        span.style.color = this.defaultOptions.backgroundColor;
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
            var observer = new MutationObserver(function (mutations) { _this.mutationDisableEvent(mutations); });
            // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true };
            // pass in the target node, as well as the observer options
            observer.observe(target, config);
        };
        /**
         * This is fired by mutation observer when an attribute changed in the hidden input
         * Is protected to have some unit tests
         *
         * @param mutations list of mutations record
         */
        AskmethatRating.prototype.mutationDisableEvent = function (mutations) {
            var _this = this;
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "disabled") {
                    var target = mutation.target;
                    var hasDisabled = target.hasAttribute("disabled");
                    var spanOuters = _this.parentElement.querySelectorAll(".amt-rating-elem");
                    if (hasDisabled) {
                        for (var i = 0; i < spanOuters.length; i++) {
                            spanOuters[i].removeEventListener("click", _this.ratingClick);
                            spanOuters[i].removeEventListener("mousemove", _this.mouseMove);
                            _this.defaultOptions.readonly = true;
                        }
                    }
                    else {
                        for (var i = 0; i < spanOuters.length; i++) {
                            spanOuters[i].addEventListener("click", _this.ratingClick);
                            spanOuters[i].addEventListener("mousemove", _this.mouseMove);
                            _this.defaultOptions.readonly = false;
                        }
                    }
                }
            });
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
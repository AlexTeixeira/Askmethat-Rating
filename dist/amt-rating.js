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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, amt_rating_popover_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
         * Init popover if needed
         */
        AskmethatRating.prototype.initPopover = function () {
            if (this.defaultOptions.popover != undefined) {
                if (this.defaultOptions.popover.values.length != this.defaultOptions.maxRating)
                    throw ("Popover values do not mitmach with max number of rating elements");
                this.defaultOptions.readonly = true;
                var popover = new amt_rating_popover_1.AskmethatRatingPopover(this.defaultOptions.popover);
                this.parentElement.classList.add("amt-rating-container");
                this.parentElement.appendChild(popover.render());
            }
        };
        /**
         * render a new rating, by default value is the minRating
         *
         * @param value this is the default value set when the plugin is rendered, by default IAskmethatRatingOptions.minRating
         */
        AskmethatRating.prototype.render = function (value) {
            if (value === void 0) { value = this.defaultOptions.minRating; }
            this.parentElement.innerHTML = '';
            try {
                this.initPopover();
            }
            catch (e) {
                console.error(e);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW10LXJhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy90cy9hbXQtcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBLElBQVksb0JBYVg7SUFiRCxXQUFZLG9CQUFvQjtRQUM1Qjs7V0FFRztRQUNILDZFQUFXLENBQUE7UUFDWDs7V0FFRztRQUNILHVFQUFRLENBQUE7UUFDUjs7V0FFRztRQUNILGlGQUFhLENBQUE7SUFDakIsQ0FBQyxFQWJXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBYS9CO0lBc0NEO1FBaUVJOzs7Ozs7V0FNRztRQUNILHlCQUFZLE9BQXVCLEVBQUUsWUFBcUIsRUFBRSxPQUFhO1lBQXpFLGlCQXdCQztZQWpFRDs7ZUFFRztZQUNILGlCQUFpQjtZQUNULG9CQUFlLEdBQ3ZCO2dCQUNJLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixlQUFlLEVBQUUsU0FBUztnQkFDMUIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxXQUFXO2dCQUN0QyxTQUFTLEVBQUUsaUJBQWlCO2FBQy9CLENBQUM7WUE0QkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFFN0IsMEJBQTBCO1lBQzFCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7WUFDbEMsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFBLENBQUM7Z0JBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUM3RSxDQUFDO1lBRUEscUNBQXFDO1lBQ3JDLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxD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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AskmethatRatingPopoverDirection;
    (function (AskmethatRatingPopoverDirection) {
        AskmethatRatingPopoverDirection[AskmethatRatingPopoverDirection["top"] = 0] = "top";
        AskmethatRatingPopoverDirection[AskmethatRatingPopoverDirection["bottom"] = 1] = "bottom";
    })(AskmethatRatingPopoverDirection = exports.AskmethatRatingPopoverDirection || (exports.AskmethatRatingPopoverDirection = {}));
    var liElementStr = function (progressValue, color, font) {
        // <i style="width:${progressValue}%;color:${color};" class="${font} fa-under"></i>
        return "<li> \n<i style=\"color:" + color + ";\" class=\"" + font + " fa-inner\"></i>\n<div class=\"progress\" data-label=\"" + progressValue + "%\">\n  <span style=\"background-color:" + color + ";width:" + progressValue + "%;\" class=\"value\" style=\"width:" + progressValue + "%;\"></span>\n</div>            \n</li>";
    };
    var AskmethatRatingPopover = (function () {
        /**
         *
         */
        function AskmethatRatingPopover(options) {
            this.options = options;
        }
        Object.defineProperty(AskmethatRatingPopover.prototype, "options", {
            /**
             * @function get the default option for the rating
             *
             * @return  options based on @type AskmethatRatingOptions
             */
            get: function () {
                return this._options;
            },
            /**
             * @function set the default option for the rating
             *
             * @return  options based on @type AskmethatRatingOptions
             */
            set: function (value) {
                this._options = Object.assign({}, value);
                if (this.options.direction == undefined) {
                    this.options.direction = AskmethatRatingPopoverDirection.bottom;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Return a list of elements
         */
        AskmethatRatingPopover.prototype.render = function () {
            var list = document.createElement("ul");
            var items = "";
            list.classList.add(AskmethatRatingPopoverDirection[this.options.direction]);
            for (var _i = 0, _a = this.options.values; _i < _a.length; _i++) {
                var value = _a[_i];
                items += liElementStr(value, this.options.color, this.options.fontClass);
            }
            list.innerHTML = items;
            return list;
        };
        return AskmethatRatingPopover;
    }());
    exports.AskmethatRatingPopover = AskmethatRatingPopover;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW10LXJhdGluZy1wb3BvdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3RzL2FtdC1yYXRpbmctcG9wb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDSSxJQUFZLCtCQUdYO0lBSEQsV0FBWSwrQkFBK0I7UUFDdkMsbUZBQUcsQ0FBQTtRQUNILHlGQUFNLENBQUE7SUFDVixDQUFDLEVBSFcsK0JBQStCLEdBQS9CLHVDQUErQixLQUEvQix1Q0FBK0IsUUFHMUM7SUFzQkwsSUFBTSxZQUFZLEdBQUcsVUFBVSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUk7UUFDckQsbUZBQW1GO1FBQ25GLE1BQU0sQ0FBQyw2QkFDTyxLQUFLLG9CQUFhLElBQUksK0RBQ0osYUFBYSwrQ0FDZixLQUFLLGVBQVUsYUFBYSwyQ0FBa0MsYUFBYSw0Q0FFdkcsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUVEO1FBeUJJOztXQUVHO1FBQ0gsZ0NBQVksT0FBc0M7WUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQztRQXRCRCxzQkFBSSwyQ0FBTztZQUxYOzs7O2VBSUc7aUJBQ0g7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQztZQUVEOzs7O2VBSUc7aUJBQ0gsVUFBWSxLQUFvQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBUyxNQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFakQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztvQkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsK0JBQStCLENBQUMsTUFBTSxDQUFDO2dCQUNuRSxDQUFDO1lBQ0osQ0FBQzs7O1dBYkE7UUFzQkQ7O1dBRUc7UUFDSSx1Q0FBTSxHQUFiO1lBQ0ksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFFNUUsR0FBRyxDQUFBLENBQWMsVUFBbUIsRUFBbkIsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBbkIsY0FBbUIsRUFBbkIsSUFBbUI7Z0JBQWhDLElBQUksS0FBSyxTQUFBO2dCQUNULEtBQUssSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUU7WUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFTCw2QkFBQztJQUFELENBQUMsQUFqREQsSUFpREM7SUFqRFksd0RBQXNCIn0=

/***/ })
/******/ ]);
});
//# sourceMappingURL=amt-rating.js.map
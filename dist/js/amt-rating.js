"use strict";
var AskmethatRatingSteps;
(function (AskmethatRatingSteps) {
    AskmethatRatingSteps[AskmethatRatingSteps["DecimalStep"] = 0] = "DecimalStep";
    AskmethatRatingSteps[AskmethatRatingSteps["HalfStep"] = 1] = "HalfStep";
    AskmethatRatingSteps[AskmethatRatingSteps["OnePerOneStep"] = 2] = "OnePerOneStep";
})(AskmethatRatingSteps || (AskmethatRatingSteps = {}));
var AskmethatRating = (function () {
    function AskmethatRating(element, defaultValue, options) {
        var _this = this;
        this._defaultOptions = {
            hoverColor: '#ffff66',
            backgroundColor: '#e5e500',
            minRating: 1,
            maxRating: 5,
            fontClass: "fa fa-star",
            readonly: false,
            step: AskmethatRatingSteps.DecimalStep
        };
        this.parentElement = element;
        if (options)
            this._defaultOptions = options;
        if (this._defaultOptions.minRating > defaultValue) {
            throw new Error("Default value should be higher than minRating options");
        }
        if (!this._defaultOptions.readonly) {
            this.parentElement.addEventListener("mouseleave", function (e) { return _this.onMouseLeave(e); });
        }
        this.render(defaultValue);
    }
    Object.defineProperty(AskmethatRating.prototype, "value", {
        get: function () {
            return this.pValue;
        },
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
        get: function () {
            return this._defaultOptions;
        },
        enumerable: true,
        configurable: true
    });
    AskmethatRating.prototype.render = function (value) {
        var _this = this;
        if (value === void 0) { value = this._defaultOptions.minRating; }
        this.parentElement.innerHTML = '';
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            var spanUnder = document.createElement("span");
            var spanOuter = document.createElement("span");
            spanOuter.className = this._defaultOptions.fontClass;
            spanOuter.className += " amt-rating-elem amt-rating-under amt-rating";
            spanOuter.setAttribute("data-rating", i.toString());
            spanOuter.style.color = this._defaultOptions.backgroundColor;
            spanUnder.className += this._defaultOptions.fontClass;
            spanUnder.className += " amt-rating-under am-rating";
            spanUnder.style.color = this._defaultOptions.hoverColor;
            spanUnder.style.width = "0%";
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
            this.pValue = value;
            if (!this._defaultOptions.readonly) {
                spanOuter.addEventListener("click", function (e) { return _this.onRatingClick(e); });
                spanOuter.addEventListener("mousemove", function (e) { return _this.onMouseMove(e); });
            }
            spanOuter.appendChild(spanUnder);
            this.parentElement.appendChild(spanOuter);
        }
    };
    AskmethatRating.prototype.onRatingClick = function (event) {
        var span = event.srcElement;
        var underSpan = span.querySelector(".amt-rating-under");
        var data = Number(span.getAttribute("data-rating"));
        var value = (data - 1) + Number((parseInt(underSpan.style.width, 10) * 0.01).toFixed(1));
        if (value < this._defaultOptions.minRating) {
            return;
        }
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
    AskmethatRating.prototype.onMouseLeave = function (event) {
        this.setOrUnsetActive(this.value);
    };
    AskmethatRating.prototype.setOrUnsetActive = function (value) {
        for (var i = 1; i <= this._defaultOptions.maxRating; i++) {
            if (i < this._defaultOptions.minRating) {
                continue;
            }
            var span = this.parentElement.querySelector(".amt-rating-elem[data-rating='" + i + "']");
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

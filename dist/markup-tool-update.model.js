"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};
var MarkupToolUpdate = (function () {
    function MarkupToolUpdate(x, y, type, uuid, toolType, strokeColor, lineWidth, shape, fontSize, icon, shapeWidth, text) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._uuid = uuid;
        this._toolType = toolType;
        this._strokeColor = strokeColor;
        this._lineWidth = lineWidth;
        this._shape = shape;
        this._fontSize = fontSize;
        this._icon = icon;
        this._shapeWidth = shapeWidth | 0;
        this._text = text;
    }
    Object.defineProperty(MarkupToolUpdate.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (newX) {
            this._x = newX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (newY) {
            this._y = newY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "UUID", {
        get: function () {
            return this._uuid;
        },
        set: function (uuid) {
            this._uuid = uuid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "toolType", {
        get: function () {
            return this._toolType;
        },
        set: function (toolType) {
            this._toolType = toolType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "strokeColor", {
        get: function () {
            return this._strokeColor;
        },
        set: function (strokeColor) {
            this._strokeColor = strokeColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (lineWidth) {
            this._lineWidth = lineWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        set: function (shape) {
            this._shape = shape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "fontSize", {
        get: function () {
            return this._fontSize;
        },
        set: function (size) {
            this._fontSize = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (icon) {
            this._icon = icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "shapeWidth", {
        get: function () {
            return this._shapeWidth;
        },
        set: function (width) {
            this._shapeWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkupToolUpdate.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    return MarkupToolUpdate;
}());
exports.MarkupToolUpdate = MarkupToolUpdate;
//# sourceMappingURL=markup-tool-update.model.js.map
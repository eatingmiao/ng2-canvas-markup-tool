"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var markup_tool_layer_component_1 = require("./markup-tool-layer.component");
var MarkupToolTextComponent = (function () {
    function MarkupToolTextComponent() {
        this.updates = [];
        this.isMoving = false;
        this._textHistory = [];
    }
    MarkupToolTextComponent.prototype.start = function (update) {
        this._startPoint = {
            x: update.x,
            y: update.y
        };
    };
    MarkupToolTextComponent.prototype.add = function (update) {
        var _this = this;
        this.updates.push(update);
        setTimeout(function () {
            var canvas = _this.layers.last.canvas;
            if (!_this.isMoving && canvas) {
                _this._draw(update, canvas, update.x, update.y);
                _this.isMoving = false;
                if (_this.updates && _this.updates.length > 0)
                    _this.updates[_this.updates.length - 1].text = update.text;
            }
        }, 0);
    };
    MarkupToolTextComponent.prototype.canMove = function (update) {
        var _this = this;
        this.layers.forEach(function (layer, i) {
            if (layer.context.isPointInPath(update.x, update.y)) {
                _this._moveRect = layer.canvas;
                _this.isMoving = true;
                _this._text = _this.updates[i].text;
                _this._fillColor = _this.updates[i].strokeColor;
                _this._fontSize = _this.updates[i].fontSize;
            }
        });
    };
    MarkupToolTextComponent.prototype.move = function (update) {
        var canvas;
        if (this.isMoving) {
            canvas = this._moveRect;
            if (canvas)
                this._draw(update, canvas, update.x, update.y);
        }
    };
    MarkupToolTextComponent.prototype.remove = function (uuid) {
        var newLayers = this.updates.filter(function (update) {
            return update.UUID !== uuid;
        });
        this.updates = newLayers;
        var textHistory = this._textHistory.filter(function (update) {
            return update.UUID !== uuid;
        });
        this._textHistory = textHistory;
    };
    MarkupToolTextComponent.prototype.redrawBackground = function (callbackFn) {
        this.updates = [];
        callbackFn && callbackFn();
    };
    MarkupToolTextComponent.prototype._draw = function (update, canvas, x, y) {
        var context = canvas.nativeElement.getContext("2d");
        context.textBaseline = "middle";
        if (update.type === 1) {
            context.strokeStyle = 'rgba(77,177,254, .6)';
        }
        else {
            context.strokeStyle = 'rgba(77,177,254, 0)';
        }
        var text;
        if (this.isMoving) {
            text = this._text;
            context.font = this._fontSize + 'px sans-serif';
            context.fillStyle = this._fillColor;
        }
        else {
            text = update.text;
            context.font = update.fontSize + 'px sans-serif';
            context.fillStyle = update.strokeColor;
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.save();
        context.beginPath();
        var width = context.measureText(text).width;
        var height = update.fontSize;
        if (this.isMoving) {
            context.rect(x, y - height / 2, width, height);
            context.fillText(text, x, y);
        }
        else {
            context.rect(this._startPoint.x, this._startPoint.y - height / 2, width, height);
            context.fillText(text, this._startPoint.x, this._startPoint.y);
        }
        context.closePath();
        context.stroke();
        context.restore();
    };
    MarkupToolTextComponent.prototype.addHistory = function (update) {
        this._textHistory.push(update);
    };
    MarkupToolTextComponent.prototype.getHistory = function () {
        return this._textHistory;
    };
    MarkupToolTextComponent.prototype.clearHistory = function () {
        this._textHistory = [];
        this.redrawBackground();
    };
    MarkupToolTextComponent.prototype.getLayer = function () {
        return this.layers;
    };
    MarkupToolTextComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-text',
                    template: "<markup-tool-layer [width]=\"width\" [height]=\"height\" *ngFor=\"let l of updates\"></markup-tool-layer>"
                },] },
    ];
    /** @nocollapse */
    MarkupToolTextComponent.ctorParameters = function () { return []; };
    MarkupToolTextComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "layers": [{ type: core_1.ViewChildren, args: [markup_tool_layer_component_1.MarkupToolLayerComponent,] },],
    };
    return MarkupToolTextComponent;
}());
exports.MarkupToolTextComponent = MarkupToolTextComponent;
//# sourceMappingURL=markup-tool-text.component.js.map
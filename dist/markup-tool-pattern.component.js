"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var markup_tool_layer_component_1 = require("./markup-tool-layer.component");
var MarkupToolPatternComponent = (function () {
    function MarkupToolPatternComponent() {
        this.updates = [];
        this.isMoving = false;
        this._patternHistory = [];
    }
    MarkupToolPatternComponent.prototype.start = function (update) {
        this.updates.push(update);
        this._startPoint = {
            x: update.x,
            y: update.y
        };
    };
    MarkupToolPatternComponent.prototype.add = function (update) {
        var canvas = this.layers.last.canvas;
        if (!this.isMoving && canvas) {
            this._draw(update, canvas, update.x, update.y);
            var width = Math.abs(update.x - this._startPoint.x);
            if (this.updates && this.updates.length > 0)
                this.updates[this.updates.length - 1].shapeWidth = width;
        }
    };
    MarkupToolPatternComponent.prototype.canMove = function (update) {
        var _this = this;
        this.layers.forEach(function (layer, i) {
            var context = layer.canvas.nativeElement.getContext("2d");
            if (context.isPointInPath(update.x, update.y)) {
                _this._moveRect = layer.canvas;
                _this.isMoving = true;
                _this._shapeWidth = _this.updates[i].shapeWidth;
                _this._shape = _this.updates[i].shape;
                _this._strokeColor = _this.updates[i].strokeColor;
                _this._lineWidth = _this.updates[i].lineWidth;
            }
        });
    };
    MarkupToolPatternComponent.prototype.move = function (update, lastPosition) {
        var canvas;
        if (this.isMoving) {
            canvas = this._moveRect;
        }
        else {
            canvas = this.layers.last.canvas;
        }
        if (canvas)
            this._draw(update, canvas, update.x, update.y);
    };
    MarkupToolPatternComponent.prototype.remove = function (uuid) {
        var newLayers = this.updates.filter(function (update) {
            return update.UUID !== uuid;
        });
        this.updates = newLayers;
        var patternHistory = this._patternHistory.filter(function (update) {
            return update.UUID !== uuid;
        });
        this._patternHistory = patternHistory;
    };
    MarkupToolPatternComponent.prototype.redrawBackground = function (callbackFn) {
        this.updates = [];
        callbackFn && callbackFn();
    };
    MarkupToolPatternComponent.prototype._draw = function (update, canvas, x, y, lastPosition) {
        var context = canvas.nativeElement.getContext("2d");
        var shape = update.shape;
        context.strokeStyle = update.strokeColor;
        context.lineWidth = update.lineWidth;
        if (this.isMoving) {
            shape = this._shape;
            context.lineWidth = this._lineWidth;
            context.strokeStyle = this._strokeColor;
        }
        if (this.isMoving && update.type === 1) {
            context.strokeStyle = 'rgba(77,177,254, .6)';
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.save();
        context.beginPath();
        switch (shape) {
            case 1:
                if (this.isMoving) {
                    var width = this._shapeWidth;
                    context.arc(x - width / 2, y - width / 2, width, 0 * Math.PI, 2 * Math.PI);
                }
                else {
                    var width = Math.abs(x - this._startPoint.x);
                    context.arc(this._startPoint.x, this._startPoint.y, width, 0 * Math.PI, 2 * Math.PI);
                }
                break;
            case 2:
                if (this.isMoving) {
                    var width = this._shapeWidth;
                    context.rect(x - width / 2, y - width / 2, width, width);
                }
                else {
                    var width = Math.abs(x - this._startPoint.x);
                    context.rect(this._startPoint.x, this._startPoint.y, width, width);
                }
                break;
            case 3:
                this._drawArrow(context, x, y, lastPosition);
                break;
            case 4:
                if (!this.isMoving) {
                    this._drawLine(context, x, y, lastPosition);
                }
                break;
        }
        context.stroke();
        context.restore();
    };
    MarkupToolPatternComponent.prototype._drawLine = function (context, toX, toY, lastPosition) {
        var fromX = this._startPoint.x;
        var fromY = this._startPoint.y;
        if (lastPosition) {
            fromX = lastPosition.x;
            fromY = lastPosition.y;
        }
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.closePath();
    };
    MarkupToolPatternComponent.prototype._drawArrow = function (context, toX, toY, lastPosition) {
        var theta = 30;
        var headlen = 25;
        var fromX = this._startPoint.x;
        var fromY = this._startPoint.y;
        if (lastPosition) {
            fromX = lastPosition.x;
            fromY = lastPosition.y;
        }
        context.lineCap = "round";
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        var angle = Math.atan2(this._startPoint.y - toY, this._startPoint.x - toX) * 180 / Math.PI;
        var angle1 = (angle + theta) * Math.PI / 180;
        var angle2 = (angle - theta) * Math.PI / 180;
        var topX = headlen * Math.cos(angle1);
        var topY = headlen * Math.sin(angle1);
        var botX = headlen * Math.cos(angle2);
        var botY = headlen * Math.sin(angle2);
        if (!this.isMoving) {
            var arrowX = toX + topX;
            var arrowY = toY + topY;
            context.moveTo(arrowX, arrowY);
            context.lineTo(toX, toY);
            arrowX = toX + botX;
            arrowY = toY + botY;
            context.moveTo(arrowX, arrowY);
            context.lineTo(toX, toY);
        }
    };
    MarkupToolPatternComponent.prototype.addHistory = function (update) {
        this._patternHistory.push(update);
    };
    MarkupToolPatternComponent.prototype.getHistory = function () {
        return this._patternHistory;
    };
    MarkupToolPatternComponent.prototype.clearHistory = function () {
        this._patternHistory = [];
        this.redrawBackground();
    };
    MarkupToolPatternComponent.prototype.getLayer = function () {
        return this.layers;
    };
    MarkupToolPatternComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-pattern',
                    template: "<markup-tool-layer [width]=\"width\" [height]=\"height\" *ngFor=\"let l of updates\"></markup-tool-layer>"
                },] },
    ];
    /** @nocollapse */
    MarkupToolPatternComponent.ctorParameters = function () { return []; };
    MarkupToolPatternComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "layers": [{ type: core_1.ViewChildren, args: [markup_tool_layer_component_1.MarkupToolLayerComponent,] },],
    };
    return MarkupToolPatternComponent;
}());
exports.MarkupToolPatternComponent = MarkupToolPatternComponent;
//# sourceMappingURL=markup-tool-pattern.component.js.map
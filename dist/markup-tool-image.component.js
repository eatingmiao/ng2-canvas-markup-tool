"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var markup_tool_layer_component_1 = require("./markup-tool-layer.component");
var MarkupToolImageComponent = (function () {
    function MarkupToolImageComponent() {
        this.updates = [];
        this.isMoving = false;
        this._imageHistory = [];
    }
    MarkupToolImageComponent.prototype.start = function (update) {
        this._startPoint = {
            x: update.x,
            y: update.y
        };
    };
    MarkupToolImageComponent.prototype.add = function (update) {
        var _this = this;
        this.updates.push(update);
        setTimeout(function () {
            var canvas = _this.layers.last.canvas;
            if (!_this.isMoving && canvas) {
                _this._draw(update, canvas, update.x, update.y);
                if (_this.updates && _this.updates.length > 0)
                    _this.updates[_this.updates.length - 1].icon = update.icon;
            }
        });
    };
    MarkupToolImageComponent.prototype.canMove = function (update) {
        var _this = this;
        if (this.layers) {
            this.layers.forEach(function (layer, i) {
                if (layer.context.isPointInPath(update.x, update.y)) {
                    _this._moveRect = layer.canvas;
                    _this.isMoving = true;
                    _this._url = _this.updates[i].icon;
                }
            });
        }
    };
    MarkupToolImageComponent.prototype.move = function (update) {
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
    MarkupToolImageComponent.prototype.remove = function (uuid) {
        var newLayers = this.updates.filter(function (update) {
            return update.UUID !== uuid;
        });
        this.updates = newLayers;
        var imageHistory = this._imageHistory.filter(function (update) {
            return update.UUID !== uuid;
        });
        this._imageHistory = imageHistory;
    };
    MarkupToolImageComponent.prototype.redrawBackground = function (callbackFn) {
        this.updates = [];
        callbackFn && callbackFn();
    };
    MarkupToolImageComponent.prototype._draw = function (update, canvas, x, y) {
        var context = canvas.nativeElement.getContext("2d");
        var imageElement = new Image();
        imageElement.addEventListener("load", function () {
            context.strokeStyle = 'rgba(77,177,254, 0)';
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.save();
            context.beginPath();
            var width = context.canvas.width / 10;
            context.rect(x - 15, y - 15, width + 2, width + 2);
            context.drawImage(imageElement, x - 15, y - 15, width, width);
        });
        if (this.isMoving) {
            imageElement.src = this._url;
        }
        else {
            imageElement.src = update.icon;
        }
        context.closePath();
        context.stroke();
        context.restore();
    };
    MarkupToolImageComponent.prototype.addHistory = function (update) {
        this._imageHistory.push(update);
    };
    MarkupToolImageComponent.prototype.getHistory = function () {
        return this._imageHistory;
    };
    MarkupToolImageComponent.prototype.clearHistory = function () {
        this._imageHistory = [];
        this.redrawBackground();
    };
    MarkupToolImageComponent.prototype.getLayer = function () {
        return this.layers;
    };
    MarkupToolImageComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-image',
                    template: "<markup-tool-layer [width]=\"width\" [height]=\"height\" *ngFor=\"let l of updates\"></markup-tool-layer>"
                },] },
    ];
    /** @nocollapse */
    MarkupToolImageComponent.ctorParameters = function () { return []; };
    MarkupToolImageComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "layers": [{ type: core_1.ViewChildren, args: [markup_tool_layer_component_1.MarkupToolLayerComponent,] },],
    };
    return MarkupToolImageComponent;
}());
exports.MarkupToolImageComponent = MarkupToolImageComponent;
//# sourceMappingURL=markup-tool-image.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var markup_tool_layer_component_1 = require("./markup-tool-layer.component");
var MarkupToolDrawComponent = (function () {
    function MarkupToolDrawComponent() {
        this._drawHistory = [];
    }
    MarkupToolDrawComponent.prototype.ngAfterViewInit = function () {
        this.context = this.layer.context;
    };
    MarkupToolDrawComponent.prototype.draw = function (update, lastPosition) {
        this.context.strokeStyle = update.strokeColor;
        this.context.lineWidth = update.lineWidth;
        this.context.save();
        this.context.beginPath();
        this.context.lineJoin = "round";
        if (lastPosition) {
            var x = lastPosition.x;
            var y = lastPosition.y;
            this.context.moveTo(x, y);
            this.context.lineTo(update.x, update.y);
        }
        else {
            var x = update.x;
            var y = update.y;
            this.context.arc(x, y, 0.5, 0, 360, false);
            this.context.fillStyle = update.strokeColor;
            this.context.fill();
        }
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    };
    MarkupToolDrawComponent.prototype.remove = function (uuid) {
        var drawHistory = this._drawHistory.filter(function (update) {
            return update.UUID !== uuid;
        });
        this._drawHistory = drawHistory;
    };
    MarkupToolDrawComponent.prototype.addHistory = function (update) {
        this._drawHistory.push(update);
    };
    MarkupToolDrawComponent.prototype.getHistory = function () {
        return this._drawHistory;
    };
    MarkupToolDrawComponent.prototype.clearHistory = function () {
        this._drawHistory = [];
        this.redrawBackground();
    };
    MarkupToolDrawComponent.prototype.redrawBackground = function (callbackFn) {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        callbackFn && callbackFn();
    };
    MarkupToolDrawComponent.prototype.getLayer = function () {
        return this.layer;
    };
    MarkupToolDrawComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-draw',
                    template: "<markup-tool-layer [width]=\"width\" [height]=\"height\"></markup-tool-layer>"
                },] },
    ];
    /** @nocollapse */
    MarkupToolDrawComponent.ctorParameters = function () { return []; };
    MarkupToolDrawComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "layer": [{ type: core_1.ViewChild, args: [markup_tool_layer_component_1.MarkupToolLayerComponent,] },],
    };
    return MarkupToolDrawComponent;
}());
exports.MarkupToolDrawComponent = MarkupToolDrawComponent;
//# sourceMappingURL=markup-tool-draw.component.js.map
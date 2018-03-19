"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkupToolLayerComponent = (function () {
    function MarkupToolLayerComponent() {
    }
    MarkupToolLayerComponent.prototype.ngOnInit = function () {
        this.context = this.canvas.nativeElement.getContext("2d");
    };
    MarkupToolLayerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-layer',
                    template: "<canvas #canvas class=\"canvas-layer\" width=\"{{width}}\" height=\"{{height}}\"></canvas>",
                    styles: ["\n        .canvas-layer {\n          width: 100%;\n          left: 0;\n          top: 0;\n          position: absolute;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolLayerComponent.ctorParameters = function () { return []; };
    MarkupToolLayerComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "canvas": [{ type: core_1.ViewChild, args: ['canvas',] },],
    };
    return MarkupToolLayerComponent;
}());
exports.MarkupToolLayerComponent = MarkupToolLayerComponent;
//# sourceMappingURL=markup-tool-layer.component.js.map
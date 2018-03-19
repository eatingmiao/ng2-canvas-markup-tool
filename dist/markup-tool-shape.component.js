"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DEFAULT_SHAPE_LIST = [
    1,
    2,
    3,
    4
];
var MarkupToolShapeComponent = (function () {
    function MarkupToolShapeComponent() {
        this.shapeList = DEFAULT_SHAPE_LIST;
        this.selectedShape = 1;
        this.onShapeSelected = new core_1.EventEmitter();
    }
    MarkupToolShapeComponent.prototype.selectShape = function (s) {
        this.selectedShape = s;
        this.onShapeSelected.emit(s);
    };
    MarkupToolShapeComponent.prototype.isSelect = function (s) {
        if (this.selectedShape === s) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolShapeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-shape',
                    template: "\n        <ul>\n            <li *ngFor=\"let s of shapeList; let i = index\" [class.actived]=\"isSelect(s)\">\n                <a (click)=\"selectShape(s)\" [ngClass]=\"'shape-icon-'+i\"></a>\n            </li>\n        </ul>\n    ",
                    styles: ["\n        ul {\n            display: block;\n            overflow: hidden;\n            white-space:nowrap;\n            padding: 0;\n            margin: 0;\n            height: 30px;\n            line-height: 30px;\n            vertical-align: middle;\n        }\n        li {\n            width: 20px;\n            height: 20px;\n            list-style: none;\n            display: inline-block;\n            margin-left: 10px;\n            border-radius: 5px;\n            padding: 2px;\n            vertical-align: middle;\n        }\n        li.actived {\n            background-color: rgb(46,51,55);\n        }\n        a {\n            display: block;\n            margin: 0 auto;\n            position: relative;\n            top: 50%;\n            transform: translateY(-50%);  \n        }\n        a.shape-icon-0 {\n            width: 15px;\n            height: 15px;\n            border-radius: 15px;\n            border: 2px solid #fff;\n        }\n        a.shape-icon-1 {\n            width: 15px;\n            height: 15px;\n            border: 2px solid #fff;\n        }\n        a.shape-icon-2 {\n            width: 15px;\n            height: 15px;\n            position: relative;\n        }\n        a.shape-icon-2::before {\n            content: '';\n            display: block;\n            width: 100%;\n            height: 2px;\n            background-color: #fff;\n            position: absolute;\n            top: 6px;\n            left: 0;\n        }\n        a.shape-icon-2::after {\n            content: '';\n            display: block;\n            width: 7px;\n            height: 7px;\n            border-top: 2px solid #fff;\n            border-right: 2px solid #fff;\n            transform: rotate(45deg);\n            position: absolute;\n            right: -1.2px;\n            top: 2px;\n        }\n        a.shape-icon-3 {\n            width: 15px;\n            height: 15px;\n            position: relative;\n        }\n        a.shape-icon-3::before {\n            content: '';\n            display: block;\n            width: 100%;\n            height: 2px;\n            background-color: #fff;\n            position: absolute;\n            top: 6px;\n            left: 0;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolShapeComponent.ctorParameters = function () { return []; };
    MarkupToolShapeComponent.propDecorators = {
        "selectedShape": [{ type: core_1.Input },],
        "onShapeSelected": [{ type: core_1.Output },],
    };
    return MarkupToolShapeComponent;
}());
exports.MarkupToolShapeComponent = MarkupToolShapeComponent;
//# sourceMappingURL=markup-tool-shape.component.js.map
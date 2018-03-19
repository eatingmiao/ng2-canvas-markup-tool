"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DEFAULT_LINE_WIDTH_LIST = [
    1,
    3,
    5
];
var MarkupToolLineWidthComponent = (function () {
    function MarkupToolLineWidthComponent() {
        this.selectedWidth = 1;
        this.onLineWidthSelected = new core_1.EventEmitter();
    }
    MarkupToolLineWidthComponent.prototype.ngOnInit = function () {
        if (!this.lineWidthList) {
            this.lineWidthList = DEFAULT_LINE_WIDTH_LIST;
        }
        else {
            this.lineWidthList = this.lineWidthList.slice(0, 3);
        }
    };
    MarkupToolLineWidthComponent.prototype.selectLineWidth = function (w) {
        this.selectedWidth = w;
        this.onLineWidthSelected.emit(w);
    };
    MarkupToolLineWidthComponent.prototype.isSelect = function (w) {
        if (this.selectedWidth === w) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolLineWidthComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-line-width',
                    template: "\n        <ul>\n            <li *ngFor=\"let w of lineWidthList; let i = index\" [class.actived]=\"isSelect(w)\">\n                <a (click)=\"selectLineWidth(w)\" [ngClass]=\"'brush-icon-'+i\"></a>\n            </li>\n        </ul>\n    ",
                    styles: ["\n        ul {\n            display: block;\n            overflow: hidden;\n            white-space:nowrap;\n            padding: 0;\n            margin: 0;\n            height: 30px;\n            line-height: 30px;\n            vertical-align: middle;\n        }\n        li {\n            width: 20px;\n            height: 20px;\n            list-style: none;\n            display: inline-block;\n            margin-left: 10px;\n            border-radius: 5px;\n            padding: 2px;\n            vertical-align: middle;\n        }\n        li.actived {\n            background-color: rgb(46,51,55);\n        }\n        a {\n            display: block;\n            background-color: #fff;\n            margin: 0 auto;\n            position: relative;\n            top: 50%;\n            transform: translateY(-50%);\n        }\n        a.brush-icon-0 {\n            width: 5px;\n            height: 5px;\n            border-radius: 5px;\n        }\n        a.brush-icon-1 {\n            width: 10px;\n            height: 10px;\n            border-radius: 10px;\n        }\n        a.brush-icon-2 {\n            width: 15px;\n            height: 15px;\n            border-radius: 15px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolLineWidthComponent.ctorParameters = function () { return []; };
    MarkupToolLineWidthComponent.propDecorators = {
        "lineWidthList": [{ type: core_1.Input },],
        "selectedWidth": [{ type: core_1.Input },],
        "onLineWidthSelected": [{ type: core_1.Output },],
    };
    return MarkupToolLineWidthComponent;
}());
exports.MarkupToolLineWidthComponent = MarkupToolLineWidthComponent;
//# sourceMappingURL=markup-tool-linewidth.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DEFAULT_FONT_SIZE_LIST = [
    12,
    24,
    32
];
var MarkupToolFontSizeComponent = (function () {
    function MarkupToolFontSizeComponent() {
        this.selectedFontSize = 1;
        this.onFontSizeSelected = new core_1.EventEmitter();
    }
    MarkupToolFontSizeComponent.prototype.ngOnInit = function () {
        if (!this.fontSizeList) {
            this.fontSizeList = DEFAULT_FONT_SIZE_LIST;
        }
        else {
            this.fontSizeList = this.fontSizeList.slice(0, 3);
        }
    };
    MarkupToolFontSizeComponent.prototype.selectFontSize = function (s) {
        this.selectedFontSize = s;
        this.onFontSizeSelected.emit(s);
    };
    MarkupToolFontSizeComponent.prototype.isSelect = function (s) {
        if (this.selectedFontSize === s) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolFontSizeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-font-size',
                    template: "\n        <ul>\n            <li *ngFor=\"let s of fontSizeList; let i = index\" [class.actived]=\"isSelect(s)\">\n                <a (click)=\"selectFontSize(s)\" [ngClass]=\"'font-size-icon-'+i\">A</a>\n            </li>\n        </ul>\n    ",
                    styles: ["\n        ul {\n            display: block;\n            overflow: hidden;\n            white-space:nowrap;\n            padding: 0;\n            margin: 0;\n            height: 30px;\n            line-height: 30px;\n            vertical-align: middle;\n        }\n        li {\n            width: 20px;\n            height: 20px;\n            list-style: none;\n            display: inline-block;\n            margin-left: 10px;\n            border-radius: 5px;\n            padding: 2px;\n            vertical-align: middle;\n        }\n        li.actived {\n            background-color: rgb(46,51,55);\n        }\n        a {\n            display: block;\n            color: #fff;\n            margin: 0 auto;\n            position: relative;\n            top: 50%;\n            transform: translateY(-50%);\n            -webkit-transform: translateY(-50%);\n        }\n        a.font-size-icon-0 {\n            font-size: 0.5em;\n        }\n        a.font-size-icon-1 {\n            font-size: 1.1em;\n        }\n        a.font-size-icon-2 {\n            font-size: 1.3em;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolFontSizeComponent.ctorParameters = function () { return []; };
    MarkupToolFontSizeComponent.propDecorators = {
        "fontSizeList": [{ type: core_1.Input },],
        "selectedFontSize": [{ type: core_1.Input },],
        "onFontSizeSelected": [{ type: core_1.Output },],
    };
    return MarkupToolFontSizeComponent;
}());
exports.MarkupToolFontSizeComponent = MarkupToolFontSizeComponent;
//# sourceMappingURL=markup-tool-fontsize.component.js.map
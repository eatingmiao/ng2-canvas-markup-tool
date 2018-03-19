"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DEFAULT_COLOR = [
    'black',
    'white',
    'red',
    'rgb(254,217,10)',
    'rgb(10,85,254)',
    'rgb(38,255,8)'
];
var MarkupToolColorPickerComponent = (function () {
    function MarkupToolColorPickerComponent() {
        this.selectedColor = "black";
        this.onColorSelected = new core_1.EventEmitter();
    }
    MarkupToolColorPickerComponent.prototype.ngOnInit = function () {
        if (!this.colorList) {
            this.colorList = DEFAULT_COLOR;
        }
    };
    MarkupToolColorPickerComponent.prototype.selectColor = function (c) {
        this.selectedColor = c;
        this.onColorSelected.emit(c);
    };
    MarkupToolColorPickerComponent.prototype.isSelect = function (c) {
        if (this.selectedColor == c) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolColorPickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-colorpicker',
                    template: "\n        <ul>\n            <li *ngFor=\"let c of colorList\" [class.actived]=\"isSelect(c)\">\n                <a [ngStyle]=\"{'background-color':c}\" (click)=\"selectColor(c)\"></a>\n            </li>\n        </ul>\n    ",
                    styles: ["\n        ul {\n            display: block;\n            overflow: hidden;\n            white-space:nowrap;\n            padding: 0;\n            margin: 0;\n            height: 30px;\n            line-height: 30px;\n            vertical-align: middle;\n        }\n        li {\n            list-style: none;\n            display: inline-block;\n            margin-left: 10px;\n            border-radius: 8px;\n            padding: 2px;\n            vertical-align: middle;\n        }\n        a {\n            display: block;\n            width: 20px;\n            height: 20px;\n            border-radius: 5px;\n        }\n        li.actived {\n            border: 2px solid rgb(77,177,254);\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolColorPickerComponent.ctorParameters = function () { return []; };
    MarkupToolColorPickerComponent.propDecorators = {
        "colorList": [{ type: core_1.Input },],
        "selectedColor": [{ type: core_1.Input },],
        "onColorSelected": [{ type: core_1.Output },],
    };
    return MarkupToolColorPickerComponent;
}());
exports.MarkupToolColorPickerComponent = MarkupToolColorPickerComponent;
//# sourceMappingURL=markup-tool-colorpicker.component.js.map
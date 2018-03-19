"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkupToolIconComponent = (function () {
    function MarkupToolIconComponent() {
        this.iconList = [];
        this.selectedIcon = 1;
        this.onIconSelected = new core_1.EventEmitter();
    }
    MarkupToolIconComponent.prototype.selectIcon = function (n) {
        this.selectedIcon = n.id;
        this.onIconSelected.emit(n.id);
    };
    MarkupToolIconComponent.prototype.isSelect = function (n) {
        if (this.selectedIcon && this.selectedIcon === n.id) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolIconComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-icon',
                    template: "\n        <ul>\n            <li *ngFor=\"let n of iconList\" [class.actived]=\"isSelect(n)\">\n                <a (click)=\"selectIcon(n)\">\n                    <img [src]=\"n?.url\">\n                </a>\n            </li>\n        </ul>\n    ",
                    styles: ["\n        ul {\n            display: block;\n            overflow: hidden;\n            white-space:nowrap;\n            padding: 0;\n            margin: 0;\n            height: 40px;\n            line-height: 40px;\n            vertical-align: middle;\n        }\n        li {\n            width: 30px;\n            height: 30px;\n            list-style: none;\n            display: inline-block;\n            margin-left: 10px;\n            border-radius: 5px;\n            padding: 2px;\n            vertical-align: middle;\n        }\n        li.actived {\n            background-color: rgb(46,51,55);\n        }\n        a {\n            display: block;\n            width: 100%;\n            height: 100%;\n        }\n        a > img {\n            width: 100%;\n            height: 100%;\n            padding-top: 1px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolIconComponent.ctorParameters = function () { return []; };
    MarkupToolIconComponent.propDecorators = {
        "iconList": [{ type: core_1.Input },],
        "selectedIcon": [{ type: core_1.Input },],
        "onIconSelected": [{ type: core_1.Output },],
    };
    return MarkupToolIconComponent;
}());
exports.MarkupToolIconComponent = MarkupToolIconComponent;
//# sourceMappingURL=markup-tool-icon.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkupToolPopoverComponent = (function () {
    function MarkupToolPopoverComponent() {
        this.getText = new core_1.EventEmitter();
    }
    MarkupToolPopoverComponent.prototype.saveText = function (id) {
        if (id === 1) {
            this.getText.emit(this.txt);
        }
        else {
            this.getText.emit('');
        }
    };
    MarkupToolPopoverComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool-popover',
                    template: "\n        <button type=\"button\" class=\"btn-cancel\" (click)=\"saveText(0)\">\n            {{cancelBtn}}\n        </button>\n        <button type=\"button\" class=\"btn-save\" (click)=\"saveText(1)\">\n            {{saveBtn}}\n        </button>\n        <textarea type=\"text\" class=\"markup-tool-text\" [(ngModel)]=\"txt\"></textarea>\n        ",
                    styles: ["\n        textarea {\n            width: 100%;\n            height: 80%;\n            background: transparent;\n            color: rgba(255,255,255, .8);\n            font-size: 3em;\n            border: 0;\n            top: 2.5em;\n            position: absolute;\n            padding: 15px;\n        }\n        button {\n            background: transparent;\n            color: rgb(77,177,254);\n            position: absolute;\n            padding: 10px;\n            font-size: 2em;\n            margin-top: env(safe-area-inset-top); \n        }\n        .btn-cancel {\n            left: 0;\n            color: #fff;\n        }\n        .btn-save {\n            right: 0;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    MarkupToolPopoverComponent.ctorParameters = function () { return []; };
    MarkupToolPopoverComponent.propDecorators = {
        "cancelBtn": [{ type: core_1.Input },],
        "saveBtn": [{ type: core_1.Input },],
        "txt": [{ type: core_1.Input },],
        "getText": [{ type: core_1.Output },],
    };
    return MarkupToolPopoverComponent;
}());
exports.MarkupToolPopoverComponent = MarkupToolPopoverComponent;
//# sourceMappingURL=markup-tool-popover.component.js.map
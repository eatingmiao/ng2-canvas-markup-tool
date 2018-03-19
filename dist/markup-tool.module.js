"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var markup_tool_component_1 = require("./markup-tool.component");
var markup_tool_colorpicker_component_1 = require("./markup-tool-colorpicker.component");
var markup_tool_linewidth_component_1 = require("./markup-tool-linewidth.component");
var markup_tool_shape_component_1 = require("./markup-tool-shape.component");
var markup_tool_fontsize_component_1 = require("./markup-tool-fontsize.component");
var markup_tool_icon_component_1 = require("./markup-tool-icon.component");
var markup_tool_layer_component_1 = require("./markup-tool-layer.component");
var markup_tool_draw_component_1 = require("./markup-tool-draw.component");
var markup_tool_pattern_component_1 = require("./markup-tool-pattern.component");
var markup_tool_text_component_1 = require("./markup-tool-text.component");
var markup_tool_popover_component_1 = require("./markup-tool-popover.component");
var markup_tool_image_component_1 = require("./markup-tool-image.component");
var markup_tool_component_2 = require("./markup-tool.component");
exports.MarkupToolComponent = markup_tool_component_2.MarkupToolComponent;
var markup_tool_update_model_1 = require("./markup-tool-update.model");
exports.MarkupToolUpdate = markup_tool_update_model_1.MarkupToolUpdate;
var MarkupToolModule = (function () {
    function MarkupToolModule() {
    }
    MarkupToolModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule
                    ],
                    declarations: [
                        markup_tool_colorpicker_component_1.MarkupToolColorPickerComponent,
                        markup_tool_linewidth_component_1.MarkupToolLineWidthComponent,
                        markup_tool_shape_component_1.MarkupToolShapeComponent,
                        markup_tool_fontsize_component_1.MarkupToolFontSizeComponent,
                        markup_tool_icon_component_1.MarkupToolIconComponent,
                        markup_tool_layer_component_1.MarkupToolLayerComponent,
                        markup_tool_draw_component_1.MarkupToolDrawComponent,
                        markup_tool_pattern_component_1.MarkupToolPatternComponent,
                        markup_tool_text_component_1.MarkupToolTextComponent,
                        markup_tool_popover_component_1.MarkupToolPopoverComponent,
                        markup_tool_image_component_1.MarkupToolImageComponent,
                        markup_tool_component_1.MarkupToolComponent,
                    ],
                    exports: [
                        markup_tool_component_1.MarkupToolComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    MarkupToolModule.ctorParameters = function () { return []; };
    return MarkupToolModule;
}());
exports.MarkupToolModule = MarkupToolModule;
//# sourceMappingURL=markup-tool.module.js.map
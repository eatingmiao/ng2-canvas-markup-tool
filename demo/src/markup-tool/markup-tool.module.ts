import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MarkupToolComponent } from "./markup-tool.component";
import { MarkupToolColorPickerComponent } from "./markup-tool-colorpicker.component";
import { MarkupToolLineWidthComponent } from "./markup-tool-linewidth.component";
import { MarkupToolShapeComponent } from "./markup-tool-shape.component";
import { MarkupToolFontSizeComponent } from "./markup-tool-fontsize.component";
import { MarkupToolIconComponent } from "./markup-tool-icon.component";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";
import { MarkupToolDrawComponent } from "./markup-tool-draw.component";
import { MarkupToolPatternComponent } from "./markup-tool-pattern.component";
import { MarkupToolTextComponent } from "./markup-tool-text.component";
import { MarkupToolPopoverComponent } from "./markup-tool-popover.component";
import { MarkupToolImageComponent } from "./markup-tool-image.component";

export { MarkupToolComponent, MarkupToolOptions } from "./markup-tool.component";
export { MarkupToolUpdate } from "./markup-tool-update.model";
export { MarkupToolIconEntry } from "./markup-tool-icon.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MarkupToolColorPickerComponent,
        MarkupToolLineWidthComponent,
        MarkupToolShapeComponent,
        MarkupToolFontSizeComponent,
        MarkupToolIconComponent,
        MarkupToolLayerComponent,
        MarkupToolDrawComponent,
        MarkupToolPatternComponent,
        MarkupToolTextComponent,
        MarkupToolPopoverComponent,
        MarkupToolImageComponent,
        MarkupToolComponent,
    ],
    exports: [
        MarkupToolComponent
    ]
})
export class MarkupToolModule {

}

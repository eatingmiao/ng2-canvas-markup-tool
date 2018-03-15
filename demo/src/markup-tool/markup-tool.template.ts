export const DEFAULT_TEMPLATE = `
<div class="markup-tool">
    <markup-tool-popover class="markup-popover" [cancelBtnText]="clearButtonText" [saveBtnText]="saveDataButtonText" *ngIf="isTexting" (getText)="changeText($event)"></markup-tool-popover>
    <span>
        <button *ngIf="clearButtonEnabled" (click)="clearCanvasLocal()" type="button" class="canvas-button-clear">
            <i [class]="clearButtonClass" aria-hidden="true"></i>
                    {{clearButtonText}}
        </button>
         <button *ngIf="saveDataButtonEnabled" (click)="saveLocal()" type="button" class="canvas-button-save">
             <i [class]="saveDataButtonClass" aria-hidden="true"></i>
                    {{saveDataButtonText}}
         </button>
    </span>

    <div class="canvas-wrapper" 
        (mousedown)="canvasUserEvents($event)" (mouseup)="canvasUserEvents($event)"
        (mousemove)="canvasUserEvents($event)" (mouseout)="canvasUserEvents($event)"
        (touchstart)="canvasUserEvents($event)" (touchmove)="canvasUserEvents($event)"
        (touchend)="canvasUserEvents($event)" (touchcancel)="canvasUserEvents($event)">
      <img #image [src]="imageUrl">
      <markup-tool-draw [width]="canvasWidth" [height]="canvasHeight"></markup-tool-draw>
      <markup-tool-pattern [width]="canvasWidth" [height]="canvasHeight"></markup-tool-pattern>
      <markup-tool-text [width]="canvasWidth" [height]="canvasHeight"></markup-tool-text>
      <markup-tool-image [width]="canvasWidth" [height]="canvasHeight"></markup-tool-image>
      <markup-tool-layer [width]="canvasWidth" [height]="canvasHeight"></markup-tool-layer>
    </div>

    <div class="canvas-tool">
        <div class="canvas-tool-menu">
            <button *ngIf="drawButtonEnabled" (click)="toggleTool(1)" [class.actived]="getCurrentType(1)" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                {{drawButtonText}}
            </button>
            <button *ngIf="drawButtonEnabled" (click)="toggleTool(2)" [class.actived]="getCurrentType(2)" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                {{textButtonText}}
            </button>
            <button *ngIf="drawButtonEnabled" (click)="toggleTool(3)" [class.actived]="getCurrentType(3)" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                {{patternButtonText}}
            </button>
            <button *ngIf="drawButtonEnabled" (click)="toggleTool(4)" [class.actived]="getCurrentType(4)" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                {{iconButtonText}}
            </button>
            <button *ngIf="undoButtonEnabled" (click)="undoLocal()" type="button" class="canvas-button-undo">
                <i [class]="undoButtonClass" aria-hidden="true"></i>
                {{undoButtonText}} 
            </button>
        </div>

        <div [ngSwitch]="toolType" class="canvas-tool-detail">
            <div *ngSwitchCase="1">
                <markup-tool-line-width class="inline" [lineWidthList]="lineWidths" [selectedWidth]="lineWidth" (onLineWidthSelected)="changeLineWidth($event)"></markup-tool-line-width>
                <markup-tool-colorpicker class="inline" [colorList]="colors" [selectedColor]="strokeColor" (onColorSelected)="changeColor($event)"></markup-tool-colorpicker>
            </div>
            <div *ngSwitchCase="2">
                <markup-tool-font-size class="inline" [fontSizeList]="fontSizes" [selectedFontSize]="fontSize" (onFontSizeSelected)="changeFontSize($event)"></markup-tool-font-size>
                <markup-tool-colorpicker class="inline" [colorList]="colors" [selectedColor]="strokeColor" (onColorSelected)="changeColor($event)"></markup-tool-colorpicker>
            </div>
            <div *ngSwitchCase="3">
                <markup-tool-shape class="inline" [selectedShape]="shape" (onShapeSelected)="changeShape($event)"></markup-tool-shape>
                <markup-tool-line-width class="inline" [lineWidthList]="lineWidths" [selectedWidth]="lineWidth" (onLineWidthSelected)="changeLineWidth($event)"></markup-tool-line-width>
                <markup-tool-colorpicker class="inline" [colorList]="colors" [selectedColor]="strokeColor" (onColorSelected)="changeColor($event)"></markup-tool-colorpicker>
            </div>
            <div *ngSwitchCase="4">
                <markup-tool-icon class="inline" [iconList]="icons" [selectedIcon]="icon" (onIconSelected)="changeIcon($event)"></markup-tool-icon>
            </div>
        </div>
    </div>
</div>

`;

export const DEFAULT_STYLES = `
.markup-tool {
  width: 100%;
  height: 100%;
  position:relative;
  background-color: #000;
}
.markup-popover {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0, .6);
  z-index: 999;
}
.markup-tool button {
  color: #fff;
  padding: 5px;
  background-color: transparent;
}
.canvas-wrapper {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.canvas-wrapper img {
  width: 100%;
  left: 0;
  position: relative;
}
.canvas-button-clear {
  float: left;
  margin: 10px;
}
.canvas-button-save {
  float: right;
  margin: 10px;
}
.canvas-tool {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.canvas-tool-menu {
  padding: 10px;
  background-color: rgb(60,65,71);
}
.canvas-tool-menu button.actived {
  color: rgb(77,177,254);
}
.canvas-tool-detail {
  background-color: rgb(63,70,76);
}
.inline {
  display: inline-block;
}
`;
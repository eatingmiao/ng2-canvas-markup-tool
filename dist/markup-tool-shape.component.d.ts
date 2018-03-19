import { EventEmitter } from '@angular/core';
export declare class MarkupToolShapeComponent {
    shapeList: Array<number>;
    selectedShape: number;
    onShapeSelected: EventEmitter<number>;
    constructor();
    selectShape(s: number): void;
    isSelect(s: number): boolean;
}

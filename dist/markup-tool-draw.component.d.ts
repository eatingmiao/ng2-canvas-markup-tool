import { AfterViewInit } from '@angular/core';
import { MarkupToolUpdate, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";
export declare class MarkupToolDrawComponent implements AfterViewInit {
    width: number;
    height: number;
    layer: MarkupToolLayerComponent;
    context: CanvasRenderingContext2D;
    private _drawHistory;
    constructor();
    ngAfterViewInit(): void;
    draw(update: MarkupToolUpdate, lastPosition?: EventPositionPoint): void;
    remove(uuid: string): void;
    addHistory(update: MarkupToolUpdate): void;
    getHistory(): MarkupToolUpdate[];
    clearHistory(): void;
    redrawBackground(callbackFn?: any): void;
    getLayer(): MarkupToolLayerComponent;
}

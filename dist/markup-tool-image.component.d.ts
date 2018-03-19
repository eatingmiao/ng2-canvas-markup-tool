import { QueryList } from '@angular/core';
import { MarkupToolUpdate } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";
export declare class MarkupToolImageComponent {
    width: number;
    height: number;
    layers: QueryList<MarkupToolLayerComponent>;
    updates: Array<MarkupToolUpdate>;
    isMoving: boolean;
    private _moveRect;
    private _url;
    private _startPoint;
    private _imageHistory;
    constructor();
    start(update: MarkupToolUpdate): void;
    add(update: MarkupToolUpdate): void;
    canMove(update: MarkupToolUpdate): void;
    move(update: MarkupToolUpdate): void;
    remove(uuid: string): void;
    redrawBackground(callbackFn?: any): void;
    private _draw(update, canvas, x, y);
    addHistory(update: MarkupToolUpdate): void;
    getHistory(): MarkupToolUpdate[];
    clearHistory(): void;
    getLayer(): QueryList<MarkupToolLayerComponent>;
}

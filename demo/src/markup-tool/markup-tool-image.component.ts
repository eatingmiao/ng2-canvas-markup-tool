import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { MarkupToolUpdate, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";

@Component({
    selector: 'markup-tool-image',
    template: `<markup-tool-layer [width]="width" [height]="height" *ngFor="let l of updates"></markup-tool-layer>`
})
export class MarkupToolImageComponent {
    @Input() width: number;
    @Input() height: number;

    @ViewChildren(MarkupToolLayerComponent) layers: QueryList<MarkupToolLayerComponent>;
    updates: Array<MarkupToolUpdate> = [];
    
    isMoving: boolean = false;
    private _moveRect: ElementRef;
    private _url: string;
    
    private _startPoint: EventPositionPoint;

    private _imageHistory: MarkupToolUpdate[] = [];  

    constructor() {

    }

    start(update: MarkupToolUpdate) {
        this._startPoint = {
            x: update.x,
            y: update.y
        };
    }

    add(update: MarkupToolUpdate): void {
        this.updates.push(update);
        setTimeout(()=> {
            let canvas = this.layers.last.canvas;
            if(!this.isMoving && canvas) {
                this._draw(update, canvas, update.x, update.y);
                if(this.updates && this.updates.length > 0)
                    this.updates[this.updates.length - 1].icon = update.icon;
            }
        });
    }

    canMove(update: MarkupToolUpdate) {
        if(this.layers) {
            this.layers.forEach((layer, i) => {
                if(layer.context.isPointInPath(update.x, update.y)) {
                    this._moveRect = layer.canvas;
                    this.isMoving = true;
                    this._url = this.updates[i].icon;
                }
            });
        }
    }

    move(update: MarkupToolUpdate) {
        let canvas: ElementRef;
        if(this.isMoving) {
            canvas = this._moveRect;
        } else {
            canvas = this.layers.last.canvas;
        }
        if(canvas) 
            this._draw(update, canvas, update.x, update.y);
    }

    remove(uuid: string): void {
        let newLayers = this.updates.filter((update) => {
            return update.UUID !== uuid;
        })
        this.updates = newLayers;

        let imageHistory = this._imageHistory.filter(update => {
            return update.UUID !== uuid
        });
        this._imageHistory = imageHistory;
    }

    redrawBackground(callbackFn?: any): void {
        this.updates = [];
        callbackFn && callbackFn();
    }

    private _draw(update: MarkupToolUpdate, canvas: ElementRef, x: number, y: number): void {
        let context = canvas.nativeElement.getContext("2d");

        let imageElement = new Image();
        imageElement.addEventListener("load", () => {
            context.strokeStyle = 'rgba(77,177,254, 0)';

            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.save();
            context.beginPath();

            let width = context.canvas.width / 10;

            context.rect(x-15, y-15, width+2, width+2);
            context.drawImage(imageElement, x-15, y-15, width, width);
        });

        if(this.isMoving) {
            imageElement.src = this._url;
        } else {
            imageElement.src = update.icon;
        }
        
        context.closePath();
        context.stroke();
        context.restore();
    }

    addHistory(update: MarkupToolUpdate): void {
        this._imageHistory.push(update);
    }

    getHistory(): MarkupToolUpdate[] {
        return this._imageHistory;
    }

    clearHistory(): void {
        this._imageHistory = [];
        this.redrawBackground();
    }

    getLayer(): QueryList<MarkupToolLayerComponent> {
        return this.layers;
    }
}
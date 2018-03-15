import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

import { MarkupToolUpdate, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";

@Component({
    selector: 'markup-tool-draw',
    template: `<markup-tool-layer [width]="width" [height]="height"></markup-tool-layer>`
})
export class MarkupToolDrawComponent implements AfterViewInit {
    @Input() width: number;
    @Input() height: number;

    @ViewChild(MarkupToolLayerComponent) layer: any;
    context: CanvasRenderingContext2D;

    private _drawHistory: MarkupToolUpdate[] = [];  

    constructor() {
    }

    ngAfterViewInit() {
        this.context = this.layer.context;
    }

    draw(update: MarkupToolUpdate, lastPosition?: EventPositionPoint): void {
        this.context.strokeStyle = update.strokeColor;
        this.context.lineWidth = update.lineWidth;

        this.context.save();
        this.context.beginPath();

        this.context.lineJoin = "round";

        if(lastPosition) {
            let x = lastPosition.x;
            let y = lastPosition.y;
            this.context.moveTo(x, y);
            this.context.lineTo(update.x, update.y);
        } else {
            let x = update.x;
            let y = update.y;
            this.context.arc(x, y, 0.5, 0, 360, false);
            this.context.fillStyle = update.strokeColor;
            this.context.fill();
        }
        
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    addHistory(update: MarkupToolUpdate): void {
        this._drawHistory.push(update);
    }

    getHistory(): MarkupToolUpdate[] {
        return this._drawHistory;
    }

    remove(uuid: string): void {
        let drawHistory = this._drawHistory.filter(update => {
            return update.UUID !== uuid
        });
        this._drawHistory = drawHistory;
    }

    redrawBackground(callbackFn?: any): void {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        callbackFn && callbackFn();
    }
}
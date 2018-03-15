import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { MarkupToolUpdate, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";

@Component({
    selector: 'markup-tool-text',
    template: `<markup-tool-layer [width]="width" [height]="height" *ngFor="let l of updates"></markup-tool-layer>`
})
export class MarkupToolTextComponent {
    @Input() width: number;
    @Input() height: number;

    @ViewChildren(MarkupToolLayerComponent) layers: QueryList<MarkupToolLayerComponent>;
    updates: Array<MarkupToolUpdate> = [];
    
    isMoving: boolean = false;

    private _moveRect: ElementRef;
    private _text: string;
    private _fillColor: string;
    private _fontSize: number;
    
    private _startPoint: EventPositionPoint;

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
        setTimeout(() => {
            let canvas = this.layers.last.canvas;
            if(!this.isMoving && canvas) {
                this._draw(update, canvas, update.x, update.y);
                this.isMoving = false;
                if(this.updates && this.updates.length > 0)
                    this.updates[this.updates.length - 1].text = update.text;
            }
        }, 0);
    }

    canMove(update: MarkupToolUpdate) {
        this.layers.forEach((layer, i) => {
            if(layer.context.isPointInPath(update.x, update.y)) {
                this._moveRect = layer.canvas;
                this.isMoving = true;
                this._text = this.updates[i].text;
                this._fillColor = this.updates[i].strokeColor;
                this._fontSize = this.updates[i].fontSize;
            }
        });
    }

    move(update: MarkupToolUpdate) {
        let canvas: ElementRef;
        if(this.isMoving) {
            canvas = this._moveRect;
            if(canvas) 
                this._draw(update, canvas, update.x, update.y);
        }   
    }

    remove(uuid: string): void {
        let newLayers = this.updates.filter((update) => {
            return update.UUID !== uuid;
        })
        this.updates = newLayers;
    }

    redrawBackground(callbackFn?: any): void {
        this.updates = [];
        callbackFn && callbackFn();
    }

    private _draw(update: MarkupToolUpdate, canvas: ElementRef, x: number, y: number): void {
        let context = canvas.nativeElement.getContext("2d");

        context.textBaseline="middle";

        if(update.type === 1) {
            context.strokeStyle = 'rgba(77,177,254, .6)';
        } else {
            context.strokeStyle = 'rgba(77,177,254, 0)';
        }

        let text: string; 
        if(this.isMoving) {
            text = this._text;
            context.font = this._fontSize + 'px sans-serif';
            context.fillStyle = this._fillColor;
        } else {
            text = update.text;
            context.font = update.fontSize + 'px sans-serif';
            context.fillStyle = update.strokeColor;
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.save();
        context.beginPath();

        let width = context.measureText(text).width;
        let height = update.fontSize;

        if(this.isMoving) {
            context.rect(x, y - height/2, width, height);
            context.fillText(text, x, y);
        } else {
            context.rect(this._startPoint.x, this._startPoint.y - height/2, width, height);
            context.fillText(text, this._startPoint.x, this._startPoint.y);
        }

        context.closePath();
        context.stroke();
        context.restore();
    }
}
import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { MarkupToolUpdate, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolLayerComponent } from "./markup-tool-layer.component";

@Component({
    selector: 'markup-tool-pattern',
    template: `<markup-tool-layer [width]="width" [height]="height" *ngFor="let l of updates"></markup-tool-layer>`
})
export class MarkupToolPatternComponent {
    @Input() width: number;
    @Input() height: number;

    @ViewChildren(MarkupToolLayerComponent) layers: QueryList<MarkupToolLayerComponent>;
    updates: Array<MarkupToolUpdate> = [];
    
    isMoving: boolean = false;
    private _moveRect: ElementRef;
    private _shapeWidth: number;
    private _shape: number;
    private _strokeColor: string;
    private _lineWidth: number;
    
    private _startPoint: EventPositionPoint;

    private _patternHistory: MarkupToolUpdate[] = [];  

    constructor() {

    }

    start(update: MarkupToolUpdate) {
        this.updates.push(update);
        this._startPoint = {
            x: update.x,
            y: update.y
        };
    }

    add(update: MarkupToolUpdate): void {
        let canvas = this.layers.last.canvas;
        if(!this.isMoving && canvas) {
            this._draw(update, canvas, update.x, update.y);
            let width = Math.abs(update.x - this._startPoint.x); 
            if(this.updates && this.updates.length > 0)
                this.updates[this.updates.length - 1].shapeWidth = width;
        }
    }

    canMove(update: MarkupToolUpdate) {
        this.layers.forEach((layer, i) => {
            let context = layer.canvas.nativeElement.getContext("2d");
            if(context.isPointInPath(update.x, update.y)) {
                this._moveRect = layer.canvas;
                this.isMoving = true;
                this._shapeWidth = this.updates[i].shapeWidth;
                this._shape = this.updates[i].shape;
                this._strokeColor = this.updates[i].strokeColor;
                this._lineWidth = this.updates[i].lineWidth;
            }
        });
    }

    move(update: MarkupToolUpdate, lastPosition?: EventPositionPoint) {
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
        
        let patternHistory = this._patternHistory.filter(update => {
            return update.UUID !== uuid
        });
        this._patternHistory = patternHistory;
    }

    redrawBackground(callbackFn?: any): void {
        this.updates = [];
        callbackFn && callbackFn();
    }

    private _draw(update: MarkupToolUpdate, canvas: ElementRef, x: number, y: number, lastPosition?: EventPositionPoint): void {
        let context = canvas.nativeElement.getContext("2d");

        let shape = update.shape;
        context.strokeStyle = update.strokeColor;
        context.lineWidth = update.lineWidth;

        if(this.isMoving) {
            shape = this._shape;
            context.lineWidth = this._lineWidth;
        }
        if(this.isMoving && update.type === 1) {
            context.strokeStyle = 'rgba(77,177,254, .6)';
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.save();
        context.beginPath();

        switch(shape) {
            case 1:
                if(this.isMoving) {
                    let width = this._shapeWidth;
                    context.arc(x-width/2, y-width/2, width, 0 * Math.PI, 2 * Math.PI);
                } else {
                    let width = Math.abs(x - this._startPoint.x); 
                    context.arc(this._startPoint.x, this._startPoint.y, width, 0 * Math.PI, 2 * Math.PI);
                }
                break;
            case 2:
                if(this.isMoving) {
                    let width = this._shapeWidth;
                    context.rect(x-width/2, y-width/2, width, width);
                } else {
                    let width = Math.abs(x - this._startPoint.x); 
                    context.rect(this._startPoint.x, this._startPoint.y, width, width);
                }
                break;
            case 3:
                this._drawArrow(context, x, y, lastPosition);
                break;
            case 4:
                if(!this.isMoving) {
                    this._drawLine(context, x, y, lastPosition);
                }
                break;
        }

        context.stroke();
        context.restore();
    }

    private _drawLine(context: CanvasRenderingContext2D, toX: number, toY: number, lastPosition?: EventPositionPoint) {
        let fromX = this._startPoint.x;
        let fromY = this._startPoint.y;
        if(lastPosition) {
           fromX = lastPosition.x;
           fromY = lastPosition.y; 
        }
        
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.closePath();
    }

    private _drawArrow(context: CanvasRenderingContext2D, toX: number, toY: number, lastPosition?: EventPositionPoint) {
        let theta = 30;
        let headlen = 25;

        let fromX = this._startPoint.x;
        let fromY = this._startPoint.y;
        if(lastPosition) {
           fromX = lastPosition.x;
           fromY = lastPosition.y; 
        }

        context.lineCap = "round";
        
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);

        let angle = Math.atan2(this._startPoint.y - toY, this._startPoint.x - toX) * 180 / Math.PI;
        
        let angle1 = (angle + theta) * Math.PI / 180;
        let angle2 = (angle - theta) * Math.PI / 180;

        let topX = headlen * Math.cos(angle1);
        let topY = headlen * Math.sin(angle1);
        let botX = headlen * Math.cos(angle2);
        let botY = headlen * Math.sin(angle2);

        if(!this.isMoving) { 
            let arrowX = toX + topX;
            let arrowY = toY + topY;
            context.moveTo(arrowX, arrowY);
            context.lineTo(toX, toY);

            arrowX = toX + botX;
            arrowY = toY + botY;
            context.moveTo(arrowX, arrowY);
            context.lineTo(toX, toY);
        }
    }

    addHistory(update: MarkupToolUpdate): void {
        this._patternHistory.push(update);
    }

    getHistory(): MarkupToolUpdate[] {
        return this._patternHistory;
    }

    clearHistory(): void {
        this._patternHistory = [];
        this.redrawBackground();
    }

    getLayer(): QueryList<MarkupToolLayerComponent> {
        return this.layers;
    }
}
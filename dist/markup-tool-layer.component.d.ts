import { OnInit, ElementRef } from '@angular/core';
export declare class MarkupToolLayerComponent implements OnInit {
    width: number;
    height: number;
    canvas: ElementRef;
    context: CanvasRenderingContext2D;
    constructor();
    ngOnInit(): void;
}

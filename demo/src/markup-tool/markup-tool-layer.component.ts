import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'markup-tool-layer',
    template: `<canvas #canvas class="canvas-layer" width="{{width}}" height="{{height}}"></canvas>`,
    styles: [`
        .canvas-layer {
          width: 100%;
          left: 0;
          top: 0;
          position: absolute;
        }
    `]
})
export class MarkupToolLayerComponent implements OnInit {
    @Input() width: number;
    @Input() height: number;

    @ViewChild('canvas') canvas: ElementRef;
    context: CanvasRenderingContext2D;

    constructor() {
    }

    ngOnInit(): void {
        this.context = this.canvas.nativeElement.getContext("2d");
    }
}
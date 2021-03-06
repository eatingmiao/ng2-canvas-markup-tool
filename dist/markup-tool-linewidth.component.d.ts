import { EventEmitter, OnInit } from '@angular/core';
export declare class MarkupToolLineWidthComponent implements OnInit {
    selectedWidth: number;
    lineWidthList: Array<number>;
    onLineWidthSelected: EventEmitter<number>;
    constructor();
    ngOnInit(): void;
    selectLineWidth(w: number): void;
    isSelect(w: number): boolean;
}

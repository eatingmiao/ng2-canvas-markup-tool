import { EventEmitter, OnInit } from '@angular/core';
export declare class MarkupToolFontSizeComponent implements OnInit {
    fontSizeList: Array<number>;
    selectedFontSize: number;
    onFontSizeSelected: EventEmitter<number>;
    constructor();
    ngOnInit(): void;
    selectFontSize(s: number): void;
    isSelect(s: number): boolean;
}

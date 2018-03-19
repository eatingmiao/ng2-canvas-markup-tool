import { EventEmitter, OnInit } from '@angular/core';
export declare class MarkupToolColorPickerComponent implements OnInit {
    colorList: Array<string>;
    selectedColor: string;
    onColorSelected: EventEmitter<string>;
    constructor();
    ngOnInit(): void;
    selectColor(c: string): void;
    isSelect(c: string): boolean;
}

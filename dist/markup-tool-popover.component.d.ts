import { EventEmitter } from '@angular/core';
export declare class MarkupToolPopoverComponent {
    cancelBtnText: string;
    saveBtnText: string;
    txt: string;
    getText: EventEmitter<string>;
    constructor();
    saveText(id: number): void;
}

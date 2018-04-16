import { EventEmitter } from '@angular/core';
export declare class MarkupToolPopoverComponent {
    cancelBtn: string;
    saveBtn: string;
    txt: string;
    getText: EventEmitter<string>;
    constructor();
    saveText(id: number): void;
}

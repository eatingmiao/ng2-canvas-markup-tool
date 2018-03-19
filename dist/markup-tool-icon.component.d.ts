import { EventEmitter } from '@angular/core';
export interface MarkupToolIconEntry {
    id: number;
    url: string;
}
export declare class MarkupToolIconComponent {
    iconList: Array<MarkupToolIconEntry>;
    selectedIcon: number;
    onIconSelected: EventEmitter<number>;
    constructor();
    selectIcon(n: MarkupToolIconEntry): void;
    isSelect(n: MarkupToolIconEntry): boolean;
}

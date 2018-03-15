import { Component, Output, EventEmitter, Input } from '@angular/core';

export interface MarkupToolIconEntry {
    id: number
    url: string
}

@Component({
    selector: 'markup-tool-icon',
    template: `
        <ul>
            <li *ngFor="let n of iconList" [class.actived]="isSelect(n)">
                <a (click)="selectIcon(n)">
                    <img [src]="n?.url">
                </a>
            </li>
        </ul>
    `,
    styles: [`
        ul {
            display: block;
            overflow: hidden;
            white-space:nowrap;
            padding: 0;
            margin: 0;
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
        }
        li {
            width: 30px;
            height: 30px;
            list-style: none;
            display: inline-block;
            margin-left: 10px;
            border-radius: 5px;
            padding: 2px;
            vertical-align: middle;
        }
        li.actived {
            background-color: rgb(46,51,55);
        }
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
        a > img {
            width: 100%;
            height: 100%;
            padding-top: 1px;
        }
    `]
})
export class MarkupToolIconComponent {
    @Input() iconList: Array<MarkupToolIconEntry> = [];
    @Input() selectedIcon: number = 1;
    @Output() onIconSelected = new EventEmitter<number>();

    constructor() {

    }

    selectIcon(n: MarkupToolIconEntry) {
        this.selectedIcon = n.id;
        this.onIconSelected.emit(n.id);
    }

    isSelect(n: MarkupToolIconEntry): boolean {
        if (this.selectedIcon && this.selectedIcon === n.id) {
            return true;
        } else {
            return false
        }
    }
}
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

const DEFAULT_FONT_SIZE_LIST = [
    12,
    24,
    32
];

@Component({
    selector: 'markup-tool-font-size',
    template: `
        <ul>
            <li *ngFor="let s of fontSizeList; let i = index" [class.actived]="isSelect(s)">
                <a (click)="selectFontSize(s)" [ngClass]="'font-size-icon-'+i">A</a>
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
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
        }
        li {
            width: 20px;
            height: 20px;
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
            color: #fff;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        a.font-size-icon-0 {
            font-size: 0.5em;
        }
        a.font-size-icon-1 {
            font-size: 1.1em;
        }
        a.font-size-icon-2 {
            font-size: 1.3em;
        }
    `]
})
export class MarkupToolFontSizeComponent implements OnInit {
    @Input() fontSizeList: Array<number>;
    @Input() selectedFontSize: number = 1;
    @Output() onFontSizeSelected = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
        if (!this.fontSizeList) {
            this.fontSizeList = DEFAULT_FONT_SIZE_LIST;
        } else {
            this.fontSizeList = this.fontSizeList.slice(0, 3);
        }
    }

    selectFontSize(s: number) {
        this.selectedFontSize = s;
        this.onFontSizeSelected.emit(s);
    }

    isSelect(s: number): boolean {
        if (this.selectedFontSize === s) {
            return true;
        } else {
            return false
        }
    }
}
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

const DEFAULT_LINE_WIDTH_LIST = [
    1,
    3,
    5
];

@Component({
    selector: 'markup-tool-line-width',
    template: `
        <ul>
            <li *ngFor="let w of lineWidthList; let i = index" [class.actived]="isSelect(w)">
                <a (click)="selectLineWidth(w)" [ngClass]="'brush-icon-'+i"></a>
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
            background-color: #fff;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        a.brush-icon-0 {
            width: 5px;
            height: 5px;
            border-radius: 5px;
        }
        a.brush-icon-1 {
            width: 10px;
            height: 10px;
            border-radius: 10px;
        }
        a.brush-icon-2 {
            width: 15px;
            height: 15px;
            border-radius: 15px;
        }
    `]
})
export class MarkupToolLineWidthComponent implements OnInit {
    @Input() lineWidthList: Array<number>;
    @Input() selectedWidth: number = 1;
    @Output() onLineWidthSelected = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
        if (!this.lineWidthList) {
            this.lineWidthList = DEFAULT_LINE_WIDTH_LIST;
        } else {
            this.lineWidthList = this.lineWidthList.slice(0, 3);
        }
    }

    selectLineWidth(w: number) {
        this.selectedWidth = w;
        this.onLineWidthSelected.emit(w);
    }

    isSelect(w: number): boolean {
        if (this.selectedWidth === w) {
            return true;
        } else {
            return false
        }
    }
}
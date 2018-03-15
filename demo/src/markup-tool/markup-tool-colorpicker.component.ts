import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

const DEFAULT_COLOR = [
    'black',
    'white',
    'red',
    'rgb(254,217,10)',
    'rgb(10,85,254)',
    'rgb(38,255,8)'
];

@Component({
    selector: 'markup-tool-colorpicker',
    template: `
        <ul>
            <li *ngFor="let c of colorList" [class.actived]="isSelect(c)">
                <a [ngStyle]="{'background-color':c}" (click)="selectColor(c)"></a>
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
            list-style: none;
            display: inline-block;
            margin-left: 10px;
            border-radius: 8px;
            padding: 2px;
            vertical-align: middle;
        }
        a {
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 5px;
        }
        li.actived {
            border: 2px solid rgb(77,177,254);
        }
    `]
})
export class MarkupToolColorPickerComponent implements OnInit {
    @Input() colorList: Array<string>;
    @Input() selectedColor: string = "black";
    @Output() onColorSelected = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
        if (!this.colorList) {
            this.colorList = DEFAULT_COLOR;
        }
    }

    selectColor(c: string) {
        this.selectedColor = c;
        this.onColorSelected.emit(c);
    }

    isSelect(c: string): boolean {
        if (this.selectedColor == c) {
            return true;
        } else {
            return false
        }
    }
}
import { Component, Output, EventEmitter, Input } from '@angular/core';

const DEFAULT_SHAPE_LIST = [
    1,
    2,
    3,
    4
];

@Component({
    selector: 'markup-tool-shape',
    template: `
        <ul>
            <li *ngFor="let s of shapeList; let i = index" [class.actived]="isSelect(s)">
                <a (click)="selectShape(s)" [ngClass]="'shape-icon-'+i"></a>
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
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);  
        }
        a.shape-icon-0 {
            width: 15px;
            height: 15px;
            border-radius: 15px;
            border: 2px solid #fff;
        }
        a.shape-icon-1 {
            width: 15px;
            height: 15px;
            border: 2px solid #fff;
        }
        a.shape-icon-2 {
            width: 15px;
            height: 15px;
            position: relative;
        }
        a.shape-icon-2::before {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            background-color: #fff;
            position: absolute;
            top: 6px;
            left: 0;
        }
        a.shape-icon-2::after {
            content: '';
            display: block;
            width: 7px;
            height: 7px;
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: rotate(45deg);
            position: absolute;
            right: -1.2px;
            top: 2px;
        }
        a.shape-icon-3 {
            width: 15px;
            height: 15px;
            position: relative;
        }
        a.shape-icon-3::before {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            background-color: #fff;
            position: absolute;
            top: 6px;
            left: 0;
        }
    `]
})
export class MarkupToolShapeComponent {
    shapeList: Array<number> = DEFAULT_SHAPE_LIST;
    
    @Input() selectedShape: number = 1;
    @Output() onShapeSelected = new EventEmitter<number>();

    constructor() {
    }

    selectShape(s: number) {
        this.selectedShape = s;
        this.onShapeSelected.emit(s);
    }

    isSelect(s: number): boolean {
        if (this.selectedShape === s) {
            return true;
        } else {
            return false
        }
    }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'markup-tool-popover',
    template: `
        <button type="button" class="btn-cancel" (click)="saveText(0)">
            {{cancelBtn}}
        </button>
        <button type="button" class="btn-save" (click)="saveText(1)">
            {{saveBtn}}
        </button>
        <textarea type="text" class="markup-tool-text" [(ngModel)]="txt"></textarea>
        `,
    styles: [`
        textarea {
            width: 100%;
            height: 80%;
            background: transparent;
            color: rgba(255,255,255, .8);
            font-size: 3em;
            border: 0;
            top: 2.5em;
            position: absolute;
            padding: 15px;
        }
        button {
            background: transparent;
            color: rgb(77,177,254);
            position: absolute;
            padding: 10px;
            font-size: 2em;
            margin-top: env(safe-area-inset-top); 
        }
        .btn-cancel {
            left: 0;
            color: #fff;
        }
        .btn-save {
            right: 0;
        }
    `]
})
export class MarkupToolPopoverComponent {
    @Input() cancelBtn: string;
    @Input() saveBtn: string;
    @Input() txt: string;
    @Output() getText = new EventEmitter<string>();
    
    constructor() {

    }

    saveText(id: number) {
        if(id === 1) {
            this.getText.emit(this.txt);
        } else {
            this.getText.emit('');
        }
    }
}
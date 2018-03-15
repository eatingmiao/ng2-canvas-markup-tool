import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    OnInit,
    OnChanges, AfterViewInit
} from '@angular/core';
import { MarkupToolUpdate, UPDATE_TYPE, EventPositionPoint } from "./markup-tool-update.model";
import { MarkupToolDrawComponent } from "./markup-tool-draw.component";
import { MarkupToolPatternComponent } from "./markup-tool-pattern.component";
import { MarkupToolTextComponent } from "./markup-tool-text.component";
import { MarkupToolImageComponent } from "./markup-tool-image.component";
import { MarkupToolIconEntry } from "./markup-tool-icon.component";
import { DEFAULT_TEMPLATE, DEFAULT_STYLES } from "./markup-tool.template";

export interface MarkupToolOptions {
    imageUrl?: string

    drawButtonEnabled?: boolean
    drawButtonClass?: string
    drawButtonText?: string

    clearButtonEnabled?: boolean
    clearButtonClass?: string
    clearButtonText?: string

    undoButtonEnabled?: boolean
    undoButtonClass?: string
    undoButtonText?: string

    saveDataButtonEnabled?: boolean
    saveDataButtonClass?: string
    saveDataButtonText?: string

    textButtonText?: string
    patternButtonText?: string
    iconButtonText?: string

    lineWidthList?: Array<number>
    colorList?: Array<string>
    iconList?: Array<MarkupToolIconEntry>
    fontSizeList?: Array<number>
}

@Component({
    selector: 'markup-tool',
    template: DEFAULT_TEMPLATE,
    styles: [DEFAULT_STYLES]
})
export class MarkupToolComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() options: MarkupToolOptions;

    @Input() imageUrl: string;

    @Input() drawButtonClass: string;
    @Input() clearButtonClass: string;
    @Input() undoButtonClass: string;
    @Input() saveDataButtonClass: string;

    @Input() drawButtonText: string = "";
    @Input() textButtonText: string = "";
    @Input() patternButtonText: string = "";
    @Input() iconButtonText: string = "";

    @Input() clearButtonText: string = "";
    @Input() undoButtonText: string = "";
    @Input() saveDataButtonText: string = "";

    @Input() drawButtonEnabled: boolean = true;
    @Input() clearButtonEnabled: boolean = true;
    @Input() undoButtonEnabled: boolean = false;
    @Input() saveDataButtonEnabled: boolean = false;

    @Input() shouldDownloadDrawing: boolean = true;

    @Input() colors: Array<string>;
    strokeColor: string = 'red';

    @Input() lineWidths: Array<number>;
    lineWidth: number = 3;

    @Input() icons: Array<MarkupToolIconEntry>;
    icon: number = 1;

    @Input() fontSizes: Array<number>;
    fontSize: number = 12;

    shape: number = 1;

    @Output() onClear = new EventEmitter<any>();
    @Output() onUndo = new EventEmitter<any>();
    @Output() onBatchUpdate = new EventEmitter<MarkupToolUpdate[]>();
    @Output() onImageLoaded = new EventEmitter<any>();
    @Output() onSave = new EventEmitter<string | Blob>();
    
    @ViewChild('image') imageElement: ElementRef;
    
    canvasWidth: number;
    canvasHeight: number;

    @ViewChild(MarkupToolDrawComponent) drawComponent: MarkupToolDrawComponent;
    @ViewChild(MarkupToolPatternComponent) patternComponent: MarkupToolPatternComponent;
    @ViewChild(MarkupToolTextComponent) textComponent: MarkupToolTextComponent;
    @ViewChild(MarkupToolImageComponent) imageComponent: MarkupToolImageComponent;

    public toolType: number = 0;

    private _clientDragging: boolean = false;

    private _lastUUID: string;
    private _lastPositionForUUID: Object = {};
    
    private _undoStack: MarkupToolUpdate[] = [];

    private _supportTouch: boolean = false;

    isTexting: boolean = false;
    private _onTextComplete: EventEmitter<string> = new EventEmitter<string>(); 

    private _aspectRatio: Array<number> = [];

    constructor() {
    }

    ngOnInit(): void {
        this._initInputsFromOptions(this.options);
        this._initCanvasEventListeners();
    }

    ngAfterViewInit(): void {
        this._loadImageAndCanvas();
        this._isSupportTouch();
    }

    private _initInputsFromOptions(options: MarkupToolOptions) {
        if (options) {
            if (!this._isNullOrUndefined(options.imageUrl)) this.imageUrl = options.imageUrl;

            if (!this._isNullOrUndefined(options.drawButtonClass)) this.drawButtonClass = options.drawButtonClass;
            if (!this._isNullOrUndefined(options.clearButtonClass)) this.clearButtonClass = options.clearButtonClass;
            if (!this._isNullOrUndefined(options.undoButtonClass)) this.undoButtonClass = options.undoButtonClass;
            if (!this._isNullOrUndefined(options.saveDataButtonClass)) this.saveDataButtonClass = options.saveDataButtonClass;

            if (!this._isNullOrUndefined(options.drawButtonText)) this.drawButtonText = options.drawButtonText;
            if (!this._isNullOrUndefined(options.textButtonText)) this.textButtonText = options.textButtonText;
            if (!this._isNullOrUndefined(options.patternButtonText)) this.patternButtonText = options.patternButtonText;
            if (!this._isNullOrUndefined(options.iconButtonText)) this.iconButtonText = options.iconButtonText;

            if (!this._isNullOrUndefined(options.clearButtonText)) this.clearButtonText = options.clearButtonText;
            if (!this._isNullOrUndefined(options.undoButtonText)) this.undoButtonText = options.undoButtonText;
            if (!this._isNullOrUndefined(options.saveDataButtonText)) this.saveDataButtonText = options.saveDataButtonText;

            if (!this._isNullOrUndefined(options.drawButtonEnabled)) this.drawButtonEnabled = options.drawButtonEnabled;
            if (!this._isNullOrUndefined(options.clearButtonEnabled)) this.clearButtonEnabled = options.clearButtonEnabled;
            if (!this._isNullOrUndefined(options.undoButtonEnabled)) this.undoButtonEnabled = options.undoButtonEnabled;
            if (!this._isNullOrUndefined(options.saveDataButtonEnabled)) this.saveDataButtonEnabled = options.saveDataButtonEnabled;

            if (!this._isNullOrUndefined(options.lineWidthList)) this.lineWidths = options.lineWidthList;
            if (!this._isNullOrUndefined(options.colorList)) this.colors = options.colorList;
            if (!this._isNullOrUndefined(options.iconList)) this.icons = options.iconList;
            if (!this._isNullOrUndefined(options.fontSizeList)) this.fontSizes = options.fontSizeList;
        }
    }

    private _isNullOrUndefined(property: any): boolean {
        return property === null || property === undefined;
    }

    private _isSupportTouch(): void {
        if ('ontouchstart' in window || 'ontouchstart' in document) {
            this._supportTouch = true;
        } else if(window.navigator.msPointerEnabled) {
            this._supportTouch = true;
        } else {
            this._supportTouch = false;
        }
    }

    private _initCanvasEventListeners(): void {
        window.addEventListener("keydown", this._canvasKeyDown.bind(this), false);
    }

    ngOnChanges(changes: any): void {
        if (changes.options && changes.options.currentValue != changes.options.previousValue) {
            this._initInputsFromOptions(changes.options.currentValue);
        }
    }

    private _loadImageAndCanvas(callbackFn?: any): void {
        this.imageElement.nativeElement.addEventListener("load", () => {
            this._calculateCanvasWidthAndHeight();
            callbackFn && callbackFn();
        });
    }

    private _calculateCanvasWidthAndHeight(): void {
        let image = this.imageElement.nativeElement;

        let width = image.width;
        let orgWidth = image.naturalWidth;
        let orgHeight = image.naturalHeight;

        let radius = width / orgWidth;
        radius = Math.floor(radius * 100) / 100;

        this.canvasWidth = orgWidth * radius;
        this.canvasHeight = orgHeight * radius;
    }

    clearCanvasLocal(): void {
        this.clearCanvas();
        this.onClear.emit(true);
    }

    clearCanvas(): void {
        this._removeCanvasData();
    }

    private _removeCanvasData(): void {
        this._clientDragging = false;
        this._redrawBackground();
    }

    private _redrawBackground(): void {
        this.drawComponent.redrawBackground();
        this.patternComponent.redrawBackground();
        this.textComponent.redrawBackground();
        this.imageComponent.redrawBackground();
    }

    toggleTool(type: number) {
        this.toolType = type;
    }

    getCurrentType(type: number): boolean {
        if(type === this.toolType) {
            return true;
        } else {
            return false;
        }
    }

    changeColor(newStrokeColor: string): void {
        this.strokeColor = newStrokeColor;
    }

    changeLineWidth(newLineWidth: number): void {
        this.lineWidth = newLineWidth;
    }

    changeShape(newShape: number): void {
        this.shape = newShape;
    }

    changeFontSize(newSize: number): void {
        this.fontSize = newSize;
    }

    changeIcon(newIcon: number): void {
        this.icon = newIcon;
    }

    changeText(txt: string): void {
        this.isTexting = false;
        this._onTextComplete.emit(txt);
    }

    undoLocal(): void {
        this.undo();
        this.onUndo.emit();
    }

    undo(): void {
        if (!this._undoStack.length) return;

        let update = this._undoStack.pop();
        this._undoCanvas(update);
    }

    private _undoCanvas(update: MarkupToolUpdate): void {
        switch(update.toolType) {
            case 1:
                this.drawComponent.remove(update.UUID);
                this.drawComponent.redrawBackground(() => {
                    this.drawComponent.getHistory()
                        .forEach((update: MarkupToolUpdate) => {
                            this._draw(update, true);
                        });
                });
                break;
            case 2:
                this.textComponent.remove(update.UUID);
                break;
            case 3:
                this.patternComponent.remove(update.UUID);
                break;
            case 4:
                this.imageComponent.remove(update.UUID);
                break;
        }
    }

    canvasUserEvents(event: any): void {
        if ((event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'mouseout') && !this._clientDragging) {
            return;
        }

        if (this._supportTouch && (event.type === 'mousedown' || event.type === 'mousemove' || event.type === 'mouseup' || event.type === 'mouseout')) {
            return;
        }

        let update: MarkupToolUpdate;
        let updateType: number;
        let eventPosition: EventPositionPoint = this._getCanvasEventPosition(event);

        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                this._clientDragging = true;
                this._lastUUID = eventPosition.x + eventPosition.y + Math.random().toString(36);
                updateType = UPDATE_TYPE.start;
                break;
            case 'mousemove':
            case 'touchmove':
                if (!this._clientDragging) {
                    return;
                }
                updateType = UPDATE_TYPE.drag;
                break;
            case 'touchcancel':
            case 'mouseup':
            case 'touchend':
            case 'mouseout':
                this._clientDragging = false;
                updateType = UPDATE_TYPE.stop;
                break;
        }

        update = new MarkupToolUpdate(eventPosition.x, eventPosition.y, updateType, this._lastUUID, this.toolType, this.strokeColor, this.lineWidth, this.shape, this.fontSize);
        this._draw(update);
    }

    private _getCanvasEventPosition(eventData: any): EventPositionPoint {
        let canvasBoundingRect = this.drawComponent.context.canvas.getBoundingClientRect();

        let hasTouches = (eventData.touches && eventData.touches.length) ? eventData.touches[0] : null;
        if (!hasTouches)
            hasTouches = (eventData.changedTouches && eventData.changedTouches.length) ? eventData.changedTouches[0] : null;

        let event = hasTouches ? hasTouches : eventData;

        return {
            x: event.clientX - canvasBoundingRect.left,
            y: event.clientY - canvasBoundingRect.top
        }
    }

    private _canvasKeyDown(event: any): void {
        if (event.ctrlKey || event.metaKey) {
            if (event.keyCode === 90 && this.undoButtonEnabled) {
                event.preventDefault();
                this.undo();
            }
        }
    }

    private _draw(update: MarkupToolUpdate, isHistory?: boolean): void {
        switch(update.toolType) {
            case 1:
                if(!isHistory) {
                    this.drawComponent.addHistory(update);
                }
                if (update.type === UPDATE_TYPE.start) {
                    this.drawComponent.draw(update);
                } else if (update.type === UPDATE_TYPE.drag) {
                    let lastPosition = this._lastPositionForUUID[update.UUID];
                    this.drawComponent.draw(update, lastPosition);
                } else if (update.type === UPDATE_TYPE.stop) {
                    if(!isHistory) this._undoStack.push(update);
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;

            case 2:
                if (update.type === UPDATE_TYPE.start) {
                    this.textComponent.canMove(update);
                    this.textComponent.start(update);
                } else if (update.type === UPDATE_TYPE.drag) {
                    this.textComponent.move(update);
                } else if (update.type === UPDATE_TYPE.stop) {
                    if(!this.textComponent.isMoving) {
                        this.isTexting = true;
                        let done = this._onTextComplete.subscribe(text => {
                            update.text = text;
                            if(text) {
                                this.textComponent.add(update);
                                if(!isHistory) this._undoStack.push(update);
                            } else {
                                this.textComponent.remove(update.UUID);
                            }
                            done.unsubscribe();
                        });
                    } else {
                        this.textComponent.move(update);
                        this.textComponent.isMoving = false;
                    }
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;

            case 3:
                if (update.type === UPDATE_TYPE.start) {
                    if(this.shape < 3) {
                        this.patternComponent.canMove(update);
                    }
                    this.patternComponent.start(update);
                } else if (update.type === UPDATE_TYPE.drag) {
                   let lastPosition = this._lastPositionForUUID[update.UUID];
                   this.patternComponent.move(update, lastPosition);
                } else if (update.type === UPDATE_TYPE.stop) {
                    if(!this.patternComponent.isMoving) {
                        this.patternComponent.add(update);
                        if(!isHistory) this._undoStack.push(update);
                    } else {
                        this.patternComponent.move(update);
                        this.patternComponent.remove(update.UUID);
                        this.patternComponent.isMoving = false;
                    }
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;

            case 4:
                if (update.type === UPDATE_TYPE.start) {
                    this.imageComponent.canMove(update);
                    this.imageComponent.start(update);
                } else if (update.type === UPDATE_TYPE.drag) {
                    this.imageComponent.move(update); 
                } else if (update.type === UPDATE_TYPE.stop) {
                    if(!this.imageComponent.isMoving) {
                        this.icons.forEach(e => {
                            if(this.icon === e.id) {
                                update.icon = e.url;
                                this.imageComponent.add(update);
                                if(!isHistory) this._undoStack.push(update);
                            }
                        });  
                    }
                    this.imageComponent.isMoving = false;
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;
        }

        if (update.type === UPDATE_TYPE.start || update.type === UPDATE_TYPE.drag) {
            this._lastPositionForUUID[update.UUID] = {
                x: update.x,
                y: update.y
            };
        }
    }
}
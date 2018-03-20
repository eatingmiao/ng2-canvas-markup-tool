import { EventEmitter, ElementRef, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { MarkupToolDrawComponent } from "./markup-tool-draw.component";
import { MarkupToolPatternComponent } from "./markup-tool-pattern.component";
import { MarkupToolTextComponent } from "./markup-tool-text.component";
import { MarkupToolImageComponent } from "./markup-tool-image.component";
import { MarkupToolIconEntry } from "./markup-tool-icon.component";
export interface MarkupToolOptions {
    imageUrl?: string;
    shouldDownload?: boolean;
    drawButtonEnabled?: boolean;
    drawButtonClass?: string;
    drawButtonText?: string;
    clearButtonEnabled?: boolean;
    clearButtonClass?: string;
    clearButtonText?: string;
    undoButtonEnabled?: boolean;
    undoButtonClass?: string;
    undoButtonText?: string;
    saveDataButtonEnabled?: boolean;
    saveDataButtonClass?: string;
    saveDataButtonText?: string;
    textButtonEnabled?: boolean;
    textButtonClass?: string;
    textButtonText?: string;
    patternButtonEnabled?: boolean;
    patternButtonClass?: string;
    patternButtonText?: string;
    iconButtonEnabled?: boolean;
    iconButtonClass?: string;
    iconButtonText?: string;
    lineWidthList?: Array<number>;
    colorList?: Array<string>;
    iconList?: Array<MarkupToolIconEntry>;
    fontSizeList?: Array<number>;
}
export declare class MarkupToolComponent implements OnInit, AfterViewInit, OnChanges {
    options: MarkupToolOptions;
    imageUrl: string;
    drawButtonClass: string;
    textButtonClass: string;
    iconButtonClass: string;
    patternButtonClass: string;
    clearButtonClass: string;
    undoButtonClass: string;
    saveDataButtonClass: string;
    drawButtonText: string;
    textButtonText: string;
    patternButtonText: string;
    iconButtonText: string;
    clearButtonText: string;
    undoButtonText: string;
    saveDataButtonText: string;
    drawButtonEnabled: boolean;
    textButtonEnabled: boolean;
    iconButtonEnabled: boolean;
    patternButtonEnabled: boolean;
    clearButtonEnabled: boolean;
    undoButtonEnabled: boolean;
    saveDataButtonEnabled: boolean;
    shouldDownloadDrawing: boolean;
    colors: Array<string>;
    strokeColor: string;
    lineWidths: Array<number>;
    lineWidth: number;
    icons: Array<MarkupToolIconEntry>;
    icon: number;
    fontSizes: Array<number>;
    fontSize: number;
    shape: number;
    onClear: EventEmitter<any>;
    onUndo: EventEmitter<any>;
    onSave: EventEmitter<string | Blob>;
    imageElement: ElementRef;
    canvasWidth: number;
    canvasHeight: number;
    drawComponent: MarkupToolDrawComponent;
    patternComponent: MarkupToolPatternComponent;
    textComponent: MarkupToolTextComponent;
    imageComponent: MarkupToolImageComponent;
    canvas: ElementRef;
    context: CanvasRenderingContext2D;
    toolType: number;
    private _clientDragging;
    private _lastUUID;
    private _lastPositionForUUID;
    private _undoStack;
    private _supportTouch;
    isTexting: boolean;
    private _onTextComplete;
    private _aspectRatio;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private _initInputsFromOptions(options);
    private _isNullOrUndefined(property);
    private _isSupportTouch();
    ngOnChanges(changes: any): void;
    reloadCanvas(): void;
    private _redrawHistory();
    private _loadImageAndCanvas(callbackFn?);
    private _calculateCanvasWidthAndHeight();
    clearCanvasLocal(): void;
    clearCanvas(): void;
    private _removeCanvasData();
    toggleTool(type: number): void;
    getCurrentType(type: number): boolean;
    changeColor(newStrokeColor: string): void;
    changeLineWidth(newLineWidth: number): void;
    changeShape(newShape: number): void;
    changeFontSize(newSize: number): void;
    changeIcon(newIcon: number): void;
    changeText(txt: string): void;
    undoLocal(): void;
    undo(): void;
    private _undoCanvas(update);
    canvasUserEvents(event: any): void;
    private _getCanvasEventPosition(eventData);
    private _draw(update, isHistory?);
    generateCanvasDataUrl(returnedDataType?: string, returnedDataQuality?: number): string;
    generateCanvasBlob(callbackFn: any, returnedDataType?: string, returnedDataQuality?: number): void;
    downloadCanvasImage(returnedDataType?: string, downloadData?: string | Blob): void;
    private _saveCanvasBlob(blob, returnedDataType?);
    generateCanvasData(callback: any, returnedDataType?: string, returnedDataQuality?: number): void;
    saveLocal(returnedDataType?: string): void;
    private _generateDataTypeString(returnedDataType);
}

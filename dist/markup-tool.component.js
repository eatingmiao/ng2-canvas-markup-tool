"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var markup_tool_update_model_1 = require("./markup-tool-update.model");
var markup_tool_draw_component_1 = require("./markup-tool-draw.component");
var markup_tool_pattern_component_1 = require("./markup-tool-pattern.component");
var markup_tool_text_component_1 = require("./markup-tool-text.component");
var markup_tool_image_component_1 = require("./markup-tool-image.component");
var markup_tool_template_1 = require("./markup-tool.template");
var MarkupToolComponent = (function () {
    function MarkupToolComponent() {
        this.drawButtonText = "";
        this.textButtonText = "";
        this.patternButtonText = "";
        this.iconButtonText = "";
        this.textClearButton = "";
        this.textSaveButton = "";
        this.clearButtonText = "";
        this.undoButtonText = "";
        this.saveDataButtonText = "";
        this.drawButtonEnabled = true;
        this.textButtonEnabled = true;
        this.iconButtonEnabled = true;
        this.patternButtonEnabled = true;
        this.clearButtonEnabled = true;
        this.undoButtonEnabled = false;
        this.saveDataButtonEnabled = false;
        this.shouldDownloadDrawing = true;
        this.strokeColor = 'red';
        this.lineWidth = 3;
        this.icon = 1;
        this.fontSize = 24;
        this.shape = 1;
        this.onClear = new core_1.EventEmitter();
        this.onUndo = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.toolType = 0;
        this._clientDragging = false;
        this._lastPositionForUUID = {};
        this._undoStack = [];
        this._supportTouch = false;
        this.isTexting = false;
        this._onTextComplete = new core_1.EventEmitter();
        this.onText = new core_1.EventEmitter();
        this._aspectRatio = [];
    }
    MarkupToolComponent.prototype.ngOnInit = function () {
        this._initInputsFromOptions(this.options);
    };
    MarkupToolComponent.prototype.ngAfterViewInit = function () {
        this._isSupportTouch();
        this._loadImageAndCanvas();
    };
    MarkupToolComponent.prototype._initInputsFromOptions = function (options) {
        if (options) {
            if (!this._isNullOrUndefined(options.imageUrl))
                this.imageUrl = options.imageUrl;
            if (!this._isNullOrUndefined(options.shouldDownload))
                this.shouldDownloadDrawing = options.shouldDownload;
            if (!this._isNullOrUndefined(options.drawButtonClass))
                this.drawButtonClass = options.drawButtonClass;
            if (!this._isNullOrUndefined(options.patternButtonClass))
                this.patternButtonClass = options.patternButtonClass;
            if (!this._isNullOrUndefined(options.textButtonClass))
                this.textButtonClass = options.textButtonClass;
            if (!this._isNullOrUndefined(options.iconButtonClass))
                this.iconButtonClass = options.iconButtonClass;
            if (!this._isNullOrUndefined(options.clearButtonClass))
                this.clearButtonClass = options.clearButtonClass;
            if (!this._isNullOrUndefined(options.undoButtonClass))
                this.undoButtonClass = options.undoButtonClass;
            if (!this._isNullOrUndefined(options.saveDataButtonClass))
                this.saveDataButtonClass = options.saveDataButtonClass;
            if (!this._isNullOrUndefined(options.drawButtonText))
                this.drawButtonText = options.drawButtonText;
            if (!this._isNullOrUndefined(options.textButtonText))
                this.textButtonText = options.textButtonText;
            if (!this._isNullOrUndefined(options.patternButtonText))
                this.patternButtonText = options.patternButtonText;
            if (!this._isNullOrUndefined(options.iconButtonText))
                this.iconButtonText = options.iconButtonText;
            if (!this._isNullOrUndefined(options.textClearButton))
                this.textClearButton = options.textClearButton;
            if (!this._isNullOrUndefined(options.textSaveButton))
                this.textSaveButton = options.textSaveButton;
            if (!this._isNullOrUndefined(options.clearButtonText))
                this.clearButtonText = options.clearButtonText;
            if (!this._isNullOrUndefined(options.undoButtonText))
                this.undoButtonText = options.undoButtonText;
            if (!this._isNullOrUndefined(options.saveDataButtonText))
                this.saveDataButtonText = options.saveDataButtonText;
            if (!this._isNullOrUndefined(options.drawButtonEnabled))
                this.drawButtonEnabled = options.drawButtonEnabled;
            if (!this._isNullOrUndefined(options.textButtonEnabled))
                this.textButtonEnabled = options.textButtonEnabled;
            if (!this._isNullOrUndefined(options.patternButtonEnabled))
                this.patternButtonEnabled = options.patternButtonEnabled;
            if (!this._isNullOrUndefined(options.iconButtonEnabled))
                this.iconButtonEnabled = options.iconButtonEnabled;
            if (!this._isNullOrUndefined(options.clearButtonEnabled))
                this.clearButtonEnabled = options.clearButtonEnabled;
            if (!this._isNullOrUndefined(options.undoButtonEnabled))
                this.undoButtonEnabled = options.undoButtonEnabled;
            if (!this._isNullOrUndefined(options.saveDataButtonEnabled))
                this.saveDataButtonEnabled = options.saveDataButtonEnabled;
            if (!this._isNullOrUndefined(options.lineWidthList))
                this.lineWidths = options.lineWidthList;
            if (!this._isNullOrUndefined(options.colorList))
                this.colors = options.colorList;
            if (!this._isNullOrUndefined(options.iconList))
                this.icons = options.iconList;
            if (!this._isNullOrUndefined(options.fontSizeList))
                this.fontSizes = options.fontSizeList;
        }
    };
    MarkupToolComponent.prototype._isNullOrUndefined = function (property) {
        return property === null || property === undefined;
    };
    MarkupToolComponent.prototype._isSupportTouch = function () {
        if ('ontouchstart' in window || 'ontouchstart' in document) {
            this._supportTouch = true;
        }
        else if (window.navigator.msPointerEnabled) {
            this._supportTouch = true;
        }
        else {
            this._supportTouch = false;
        }
    };
    MarkupToolComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options && changes.options.currentValue != changes.options.previousValue) {
            this._initInputsFromOptions(changes.options.currentValue);
        }
    };
    MarkupToolComponent.prototype.reloadCanvas = function () {
        if (this.toolType > 0) {
            this._calculateCanvasWidthAndHeight();
            this._isSupportTouch();
            this._redrawHistory();
            this.isTexting = false;
        }
    };
    MarkupToolComponent.prototype._redrawHistory = function () {
        var _this = this;
        var length = this._aspectRatio.length;
        var ratio = this._aspectRatio[length - 1];
        var lastRatio = this._aspectRatio[length - 2];
        if (this.drawComponent.getHistory().length) {
            this.drawComponent.redrawBackground(function () {
                _this.drawComponent.getHistory()
                    .forEach(function (update) {
                    update.x = update.x * ratio / lastRatio;
                    update.y = update.y * ratio / lastRatio;
                    setTimeout(function () {
                        _this._draw(update, true);
                    }, 100);
                });
            });
        }
        if (this.textComponent.getHistory().length) {
            this.textComponent.redrawBackground(function () {
                _this.textComponent.getHistory()
                    .forEach(function (update) {
                    update.fontSize = update.fontSize * ratio / lastRatio;
                    update.x = update.x * ratio / lastRatio;
                    update.y = update.y * ratio / lastRatio;
                    setTimeout(function () {
                        _this._draw(update, true);
                    }, 100);
                });
            });
        }
        if (this.patternComponent.getHistory().length) {
            this.patternComponent.redrawBackground(function () {
                _this.patternComponent.getHistory()
                    .forEach(function (update) {
                    update.x = update.x * ratio / lastRatio;
                    update.y = update.y * ratio / lastRatio;
                    setTimeout(function () {
                        _this._draw(update, true);
                    }, 100);
                });
            });
        }
        if (this.imageComponent.getHistory().length) {
            this.imageComponent.redrawBackground(function () {
                _this.imageComponent.getHistory()
                    .forEach(function (update) {
                    update.x = update.x * ratio / lastRatio;
                    update.y = update.y * ratio / lastRatio;
                    _this._draw(update, true);
                });
            });
        }
    };
    MarkupToolComponent.prototype._loadImageAndCanvas = function (callbackFn) {
        var _this = this;
        this.imageElement.nativeElement.addEventListener("load", function () {
            _this.context = _this.canvas.nativeElement.getContext("2d");
            _this._calculateCanvasWidthAndHeight();
            callbackFn && callbackFn();
        });
    };
    MarkupToolComponent.prototype._calculateCanvasWidthAndHeight = function () {
        var image = this.imageElement.nativeElement;
        var width = image.width;
        var height = image.height;
        var orgWidth = image.naturalWidth;
        var orgHeight = image.naturalHeight;
        var radius = width / orgWidth;
        radius = Math.floor(radius * 100) / 100;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var heightDiff = Math.abs(height - clientHeight * 0.9);
        if (height >= clientHeight && heightDiff > 50) {
            height = clientHeight * 0.9;
            radius = height / orgHeight;
            radius = Math.floor(radius * 100) / 100;
            image.width = orgWidth * radius;
            image.height = orgHeight * radius;
        }
        this._aspectRatio.push(radius);
        this.canvasWidth = orgWidth * radius;
        this.canvasHeight = orgHeight * radius;
    };
    MarkupToolComponent.prototype.clearCanvasLocal = function () {
        this.clearCanvas();
        this.onClear.emit(true);
    };
    MarkupToolComponent.prototype.clearCanvas = function () {
        this._removeCanvasData();
    };
    MarkupToolComponent.prototype._removeCanvasData = function () {
        this._undoStack = [];
        this._clientDragging = false;
        this.drawComponent.clearHistory();
        this.patternComponent.clearHistory();
        this.textComponent.clearHistory();
        this.imageComponent.clearHistory();
    };
    MarkupToolComponent.prototype.toggleTool = function (type) {
        this.toolType = type;
    };
    MarkupToolComponent.prototype.getCurrentType = function (type) {
        if (type === this.toolType) {
            return true;
        }
        else {
            return false;
        }
    };
    MarkupToolComponent.prototype.changeColor = function (newStrokeColor) {
        this.strokeColor = newStrokeColor;
    };
    MarkupToolComponent.prototype.changeLineWidth = function (newLineWidth) {
        this.lineWidth = newLineWidth;
    };
    MarkupToolComponent.prototype.changeShape = function (newShape) {
        this.shape = newShape;
    };
    MarkupToolComponent.prototype.changeFontSize = function (newSize) {
        this.fontSize = newSize;
    };
    MarkupToolComponent.prototype.changeIcon = function (newIcon) {
        this.icon = newIcon;
    };
    MarkupToolComponent.prototype.textPopoverShow = function () {
        this.isTexting = true;
        this.onText.emit(true);
    };
    MarkupToolComponent.prototype.changeText = function (txt) {
        this.isTexting = false;
        this._onTextComplete.emit(txt);
    };
    MarkupToolComponent.prototype.undoLocal = function () {
        this.undo();
        this.onUndo.emit();
    };
    MarkupToolComponent.prototype.undo = function () {
        if (!this._undoStack.length)
            return;
        var update = this._undoStack.pop();
        this._undoCanvas(update);
    };
    MarkupToolComponent.prototype._undoCanvas = function (update) {
        var _this = this;
        switch (update.toolType) {
            case 1:
                this.drawComponent.remove(update.UUID);
                this.drawComponent.redrawBackground(function () {
                    _this.drawComponent.getHistory()
                        .forEach(function (update) {
                        _this._draw(update, true);
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
    };
    MarkupToolComponent.prototype.canvasUserEvents = function (event) {
        if ((event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'mouseout') && !this._clientDragging) {
            return;
        }
        if (this._supportTouch && (event.type === 'mousedown' || event.type === 'mousemove' || event.type === 'mouseup' || event.type === 'mouseout')) {
            return;
        }
        var update;
        var updateType;
        var eventPosition = this._getCanvasEventPosition(event);
        switch (event.type) {
            case 'mousedown':
            case 'touchstart':
                this._clientDragging = true;
                this._lastUUID = eventPosition.x + eventPosition.y + Math.random().toString(36);
                updateType = markup_tool_update_model_1.UPDATE_TYPE.start;
                break;
            case 'mousemove':
            case 'touchmove':
                if (!this._clientDragging) {
                    return;
                }
                updateType = markup_tool_update_model_1.UPDATE_TYPE.drag;
                break;
            case 'touchcancel':
            case 'mouseup':
            case 'touchend':
            case 'mouseout':
                this._clientDragging = false;
                updateType = markup_tool_update_model_1.UPDATE_TYPE.stop;
                break;
        }
        update = new markup_tool_update_model_1.MarkupToolUpdate(eventPosition.x, eventPosition.y, updateType, this._lastUUID, this.toolType, this.strokeColor, this.lineWidth, this.shape, this.fontSize);
        this._draw(update);
    };
    MarkupToolComponent.prototype._getCanvasEventPosition = function (eventData) {
        var canvasBoundingRect = this.drawComponent.context.canvas.getBoundingClientRect();
        var hasTouches = (eventData.touches && eventData.touches.length) ? eventData.touches[0] : null;
        if (!hasTouches)
            hasTouches = (eventData.changedTouches && eventData.changedTouches.length) ? eventData.changedTouches[0] : null;
        var event = hasTouches ? hasTouches : eventData;
        return {
            x: event.clientX - canvasBoundingRect.left,
            y: event.clientY - canvasBoundingRect.top
        };
    };
    MarkupToolComponent.prototype._draw = function (update, isHistory) {
        var _this = this;
        switch (update.toolType) {
            case 1:
                if (!isHistory) {
                    this.drawComponent.addHistory(update);
                }
                if (update.type === markup_tool_update_model_1.UPDATE_TYPE.start) {
                    this.drawComponent.draw(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.drag) {
                    var lastPosition = this._lastPositionForUUID[update.UUID];
                    this.drawComponent.draw(update, lastPosition);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.stop) {
                    if (!isHistory)
                        this._undoStack.push(update);
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;
            case 2:
                if (!isHistory) {
                    this.textComponent.addHistory(update);
                }
                if (update.type === markup_tool_update_model_1.UPDATE_TYPE.start) {
                    this.textComponent.canMove(update);
                    this.textComponent.start(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.drag) {
                    this.textComponent.move(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.stop) {
                    if (!this.textComponent.isMoving) {
                        if (!isHistory) {
                            this.textPopoverShow();
                            var done_1 = this._onTextComplete.subscribe(function (text) {
                                update.text = text;
                                if (text) {
                                    _this.textComponent.add(update);
                                    _this._undoStack.push(update);
                                }
                                else {
                                    _this.textComponent.remove(update.UUID);
                                }
                                done_1.unsubscribe();
                            });
                        }
                        else {
                            this.textComponent.add(update);
                        }
                    }
                    else {
                        this.textComponent.move(update);
                        this.textComponent.isMoving = false;
                    }
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;
            case 3:
                if (!isHistory) {
                    this.patternComponent.addHistory(update);
                }
                if (update.type === markup_tool_update_model_1.UPDATE_TYPE.start) {
                    if (this.shape < 3) {
                        this.patternComponent.canMove(update);
                    }
                    this.patternComponent.start(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.drag) {
                    var lastPosition = this._lastPositionForUUID[update.UUID];
                    this.patternComponent.move(update, lastPosition);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.stop) {
                    if (!this.patternComponent.isMoving) {
                        this.patternComponent.add(update);
                        if (!isHistory)
                            this._undoStack.push(update);
                    }
                    else {
                        this.patternComponent.move(update);
                        this.patternComponent.remove(update.UUID);
                        this.patternComponent.isMoving = false;
                    }
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;
            case 4:
                if (update.type === markup_tool_update_model_1.UPDATE_TYPE.start) {
                    this.imageComponent.canMove(update);
                    this.imageComponent.start(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.drag) {
                    this.imageComponent.move(update);
                }
                else if (update.type === markup_tool_update_model_1.UPDATE_TYPE.stop) {
                    if (!this.imageComponent.isMoving) {
                        this.icons.forEach(function (e) {
                            if (_this.icon === e.id) {
                                update.icon = e.url;
                                _this.imageComponent.add(update);
                                if (!isHistory) {
                                    _this._undoStack.push(update);
                                    _this.imageComponent.addHistory(update);
                                }
                            }
                        });
                    }
                    else {
                        this.imageComponent.move(update);
                        this.imageComponent.remove(update.UUID);
                        this.imageComponent.isMoving = false;
                    }
                    delete this._lastPositionForUUID[update.UUID];
                }
                break;
        }
        if (update.type === markup_tool_update_model_1.UPDATE_TYPE.start || update.type === markup_tool_update_model_1.UPDATE_TYPE.drag) {
            this._lastPositionForUUID[update.UUID] = {
                x: update.x,
                y: update.y
            };
        }
    };
    MarkupToolComponent.prototype.generateCanvasDataUrl = function (returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        return this.context.canvas.toDataURL(returnedDataType, returnedDataQuality);
    };
    MarkupToolComponent.prototype.generateCanvasBlob = function (callbackFn, returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        this.context.canvas.toBlob(function (blob) {
            callbackFn && callbackFn(blob, returnedDataType);
        }, returnedDataType, returnedDataQuality);
    };
    MarkupToolComponent.prototype.downloadCanvasImage = function (returnedDataType, downloadData) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', downloadData ? downloadData : this.generateCanvasDataUrl(returnedDataType));
            downloadLink.setAttribute('download', "canvas_drawing_" + new Date().valueOf() + this._generateDataTypeString(returnedDataType));
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        else {
            // IE-specific code
            if (downloadData) {
                this._saveCanvasBlob(downloadData, returnedDataType);
            }
            else {
                this.generateCanvasBlob(this._saveCanvasBlob.bind(this), returnedDataType);
            }
        }
    };
    MarkupToolComponent.prototype._saveCanvasBlob = function (blob, returnedDataType) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        window.navigator.msSaveOrOpenBlob(blob, "canvas_drawing_" + new Date().valueOf() + this._generateDataTypeString(returnedDataType));
    };
    MarkupToolComponent.prototype.generateCanvasData = function (callback, returnedDataType, returnedDataQuality) {
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        if (returnedDataQuality === void 0) { returnedDataQuality = 1; }
        if (window.navigator.msSaveOrOpenBlob === undefined) {
            callback && callback(this.generateCanvasDataUrl(returnedDataType, returnedDataQuality));
        }
        else {
            this.generateCanvasBlob(callback, returnedDataType, returnedDataQuality);
        }
    };
    MarkupToolComponent.prototype.saveLocal = function (returnedDataType) {
        var _this = this;
        if (returnedDataType === void 0) { returnedDataType = "image/png"; }
        var image = this.imageElement.nativeElement;
        var orgWidth = image.naturalWidth;
        var orgHeight = image.naturalHeight;
        this.canvas.nativeElement.width = orgWidth;
        this.canvas.nativeElement.height = orgHeight;
        this.context.drawImage(image, 0, 0, orgWidth, orgHeight);
        var draw = this.drawComponent.getLayer().canvas.nativeElement;
        this.context.drawImage(draw, 0, 0, orgWidth, orgHeight);
        this.patternComponent.getLayer().forEach(function (l) {
            var pattern = l.canvas.nativeElement;
            _this.context.drawImage(pattern, 0, 0, orgWidth, orgHeight);
        });
        this.textComponent.getLayer().forEach(function (l) {
            var text = l.canvas.nativeElement;
            _this.context.drawImage(text, 0, 0, orgWidth, orgHeight);
        });
        this.imageComponent.getLayer().forEach(function (l) {
            var img = l.canvas.nativeElement;
            _this.context.drawImage(img, 0, 0, orgWidth, orgHeight);
        });
        setTimeout(function () {
            _this.generateCanvasData(function (generatedData) {
                _this.onSave.emit(generatedData);
                if (_this.shouldDownloadDrawing) {
                    _this.downloadCanvasImage(returnedDataType, generatedData);
                }
            });
        });
    };
    MarkupToolComponent.prototype._generateDataTypeString = function (returnedDataType) {
        if (returnedDataType) {
            return "." + returnedDataType.split('/')[1];
        }
        return "";
    };
    MarkupToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'markup-tool',
                    template: markup_tool_template_1.DEFAULT_TEMPLATE,
                    styles: [markup_tool_template_1.DEFAULT_STYLES]
                },] },
    ];
    /** @nocollapse */
    MarkupToolComponent.ctorParameters = function () { return []; };
    MarkupToolComponent.propDecorators = {
        "options": [{ type: core_1.Input },],
        "imageUrl": [{ type: core_1.Input },],
        "drawButtonClass": [{ type: core_1.Input },],
        "textButtonClass": [{ type: core_1.Input },],
        "iconButtonClass": [{ type: core_1.Input },],
        "patternButtonClass": [{ type: core_1.Input },],
        "clearButtonClass": [{ type: core_1.Input },],
        "undoButtonClass": [{ type: core_1.Input },],
        "saveDataButtonClass": [{ type: core_1.Input },],
        "drawButtonText": [{ type: core_1.Input },],
        "textButtonText": [{ type: core_1.Input },],
        "patternButtonText": [{ type: core_1.Input },],
        "iconButtonText": [{ type: core_1.Input },],
        "textClearButton": [{ type: core_1.Input },],
        "textSaveButton": [{ type: core_1.Input },],
        "clearButtonText": [{ type: core_1.Input },],
        "undoButtonText": [{ type: core_1.Input },],
        "saveDataButtonText": [{ type: core_1.Input },],
        "drawButtonEnabled": [{ type: core_1.Input },],
        "textButtonEnabled": [{ type: core_1.Input },],
        "iconButtonEnabled": [{ type: core_1.Input },],
        "patternButtonEnabled": [{ type: core_1.Input },],
        "clearButtonEnabled": [{ type: core_1.Input },],
        "undoButtonEnabled": [{ type: core_1.Input },],
        "saveDataButtonEnabled": [{ type: core_1.Input },],
        "shouldDownloadDrawing": [{ type: core_1.Input },],
        "colors": [{ type: core_1.Input },],
        "lineWidths": [{ type: core_1.Input },],
        "icons": [{ type: core_1.Input },],
        "fontSizes": [{ type: core_1.Input },],
        "onClear": [{ type: core_1.Output },],
        "onUndo": [{ type: core_1.Output },],
        "onSave": [{ type: core_1.Output },],
        "imageElement": [{ type: core_1.ViewChild, args: ['image',] },],
        "drawComponent": [{ type: core_1.ViewChild, args: [markup_tool_draw_component_1.MarkupToolDrawComponent,] },],
        "patternComponent": [{ type: core_1.ViewChild, args: [markup_tool_pattern_component_1.MarkupToolPatternComponent,] },],
        "textComponent": [{ type: core_1.ViewChild, args: [markup_tool_text_component_1.MarkupToolTextComponent,] },],
        "imageComponent": [{ type: core_1.ViewChild, args: [markup_tool_image_component_1.MarkupToolImageComponent,] },],
        "canvas": [{ type: core_1.ViewChild, args: ['exportCanvas',] },],
    };
    return MarkupToolComponent;
}());
exports.MarkupToolComponent = MarkupToolComponent;
//# sourceMappingURL=markup-tool.component.js.map
export const UPDATE_TYPE = {
    "start": 0,
    "drag": 1,
    "stop": 2
};

export interface EventPositionPoint {
    x: number,
    y: number
}

export class MarkupToolUpdate {
    private _x: number;
    private _y: number;
    private _type: number;
    private _uuid: string;
    private _toolType: number;
    private _strokeColor: string;
    private _lineWidth: number;
    private _shape: number;
    private _fontSize: number;
    private _icon: string;

    private _shapeWidth: number;
    private _text: string;
    
    constructor(
        x: number, 
        y: number,
        type: number, 
        uuid?: string,
        toolType?: number,
        strokeColor?: string, 
        lineWidth?: number, 
        shape?: number,
        fontSize?: number,
        icon?: string,
        shapeWidth?: number,
        text?: string
        ) {
        this._x = x;
        this._y = y;
        this._type = type; 
        this._uuid = uuid;
        this._toolType = toolType;
        this._strokeColor = strokeColor;
        this._lineWidth = lineWidth;
        this._shape = shape;
        this._fontSize = fontSize;
        this._icon = icon;
        this._shapeWidth = shapeWidth | 0;
        this._text = text;
    }

    set x(newX: number) {
        this._x = newX;
    }
    get x() {
        return this._x;
    }

    set y(newY: number) {
        this._y = newY;
    }
    get y() {
        return this._y;
    }    

    get type() {
        return this._type;
    }

    set UUID(uuid: string) {
        this._uuid = uuid;
    }
    get UUID() {
        return this._uuid;
    }

    set toolType(toolType: number) {
        this._toolType = toolType;
    }
    get toolType() {
        return this._toolType;
    }

    set strokeColor(strokeColor: string) {
        this._strokeColor = strokeColor;
    }
    get strokeColor() {
        return this._strokeColor;
    }

    set lineWidth(lineWidth: number) {
        this._lineWidth = lineWidth;
    }
    get lineWidth() {
        return this._lineWidth;
    }

    set shape(shape: number) {
        this._shape = shape;
    }
    get shape() {
        return this._shape;
    }

    set fontSize(size: number) {
        this._fontSize = size;
    }
    get fontSize() {
        return this._fontSize;
    }

    set icon(icon: string) {
        this._icon = icon;
    }
    get icon() {
        return this._icon;
    }

    set shapeWidth(width: number) {
        this._shapeWidth = width;
    }
    get shapeWidth() {
        return this._shapeWidth;
    }

    set text(text: string) {
        this._text = text;
    }
    get text() {
        return this._text;
    }
}

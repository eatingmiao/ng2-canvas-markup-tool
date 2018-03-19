export declare const UPDATE_TYPE: {
    "start": number;
    "drag": number;
    "stop": number;
};
export interface EventPositionPoint {
    x: number;
    y: number;
}
export declare class MarkupToolUpdate {
    private _x;
    private _y;
    private _type;
    private _uuid;
    private _toolType;
    private _strokeColor;
    private _lineWidth;
    private _shape;
    private _fontSize;
    private _icon;
    private _shapeWidth;
    private _text;
    constructor(x: number, y: number, type: number, uuid?: string, toolType?: number, strokeColor?: string, lineWidth?: number, shape?: number, fontSize?: number, icon?: string, shapeWidth?: number, text?: string);
    x: number;
    y: number;
    readonly type: number;
    UUID: string;
    toolType: number;
    strokeColor: string;
    lineWidth: number;
    shape: number;
    fontSize: number;
    icon: string;
    shapeWidth: number;
    text: string;
}

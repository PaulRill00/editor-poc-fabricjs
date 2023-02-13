import {fabric} from 'fabric';
import { Bounds } from './Bounds';

export class Editor {
    private boundLines: fabric.Line[] = [];

    constructor(private readonly canvas: fabric.Canvas, private readonly bounds: Bounds) {
        this.createBoundingLayer();
    }

    getCanvas(): fabric.Canvas {
        return this.canvas;
    }

    getBounds(): Bounds {
        return this.bounds;
    }

    protected createBoundingLayer() {
        const inset = this.bounds.getInsetBounds();

        this.boundLines.push(new fabric.Line([
            inset.x, inset.y, // top left
            this.canvas.getWidth() - inset.x, inset.y, // top right
        ], {
            strokeDashArray: [8, 7],
            stroke: 'green',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            this.canvas.getWidth() - inset.x, inset.y, // top right
            this.canvas.getWidth() - inset.x, this.canvas.getHeight() - inset.y, // bottom right
        ], {
            strokeDashArray: [8, 7],
            stroke: 'green',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            this.canvas.getWidth() - inset.x, this.canvas.getHeight() - inset.y, // bottom right
            inset.x, this.canvas.getHeight() - inset.y, // bottom left
        ], {
            strokeDashArray: [8, 7],
            stroke: 'green',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            inset.x, this.canvas.getHeight() - inset.y, // bottom left
            inset.x, inset.y // top left again
        ], {
            strokeDashArray: [8, 7],
            stroke: 'green',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            0, 0, // top left
            this.canvas.getWidth() - 1, 0, // top right
        ], {
            strokeDashArray: [8, 7],
            stroke: 'red',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            this.canvas.getWidth() - 1, 0, // top right
            this.canvas.getWidth() - 1, this.canvas.getHeight(), // bottom right
        ], {
            strokeDashArray: [8, 7],
            stroke: 'red',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            this.canvas.getWidth() - 1, this.canvas.getHeight() - 1, // bottom right
            0, this.canvas.getHeight() - 1, // bottom left
        ], {
            strokeDashArray: [8, 7],
            stroke: 'red',
            selectable: false
        }));

        this.boundLines.push(new fabric.Line([
            0, this.canvas.getHeight() - 1, // bottom left
            0, 0,// top left again
        ], {
            strokeDashArray: [8, 7],
            stroke: 'red',
            selectable: false
        }));

        this.canvas.add(...this.boundLines);
    }

    toggleBoundingLayer() {
        this.boundLines.forEach(x => x.visible = !x.visible);
        this.canvas.renderAll();
    }
}
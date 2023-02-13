import { fabric } from "fabric";

export class Bounds {
    constructor(private readonly canvas: fabric.Canvas) {}

    getInsetBounds(): { x: number, y: number; } {
        return { x: 10, y: 10 };
    }

    addOnDragOuterBounds(element: fabric.Object) {
        this.addOnDragBounds(element, 0, 0);
    }

    addOnDragInsetBounds(element: fabric.Object) {
        this.addOnDragBounds(element, this.getInsetBounds().x, this.getInsetBounds().y);
    }

    private addOnDragBounds(element: fabric.Object, insetX: number, insetY: number) {
        const minY = insetY;
        const maxY = (this.canvas.height ?? 0) - insetY;
        const minX = insetX;
        const maxX = (this.canvas.width ?? 0) - insetX;

        this.canvas.on('object:moving', function(options) {
            if (options.target !== element) return;

            const width = element.width ?? 0;
            const height = element.height ?? 0;

            let currentX = element.left ?? 0;
            let currentY = element.top ?? 0;

            if (currentX < minX) currentX = minX;
            if (currentX + width > maxX) currentX = maxX - width;
            if (currentY < minY) currentY = minY;
            if (currentY + height > maxY) currentY = maxY - height;

            options.target.set({
                left: currentX,
                top: currentY
            }).setCoords();
        });
    }
}

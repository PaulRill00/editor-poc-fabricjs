import { fabric } from 'fabric';
import { Editor } from "./Editor";

type BoundOptions = {
    innerBounds?: boolean;
    outerBounds?: boolean;
}

export class ElementBuilder {
    constructor(private readonly editor: Editor) {}

    addRect({ innerBounds, outerBounds, ...options }: fabric.IRectOptions & BoundOptions) {
        const rect = new fabric.Rect(options);

        if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(rect);
        if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(rect);

        this.editor.getCanvas().add(rect);
    }

    addImage({ innerBounds, outerBounds, src, ...options }: Omit<fabric.IImageOptions, 'image'> & BoundOptions & { src: string }) {
        const imageElement = new Image();

        const image = new fabric.Image(imageElement, options);
        imageElement.src = src;

        if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(image);
        if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(image);

        this.editor.getCanvas().add(image);

        console.log('help?');
    }

    addText({ innerBounds, outerBounds, text, ...options }: fabric.ITextOptions & BoundOptions & { text: string }) {
        const textElement = new fabric.Textbox(text, options);

        if (innerBounds) this.editor.getBounds().addOnDragInsetBounds(textElement);
        if (outerBounds) this.editor.getBounds().addOnDragOuterBounds(textElement);

        this.editor.getCanvas().add(textElement);
    } 
}
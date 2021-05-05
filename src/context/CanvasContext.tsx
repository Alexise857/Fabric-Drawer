import React, {createContext, ReactNode, useState} from 'react';
import {fabric} from 'fabric';
import {nanoid} from "nanoid";

interface IProps {
    children: ReactNode;
}

interface Paper {
    id: string;
    instance: fabric.Canvas | null;
}

interface CanvasContext {
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas) => void;
    canvasInstances: Paper[],
    setCanvasInstances: (canvas: Paper[]) => void;
    canvasIds: string[];
    setCanvasIds: (id: string[]) => void
}

export const CanvasContext = createContext<CanvasContext>({
    canvas: null,
    setCanvas: () => {
    },
    canvasInstances: [],
    setCanvasInstances: () => {
    },
    canvasIds: [],
    setCanvasIds: () => {
    }
});

export const CanvasProvider: any = ({children}: IProps) => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [canvasInstances, setCanvasInstances] = useState<Paper[]>([]);
    const [canvasIds, setCanvasIds] = useState<string[]>([nanoid()]);
    const context = {canvas, setCanvas, canvasInstances, setCanvasInstances, canvasIds, setCanvasIds}

    return (
        <CanvasContext.Provider value={context}>
            {children}
        </CanvasContext.Provider>
    );
};



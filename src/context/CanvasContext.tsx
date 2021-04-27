import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {fabric} from 'fabric';

interface IProps {
    children: ReactNode;
}

interface CanvasContext {
    canvas: fabric.Canvas | null;
    setCanvas: (canvas: fabric.Canvas) => void;
}

export const CanvasContext = createContext<CanvasContext>({
    canvas: null,
    setCanvas: () => {
    },
});

export const CanvasProvider: any = ({children}: IProps) => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const context = {canvas, setCanvas}

    return (
        <CanvasContext.Provider value={context}>
            {children}
        </CanvasContext.Provider>
    );
};



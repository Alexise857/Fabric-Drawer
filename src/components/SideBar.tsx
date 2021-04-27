//@ts-nocheck
import React, {useContext} from "react";
import {CanvasContext} from "../context/CanvasContext";
import {fabric} from "fabric";

function SideBar() {
    const {canvas} = useContext(CanvasContext);
    console.log({canvas});
    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 50,
            fill: '#000',
        });
        canvas?.add(circle);
    };
    const addRect = () => {
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: '#000',
        });
        canvas?.add(rect);
    };

    const undo = () => {
        canvas?.undo();
    };
    const redo = () => {
        canvas?.redo();
    };

    const zoomIn = () => {
        if (canvas) {
            const currentZoom = canvas.getZoom();
            const updatedZoom = currentZoom + 0.1;
            canvas.setZoom(updatedZoom);
        }
    };
    const zoomOut = () => {
        if (canvas) {
            const currentZoom = canvas.getZoom();
            const updatedZoom = currentZoom - 0.1;
            canvas.setZoom(updatedZoom);
        }
    };

    return (
        <div>
            <button onClick={addCircle}> Add Circle</button>
            <button onClick={addRect}> Add Rect</button>
            <button onClick={undo}>Redo</button>
            <button onClick={redo}>Undo</button>
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={zoomOut}>Zoom Out</button>
        </div>
    );
}

export default SideBar;

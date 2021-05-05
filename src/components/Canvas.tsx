import React, {useCallback, useContext, useEffect, useState} from "react";
import {CanvasContext} from "../context/CanvasContext";
import {fabric} from "fabric";
import "fabric-history";
import {nanoid} from "nanoid";
import "./components.style.css"

interface Paper {
  id: string;
  instance: fabric.Canvas | null;
}

function Canvas() {

    const {canvas, setCanvas, canvasInstances, setCanvasInstances, canvasIds, setCanvasIds} = useContext(CanvasContext);

  useEffect(() => {
    createcanvasInstances();
  }, [canvasIds]);

  const createcanvasInstances = useCallback(() => {
    const newInstances: Paper[] = [];
    canvasIds.forEach((paperId) => {
      const existingPaperInstance = canvasInstances.find(
          (paperInstance) => paperInstance.id === paperId
      );
      if (!existingPaperInstance) {
        const newCanvasInstance = new fabric.Canvas(paperId, {
          backgroundColor: "#fff",
          width: 600,
          height: 400,
          //@ts-ignore
          id: nanoid(),
        });
        newInstances.push({
          id: paperId,
          instance: newCanvasInstance,
        });
        console.log({newInstances});
      }
    });
    setCanvasInstances(canvasInstances.concat(newInstances));
  }, [canvasInstances, canvasIds]);

  const setCanvasInstance = useCallback(
      (canvasId) => {
        const selectedInstance = canvasInstances.find(
            (canvasInstance) => canvasInstance.id === canvasId
        );
        //@ts-ignore
        const currentSelectedId = canvas?.id;

        if (selectedInstance) {
          if (currentSelectedId !== canvasId) {
            //@ts-ignore
            setCanvas(null);
            //@ts-ignore
            setCanvas(selectedInstance?.instance);
          } else if (selectedInstance) {
            //@ts-ignore
            setCanvas(null);
            console.log('setting canvas')
            //@ts-ignore
            setCanvas(selectedInstance.instance);
          } else {
            console.log('setting null')
            //@ts-ignore
            setCanvas(null);
          }
        }
      },
      [canvas, canvasInstances]
  );

  const addPaper = useCallback(() => {
    setCanvasIds(canvasIds.concat(nanoid()));
  }, [canvasIds]);

  const renderCanvases = () => {
    return canvasIds.map((canvasIds) => (
        <div
            key={canvasIds}
            className="canvas-container"
            onClick={() => setCanvasInstance(canvasIds)}
        >
            <canvas id={canvasIds} style={{border: '2px #000 solid'}}/>
        </div>
    ));
  };

  return (
      <div style={{margin: 'auto'}}>
          {renderCanvases()}
          <button onClick={addPaper} className="control">
              Add Canvas
          </button>
      </div>
  );
}

export default Canvas;

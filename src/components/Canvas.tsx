import React, {useCallback, useContext, useEffect, useState} from "react";
import {CanvasContext} from "../context/CanvasContext";
import {fabric} from "fabric";
import "fabric-history";
import {nanoid} from "nanoid";

interface Paper {
  id: string;
  instance: fabric.Canvas | null;
}

function Canvas() {
  const {canvas, setCanvas} = useContext(CanvasContext);

  const [canvasIds, setCanvasIds] = useState<string[]>([nanoid()]);
  const [canvasInstances, setCanvasInstances] = useState<Paper[]>([]);

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
        console.log({selectedInstance});
        console.log({currentSelectedId});
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
          <canvas id={canvasIds}/>
        </div>
    ));
  };

  return (
      <div>
        {renderCanvases()}

        <div onClick={addPaper} className="control">
          Add Canvas
        </div>
      </div>
  );
}

export default Canvas;

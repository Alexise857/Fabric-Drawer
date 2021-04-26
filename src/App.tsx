import React, {useEffect, useState, useCallback} from "react";

import {fabric} from "fabric";

import "./App.css";

function App() {

  const [canvasInstances, setCanvasInstances] = useState([]);
  const [canvasIds, setCanvasIds] = useState<string[]>([]);
  const [canvas, setCanvas] = useState<any | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#050A30",
    });
  }, []);

  const addMoreCanvas = () => {

    let content = document.getElementById("app");
    const newcanvas = document.createElement("canvas");
    content?.appendChild(newcanvas);
    let fabricCanvasObj = new fabric.Canvas(newcanvas, {
      backgroundColor: getRandomColor(),
    });

    console.log({});
  };

  function getRandomColor() {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  return (
      <div className="App">
        <div id="app">
          <canvas id="canvas"/>
        </div>

        <button
            onClick={() => {
              addMoreCanvas();
            }}
        >
          Add more canvas
        </button>
      </div>
  );
}

export default App;

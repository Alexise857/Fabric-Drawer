import React from "react";

import "./App.css";
import {CanvasProvider} from "./context/CanvasContext";
import Canvas from "./components/Canvas";
import SideBar from "./components/SideBar";

function App() {

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  };

  return (
      <CanvasProvider>
        <div className="container">
          <div className="sidebar">
            <SideBar/>
          </div>

          <div className="editor">
            <Canvas/>
          </div>

        </div>
      </CanvasProvider>
  );
}

export default App;

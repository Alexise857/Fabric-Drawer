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
          {/*<div className="toolbar">*/}
          {/*  <nav>*/}
          {/*    <h2>NAVBAR MAKE ME STIKY</h2>*/}
          {/*  </nav>*/}
          {/*</div>*/}
          <div className="editor-content">
            <div className="sidebar">
              <SideBar/>
            </div>
            <div className="editor">
              <div className="toolbox">
                <h3>toolbox</h3>
              </div>
              <Canvas/>
              <div className="footer">
                <div>
                  <h3>I'm a footer</h3>
                  <button>Redo</button>
                  <button>Undo</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </CanvasProvider>
  );
}

export default App;

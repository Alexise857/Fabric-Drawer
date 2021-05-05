//@ts-nocheck
import React, {useCallback, useContext, useEffect, useState} from "react";
import {CanvasContext} from "../context/CanvasContext";
import {fabric} from "fabric";
import data from "../context/data.json";
import {nanoid} from "nanoid";
import NavBarData from "../data/NavBarData";
import classNames from "classnames"
import Content from "./tabs/Content";

function SideBar() {
    const {
        canvas,
        setCanvasInstances,
        canvasInstances,
        canvasIds,
        setCanvasIds,
    } = useContext(CanvasContext);

    const [updated, setUpdated] = useState(true);
    const [flag, setFlag] = useState(true);
    const [activetab, setActivetab] = useState(0);


    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 50,
            fill: "#000",
        });
        canvas?.add(circle);
    };

    const addRect = () => {
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: "#000",
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

    const exportJSON = () => {
        if (canvas) {
            const canvasJsons = [];
            canvasInstances.forEach((canvas) => {
                canvasJsons.push(canvas.instance.toJSON());
            });
            console.log({canvasJsons});
            downloadJSON(canvasJsons);
        }
    };

    const downloadJSON = async (data: Object) => {
        const json = JSON.stringify(data);
        const blob = new Blob([json], {type: "application/json"});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = "shape" + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const importJSON = () => {
        console.log('JSON')
        const newIds = [];
        for (const json of data) {
            newIds.push(nanoid())
        }
        setCanvasIds(newIds)
    }

    const clearCanvas = (() => {
        setCanvasIds([]);
        setCanvasInstances([]);
        setUpdated(!updated)
    })

    useEffect(() => {
        if (!updated) {
            importJSON();
            setFlag(!flag)
        }
    }, [updated]);

    useEffect(() => {
        if (!flag && canvasInstances.length) {
            showCanvasIds()
        }
    }, [canvasInstances]);

    const showCanvasIds = useCallback(() => {
        data.forEach((canvasImport, index) => {
            canvasInstances[index].instance.loadFromJSON(canvasImport, () => {
                canvasInstances[index].instance.requestRenderAll()
            })
        })
    }, [canvasInstances])

    const setActiveTab = (index) => {
        setActivetab(index)
    }


    return (
        <>
            {/*<button onClick={addCircle}> Add Circle</button>*/}
            {/*<button onClick={addRect}> Add Rect</button>*/}
            {/*<button onClick={undo}>Redo</button>*/}
            {/*<button onClick={redo}>Undo</button>*/}
            {/*<button onClick={zoomIn}>Zoom In</button>*/}
            {/*<button onClick={zoomOut}>Zoom Out</button>*/}
            {/*<button onClick={exportJSON}>Export JSON</button>*/}
            {/*<button onClick={clearCanvas}>Import JSON</button>*/}
            <div className="items">
                <div className="panel-items">
                    {
                        NavBarData.map((tabItem, index) => (
                            <div key={index}
                                 className={`${activetab === index ? 'active' : ''} panel-item`}
                                 onClick={() => setActiveTab(index)}>
                                <i style={{fontSize: "35px"}} className="material-icons">
                                    {tabItem.icon}
                                </i>
                                <span>{tabItem.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="content">
                <Content type={activetab}/>
            </div>
            <div className="arrow">
                <div className="c2">
                    <svg
                        width="18"
                        height="96"
                        viewBox="0 0 18 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 1.006c.001 3.501.916 9.396 4.571 12.994l.528.518c4.163 4.087 6.776 6.652 6.897 13.482H18v40c0 7.207-2.639 9.798-6.902 13.982l-.527.518C6.916 86.098 6.001 91.993 6 95.494V96H0V0h6v1.006z"
                            fill="#4d4d4d"
                        ></path>
                    </svg>
                </div>
                <div className="c1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="1.25"
                            d="M7 3.17L4.88 5.3a1 1 0 0 0 0 1.42L7 8.83"
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default SideBar;

import React, {useContext} from 'react'
import objects from "../../data/shapes";
import Icon from "@ant-design/icons"
import ShapesSVG from "../../data/shapes.svg";
import {fabric} from "fabric"
import {CanvasContext} from "../../context/CanvasContext";

function Shapes() {
    const {CircleSvg, CubeSVG, SquareSVG, TriangleSVG} = ShapesSVG();

    const {canvas} = useContext(CanvasContext);

    const addShapes = (shape: object) => {
        console.log({shape});
        // @ts-ignore
        switch (shape.type) {
            case 'rect':
                addRect();
                break;
            case 'circle':
                addCircle();
                break;
            case 'triangle':
                addTriangle();
                break;
            default:
                break;
        }
    }

    const addRect = () => {
        const rect = new fabric.Rect({
            width: 40,
            height: 40,
            fill: "#000",
        });
        canvas?.add(rect);
    }

    const addTriangle = () => {
        const triangle = new fabric.Triangle({
            width: 40,
            height: 40,
            fill: "#000",
        });
        canvas?.add(triangle);
    }

    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 20,
            fill: "#000",
        });
        canvas?.add(circle);
    }

    return (
        <>
            <div>PANEL OBJECTS</div>
            {
                objects.map((shape, index) => {
                    return <div
                        key={shape.id}
                        className="icons"
                        onClick={() => {
                            addShapes(shape)
                        }}>
                        <Icon
                            component={shape.type === "triangle"
                                ? TriangleSVG
                                : shape.type === "rect"
                                    ? SquareSVG
                                    : shape.type === "circle"
                                        ? CircleSvg
                                        : shape.type === "cube"
                                            ? CubeSVG : undefined}
                            style={{fontSize: "28px"}}
                        />

                    </div>
                })
            }
        </>
    )
}

export default Shapes

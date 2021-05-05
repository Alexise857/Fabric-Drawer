import React from 'react';
import Images from "./Images";
import Shapes from "./Shapes";


function Content({type}: any) {
    const getContent = (type: any) => {
        switch (type) {
            case 2:
                return <Images/>;
            case 5:
                return <Shapes/>;
            default :
                return <h4>Dentro del defaul</h4>
        }
    }
    return (
        <>{getContent(type)}</>
    )
}

export default Content

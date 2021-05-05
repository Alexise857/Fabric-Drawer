import React from 'react';
import Images from "./Images";


function Content({type}: any) {
    const getContent = (type: any) => {
        switch (type) {
            case 2:
                return <Images/>
            default :
                return <h4>Dentro del defaul</h4>
        }
    }
    return (
        <>{getContent(type)}</>
    )
}

export default Content

import React, {useContext, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {Input, Spin} from "antd";
import debounce from "lodash/debounce";
import {getImagesFromPixabay} from "../../services/service.provider";
import {CanvasContext} from "../../context/CanvasContext";
import {fabric} from "fabric";

function Images() {
    const {canvas} = useContext(CanvasContext);
    const [images, setImages] = useState([]);

    const debouncedSave = debounce(
        (searchText: any) => imagesService(searchText),
        1000
    );

    const handleSearchImage = (e: any) => {
        console.log({e});
        let searchText = e.target.value;
        debouncedSave(searchText);
    };

    const imagesService = async (text: string) => {
        const pixabayInfo = (await getImagesFromPixabay(text)) as any;
        console.log({data: pixabayInfo});
        setImages(pixabayInfo.hits);
    };

    const onAddCanvas = (url: string) => {
        console.log({url});
        fabric.Image.fromURL(url, (image) => {
            canvas?.add(image);
            canvas?.setActiveObject(image);
            image.center();
            // @ts-ignore
            image.scaleToWidth(canvas?.width / 8);
            image.center();
            image.viewportCenterV();
        });
    };

    return (
        <>
            <div className="content-title">
                <Input
                    size="large"
                    onChange={handleSearchImage}
                    placeholder="Search image on pixabay"
                    allowClear
                    prefix={<SearchOutlined/>}
                />
            </div>
            <div className="content-items">
                {images.length === 0 ? (
                    <Spin/>
                ) : (
                    images.map((image: any) => (
                        <img
                            key={image.id}
                            src={image.previewURL}
                            onClick={() => onAddCanvas(image.webformatURL)}
                            style={{maxHeight: "120px"}}
                            alt={image.user_id}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default Images;

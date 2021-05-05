import axios from "axios";


const PIXABAY_KEY = "20824871-7548337191755cbbef05230ed";
const PIXABAY_URL = "https://pixabay.com/api/";

export function getImagesFromPixabay(searchImage: string) {
    let encodedWord = searchImage.replace(/\s+/g, "+").toLowerCase()
    return new Promise((resolve, reject) => {
        axios
            .get(`${PIXABAY_URL}?key=${PIXABAY_KEY}&q=${encodedWord}&image_type=photo`)
            .then(response => resolve(response.data))
            .catch(reason => reject(reason))

    })
}

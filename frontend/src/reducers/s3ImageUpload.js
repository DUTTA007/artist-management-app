export default (image = [], action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return [...image, action.payload];
        default:
            return image;
    }
}
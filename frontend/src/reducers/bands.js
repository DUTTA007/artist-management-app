export default (bands = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_BANDS':
            return action.payload;
        case 'CREATE_BAND':
            return [...bands, action.payload];
        case 'UPDATE_BAND':
            return [...bands, action.payload];
        default:
            return bands;
    }
}
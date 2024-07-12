export default (artistRequests = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_ARTIST_REQUESTS':
            return action.payload;
        case 'CREATE_ARTIST_REQUEST':
            return [...artistRequests, action.payload];
        case 'UPDATE_ARTIST_REQUESTD':
            return [...artistRequests, action.payload];
        default:
            return artistRequests;
    }
}
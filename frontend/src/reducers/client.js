export default (client = [], action) => {
    switch (action.type) {
        case 'ADD_REQUEST':
            return [...client, action.payload];
        case 'UPDATE_CLIENT_LEAD':
            return [...client, action.payload];
        case 'FETCH_ALL_CLIENT_LEADS':
            return action.payload;
            
        default:
            return client;
    }
}


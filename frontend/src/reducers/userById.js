export default (userById = [], action) => {
    switch (action.type) {
        case 'FETCH_USER_BY_ID':
            return action.payload;
    
        default:
            return userById;
    }
}
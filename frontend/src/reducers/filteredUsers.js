export default (usersF = [], action) => {
    switch (action.type) { 
        case 'FETCH_FILTERED_USERS':
            return action.payload;
        default:
            return usersF;
    }
}
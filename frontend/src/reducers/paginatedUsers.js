export default (usersP = [], action) => {
    switch (action.type) { 
        case 'FETCH_PAGINATED_USERS':
            return action.payload;
        default:
            return usersP;
    }
}
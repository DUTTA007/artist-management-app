export default (users = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...users, action.payload];
        case 'LOGIN':
            return action.payload;
        case 'CHANGE_PWD':
            return action.payload;
        case 'UPDATE':
            return [...users, action.payload];
        default:
            return users;
    }
}
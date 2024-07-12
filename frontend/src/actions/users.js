import * as api from '../api';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useSelector } from "react-redux";

export const getUsers = (config) => async(dispatch) => {
    try {
        const {data} = await api.fetchUsers(config);
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }    
}

export const getPaginatedUsers = (pageNo, pageSize) => async(dispatch) => {
    try {
        const {data} = await api.paginateUsers(pageNo, pageSize);
        dispatch({type: 'FETCH_PAGINATED_USERS', payload: data});
        localStorage.setItem('paginatedData', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }    
}

export const getUserById = (config, userId) => async(dispatch) => {
    try {
        const {data} = await api.fetchUserById(config, userId);
        dispatch({type: 'FETCH_USER_BY_ID', payload: data});
        localStorage.setItem('userName', data[0].firstName);
        localStorage.setItem('userRole', data[0].role);
    } catch (error) {
        console.log(error.message);
    }    
}

export const getFilteredUsers = (filterName, filterValue) => async(dispatch) => {
    try{
        const { data } = await api.fetchFilteredUsers(filterName, filterValue);
        console.log("Filtered DATA  ", data);
        dispatch({ type: 'FETCH_FILTERED_USERS', payload: data });
        localStorage.setItem('filteredData', JSON.stringify(data));
        //window.location.reload();
    } catch (error) {
        console.log(error.message);
    }    
}

export const createUser = (user) => async(dispatch) => {
    try {
        
        const {data} = await api.createUser(user);
        dispatch({type: 'CREATE', payload: data});
        localStorage.setItem('bandMngrId', data.data.insertedId);
        
        if(data.data.acknowledged == true){
            swal({
                title: "Success!",
                text: "User registered successfully!",
                icon: "success",
                button: "OK",
              }).then(function() {
                window.location = '/';
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const login = (credData) => async(dispatch) => {
    try {
        
        const data = await api.login(credData);
        dispatch({type: 'LOGIN', payload: data});
        localStorage.setItem('token', data.data.data.token);
        localStorage.setItem('userId', data.data.data.userId);
        localStorage.setItem('email', data.data.data.email);
        if(data.status == 202){
            swal({
                title: "Success!",
                text: "User logged in successfully!",
                icon: "success",
                button: "OK",
              }).then(function() {
                window.location = '/home';
            });
        } 
    }catch (error) {
        console.log(error.message);
    }
}


export const changePwd = (credData) => async(dispatch) => {
    try {
        
        const data = await api.login(credData);
        dispatch({type: 'LOGIN', payload: data});
        
        if(data.status == 202){
            localStorage.setItem('status', data.status);
        } else if (data.data === "Invalid credentials, could not log you in!"){
            swal({
                title: "Invalid Password!",
                text: "Please enter correct password",
                icon: "error",
                button: "OK",
              });
        }

    }catch (error) {
        console.log(error.message);
    }
}

///GB
export const updateProfile = (userId, myData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(userId, myData);
        console.log("DATA  ", data);
        dispatch({type: 'UPDATE', payload: data});
        
        if(data.acknowledged === true){
            swal({
                title: "Success!",
                text: "User data updated successfully!",
                icon: "success",
                button: "OK",
            }).then(function() {
                window.location = '/home';
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

// const navigateBackToLogin = () => {
//     const navigate = useNavigate();
//     navigate('/');
// }
import * as api from '../api';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export const getAllClientLeads = (config) => async(dispatch) => {
    try {
        const {data} = await api.fetchClientLeads(config);
        dispatch({type: 'FETCH_ALL_CLIENT_LEADS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
    
}

export const addClientRequest = (requestD, config) => async(dispatch) => {
    try {
        const {data} = await api.addClientRequest(requestD, config);
        dispatch({type: 'ADD_REQUEST', payload: data});
        
        if(data.acknowledged == true){
            swal({
                title: "Success!",
                text: "Request added successfully!",
                icon: "success",
                button: "OK",
              }).then(function() {
                window.location.reload()
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const updateClientLead = (clickedId, updatedClientLeadData, config) => async(dispatch) => {
    try {
        const {data} = await api.updateLeads(clickedId, updatedClientLeadData, config);
        dispatch({type: 'UPDATE_CLIENT_LEAD', payload: data});
        if(data.acknowledged == true){
            swal({
                title: "Success!",
                icon: "success",
                button: "OK",
              }).then(function() {
                window.location.reload();
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}


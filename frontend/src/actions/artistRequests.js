import * as api from '../api';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export const getAllArtistRequests = (config) => async(dispatch) => {
    try {
        const {data} = await api.fetchArtistRequests(config);
        dispatch({type: 'FETCH_ALL_ARTIST_REQUESTS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createArtistRequest = (artistRequest, config) => async(dispatch) => {
    try {
        const {data} = await api.addArtistRequest(artistRequest, config);
        dispatch({type: 'CREATE_ARTIST_REQUEST', payload: data});

        if(data.acknowledged == true){
            swal({
                title: "Success!",
                text: "Request sent successfully!",
                icon: "success",
                button: "OK",
              }).then(function() {
                window.location = '/addrequest';
            });
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const updateArtistRequests = (artistReqId, updatedArtistReqData, config) => async(dispatch) => {
    try {
        const {data} = await api.updateArtistReq(artistReqId, updatedArtistReqData, config);
        dispatch({type: 'UPDATE_ARTIST_REQUEST', payload: data});
        
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
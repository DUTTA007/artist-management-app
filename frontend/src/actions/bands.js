import * as api from '../api';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

export const createBand = (band) => async(dispatch) => {
    try {
        const {data} = await api.createBand(band);
        dispatch({type: 'CREATE_BAND', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllBands = (config) => async(dispatch) => {
    try {
        const {data} = await api.fetchBands(config);
        dispatch({type: 'FETCH_ALL_BANDS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
    
}

///GB
export const updateBands = (bandId,myBandData) => async (dispatch) => {
    try {
        const {data} = await api.updateBand(bandId,myBandData);
        dispatch({type: 'UPDATE_BAND', payload: data});
       
    } catch (error) {
        console.log(error.message);
    }
}
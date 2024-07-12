import * as api from '../api';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useSelector } from "react-redux";

export const uploadImageToS3 = (newImage, headers) => async(dispatch) => {
    try {
        
        const {data} = await api.s3Upload(newImage, headers);
        dispatch({type: 'UPLOAD_IMAGE', payload: data});
        console.log("data in s3",data);
    } catch (error) {
        console.log(error.message);
    }
}
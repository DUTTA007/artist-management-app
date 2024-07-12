import React from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import NavigationBar from "../Components/NavigationBar";
import "../Styles/SoloEventRequests.css";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { useDispatch } from 'react-redux'
import { updateClientLead } from '../actions/client'

const EventRequests = () => {

    const myBMId = localStorage.getItem('userId');
    const client = useSelector((state) => state.client);
    var myBMLeadsArray = [];
    var i;

    for (i = 0; i < client.length; i++) {
        if (client[i].band_id === myBMId && client[i].is_approved === false && client[i].is_pending === true) {
            myBMLeadsArray.push(client[i]);
        }
    }

    const dispatch = useDispatch();
    var clickedBMId;
    var clickedDeclineBMId;

    const handleDoneBMButton = (e) => {
        clickedBMId = e.currentTarget.id;
        // localStorage.setItem('clientReqId', clickedId);
        swal({
            title: "Are you sure you want to accept the event?",
            type: "warning",
            button: "Yes, accept!",
        }).then(function () {
            const myBMField = { 'is_approved': true, 'is_pending': false }
            // e.preventDefault();

            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateClientLead(clickedBMId, myBMField, config));
        });
    }

    const handleDeclineBMButton = (e) => {
        clickedDeclineBMId = e.currentTarget.id;
        swal({
            title: "Are you sure you want to decline the event?",
            type: "warning",
            button: "Decline",
        }).then(function () {
            const myDeclineBMField = { 'is_approved': false, 'band_id': '', 'is_pending': true }
            // e.preventDefault();

            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateClientLead(clickedDeclineBMId, myDeclineBMField, config));
        });
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="soloEventRequestsPane">

                {myBMLeadsArray.map((item, index) => (

                    <div key={index} className="soloEventRequestsCardStyle">
                        <div className="coloredBandDiv"></div>
                        <div className="dateDestinationDivLeft">
                            <p id="eventP">Event Type: {myBMLeadsArray[index].type}</p>
                            <p id="eventP">Start Date: {myBMLeadsArray[index].start_date}</p>
                            <p id="eventP">End Date: {myBMLeadsArray[index].end_date}</p>

                        </div>
                        <div className="dateDestinationDivRight">
                            <p id="eventP">Contact: {myBMLeadsArray[index].contact}</p>
                            <p id="eventP">Location: {myBMLeadsArray[index].location}</p>
                            <p id="eventP">Pay: {myBMLeadsArray[index].agreed_wage}</p>
                        </div>
                        <div className="viewDetailsLinkDiv">
                            <button id={myBMLeadsArray[index]._id} onClick={handleDoneBMButton} className="doneCloseButtonStyle doneButtonStyle"><DoneIcon className="doneCloseIconStyle" /></button>
                            <button id={myBMLeadsArray[index]._id} onClick={handleDeclineBMButton} className="doneCloseButtonStyle closeButtonStyle"><CloseIcon className="doneCloseIconStyle" /></button>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    );
}

export default EventRequests;
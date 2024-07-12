import React, { useState } from "react";
import "../Styles/SideBar.css";
import "../Styles/SoloEventRequests.css";
import SideBar from "../Components/SideBar";
import NavigationBar from "../Components/NavigationBar";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { useDispatch } from 'react-redux'
import { updateClientLead } from '../actions/client'

const SoloEventRequests = () => {
    // debugger
    const myId = localStorage.getItem('userId');
    const client = useSelector((state) => state.client);
    var myLeadsArray = [];
    var i;

    for (i = 0; i < client.length; i++) {
        if (client[i].freelancer_id === myId && client[i].is_approved === false && client[i].is_pending === true) {
            myLeadsArray.push(client[i]);
        }
    }


    const dispatch = useDispatch();
    var clickedId;
    var clickedDeclineId;

    const handleDoneButton = (e) => {
        clickedId = e.currentTarget.id;
        swal({
            title: "Are you sure you want to accept the event?",
            type: "warning",
            button: "Yes, accept!",
        }).then(function () {
            const myField = { 'is_approved': true, 'is_pending': false }

            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateClientLead(clickedId, myField, config));
        });
    }

    const handleDeclineButton = (e) => {
        clickedDeclineId = e.currentTarget.id;
        swal({
            title: "Are you sure you want to decline the event?",
            type: "warning",
            button: "Decline",
        }).then(function () {
            const myDeclineField = { 'is_approved': false, 'freelancer_id': '', 'is_pending': true }
            // e.preventDefault();

            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateClientLead(clickedDeclineId, myDeclineField, config));
        });
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="soloEventRequestsPane">

                {myLeadsArray.map((item, index) => (

                    <div key={index} className="soloEventRequestsCardStyle">
                        <div className="coloredBandDiv"></div>
                        <div className="dateDestinationDivLeft">
                            <p id="eventP">Event Type: {myLeadsArray[index].type}</p>
                            <p id="eventP">Start Date: {myLeadsArray[index].start_date}</p>
                            <p id="eventP">End Date: {myLeadsArray[index].end_date}</p>

                        </div>
                        <div className="dateDestinationDivRight">
                            <p id="eventP">Contact: {myLeadsArray[index].contact}</p>
                            <p id="eventP">Location: {myLeadsArray[index].location}</p>
                            <p id="eventP">Pay: {myLeadsArray[index].agreed_wage}</p>
                        </div>
                        <div className="viewDetailsLinkDiv">
                            <button id={myLeadsArray[index]._id} onClick={handleDoneButton} className="doneCloseButtonStyle doneButtonStyle"><DoneIcon className="doneCloseIconStyle" /></button>
                            <button id={myLeadsArray[index]._id} onClick={handleDeclineButton} className="doneCloseButtonStyle closeButtonStyle"><CloseIcon className="doneCloseIconStyle" /></button>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    );
}

export default SoloEventRequests
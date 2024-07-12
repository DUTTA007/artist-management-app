import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import NavigationBar from "../Components/NavigationBar";
import "../Styles/SideBar.css";
import "../Styles/BandRequests.css";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import swal from 'sweetalert';
import { updateArtistRequests } from "../actions/artistRequests";

const BandRequests = () => {
    const artistRequests = useSelector((state) => state.artistRequests);

    const myFreeId = localStorage.getItem('userId');

    var myArtistRequestsArray = [];

    for (var i = 0; i < artistRequests.length; i++) {
        if (artistRequests[i].freelancer_id === myFreeId && artistRequests[i].is_approved === false && artistRequests[i].is_pending === true) {
            myArtistRequestsArray.push(artistRequests[i]);
        }
    }

    const dispatch = useDispatch();

    var clickedAcceptReqId;
    var clickedDeclineReqId;

    const handleArtistRequestDoneButton = (e) => {
        clickedAcceptReqId = e.currentTarget.id;
        swal({
            title: "Are you sure you want to accept the event?",
            type: "warning",
            button: "Yes, accept!",
        }).then(function () {
            const myArtistRequestAcceptFields = { 'is_approved': true, 'is_pending': false }
            // e.preventDefault();
            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateArtistRequests(clickedAcceptReqId, myArtistRequestAcceptFields, config));
        });
    }

    const handleArtistRequestDeclineButton = (e) => {
        clickedDeclineReqId = e.currentTarget.id;
        swal({
            title: "Are you sure you want to decline the event?",
            type: "warning",
            button: "Decline",
        }).then(function () {
            const myArtistRequestDeclineFields = { 'is_approved': false, 'freelancer_id': '', 'is_pending': true }
            // e.preventDefault();
            const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
            dispatch(updateArtistRequests(clickedDeclineReqId, myArtistRequestDeclineFields, config));
        });
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />

            <div id="bandRequestsPane">

                {myArtistRequestsArray.map((item, index) => (

                    <div key={index} className="bandRequestsCardStyle">
                        <div className="wrapDivBand">
                            <div className="bandColoredBandDiv"></div>
                            <div className="dateDestinationDiv">
                                <p id="eventBandR">Event Type: {myArtistRequestsArray[index].type}</p>
                                <p id="eventBandR">Start Date: {myArtistRequestsArray[index].start_date}</p>
                                <p id="eventBandR">End Date: {myArtistRequestsArray[index].end_date}</p>
                                <p id="eventBandR">Contact: {myArtistRequestsArray[index].contact}</p>
                                <p id="eventBandR">Location: {myArtistRequestsArray[index].location}</p>
                                <p id="eventBandR">Pay: {myArtistRequestsArray[index].agreed_wage}</p>
                            </div>
                        </div>
                        <div className="acceptDeclineMainDiv">
                            <button id={myArtistRequestsArray[index]._id} className="doneBandCloseButtonStyle doneBandButtonStyle" onClick={handleArtistRequestDoneButton}><DoneIcon className="doneBandCloseIconStyle" /></button>
                            <button id={myArtistRequestsArray[index]._id} className="doneBandCloseButtonStyle closeBandButtonStyle" onClick={handleArtistRequestDeclineButton}><CloseIcon className="doneBandCloseIconStyle" /></button>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default BandRequests
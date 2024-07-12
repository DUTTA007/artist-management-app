import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import NavigationBar from "../Components/NavigationBar";
import "../Styles/SideBar.css";
import "../Styles/BandRequests.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import swal from 'sweetalert';

const MyArtistRequests = () => {
    const myFreelancerId = localStorage.getItem('userId');

    const client = useSelector((state) => state.client);

    var myFreelancerEventsArray = [];

    for (var k = 0; k < client.length; k++) {
        if (client[k].freelancer_id === myFreelancerId && client[k].is_approved == true) {
            myFreelancerEventsArray.push(client[k])
        }
    }
    
    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />

            <div id="bandRequestsPane">

                {myFreelancerEventsArray.map((item, index) => (
                    <div key={index} className="bandRequestsCardStyleClient">

                        {/* { 
                                myFreelancerEventsArray[index].is_pending == true ?
                                <div className="bandColoredBandDivPink"></div> : <div className="bandColoredBandDivOrange"></div>
                            } */}
                            <div className="bandColoredBandDivBlue"></div>
                            <div className="dateDestinationDivClient">
                                
                                <b className="bStyle" id="pStyle1">Request Id: {myFreelancerEventsArray[index]._id}</b>
                                
                                <p id="pStyle1">Event Type: {myFreelancerEventsArray[index].type}</p>
                                <p id="pStyle1">Start Date: {myFreelancerEventsArray[index].start_date}</p>
                                <p id="pStyle1">End Date: {myFreelancerEventsArray[index].end_date}</p>
                                <p id="pStyle1">Location: {myFreelancerEventsArray[index].location}</p>
                                {/* { 
                                myRequestsArray[index].is_pending == true ?
                                <p id="pStyle">Status: Pending</p> : <p id="pStyle">Status: Assigned</p>
                            } */}
                            </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyArtistRequests
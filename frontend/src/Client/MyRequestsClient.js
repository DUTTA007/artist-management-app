import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import NavigationBar from "../Components/NavigationBar";
import "../Styles/SideBar.css";
import "../Styles/BandRequests.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import swal from 'sweetalert';


const MyRequestsClient = () => {

    const myClientId = localStorage.getItem('userId');

    const client = useSelector((state) => state.client);

    var myRequestsArray = [];

    for (var k = 0; k < client.length; k++) {
        if (client[k].client_id === myClientId) {
            myRequestsArray.push(client[k])
        }
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />

            <div id="bandRequestsPane">

                {myRequestsArray.map((item, index) => (
                    <div key={index} className="bandRequestsCardStyleClient">
                        {/* <div className="wrapDivBand"> */}

                        { 
                                myRequestsArray[index].is_pending == true ?
                                <div className="bandColoredBandDivPink"></div> : <div className="bandColoredBandDivOrange"></div>
                            }
                            {/* <div className="bandColoredBandDiv"></div> */}
                            <div className="dateDestinationDivClient">
                                <b className="bStyle" id="pStyle">Request Id: {myRequestsArray[index]._id}</b>
                                <p id="pStyle">Event Type: {myRequestsArray[index].type}</p>
                                <p id="pStyle">Start Date: {myRequestsArray[index].start_date}</p>
                                <p id="pStyle">End Date: {myRequestsArray[index].end_date}</p>
                                {/* <p id="pStyle">Contact: {myRequestsArray[index].contact}</p> */}
                                <p id="pStyle">Location: {myRequestsArray[index].location}</p>
                                {/* {% if myRequestsArray[index].is_pending == true %} */}
                                { 
                                myRequestsArray[index].is_pending == true ?
                                <p id="pStyle">Status: Pending</p> : <p id="pStyle">Status: Assigned</p>
                            }
                            </div>
                        {/* </div> */}

                    </div>
                ))}
            </div>
        </div>
    );

}

export default MyRequestsClient
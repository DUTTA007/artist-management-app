import React,{useState} from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/EventRequest.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import NavigationBar from "../Components/NavigationBar";
import Dropdown from 'react-dropdown'
import { updateClientLead } from "../actions/client";




const EventRequestsBand = () => {
    const client = useSelector((state) => state.client);
    const clientdispatch = useDispatch();

    const bands = useSelector((state) => state.bands);
    
    var myBand = [];
   
    for(var i=0; i<client.length; i++){
        if(client[i].requirements==='Band'&& client[i].band_id ===''){
            myBand.push(client[i])
        }
       
    }
   
   
        var myBandArray = [];
        for ( i = 0; i < bands.length; i++) {
    
            const bandsName={
                label:bands[i].bandName,
                value:bands[i].idBandManager
            
            }
            myBandArray.push(bandsName)

    }
   
    var bandId;
    const clickedDrop = (e) => {
    bandId = e.value;
    }
    
        var clickedDropId;
        const dispatch = useDispatch();
        const handleSendRequest = (e) => {
        clickedDropId = e.currentTarget.id;
        const myIdField = { 'band_id': bandId }
        const isApproved = { 'is_approved': false }
        const isPending = { 'is_pending': true }

        const tokenToPass = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-access-token': tokenToPass
                }
            };
        clientdispatch(updateClientLead(clickedDropId, myIdField, config));
        clientdispatch(updateClientLead(clickedDropId, isApproved, config));
        clientdispatch(updateClientLead(clickedDropId, isPending, config));

    }


    return (
        <div id="homeDivStyle">
            <NavigationBar/>
            <SideBar/>
            <div id="eventRequestPane">
            <div class="row">
                {myBand.map((val,key)=>{
                        return(
                            <div class="column">
                            <div className="card" key={key}>
                            <p id="fieldsPara">Event Type: {val.type}</p>
                                <p id="fieldsPara">Event Location: {val.location}</p>
                                <p id="fieldsPara">Requirement for: {val.requirements}</p>
                                <p id="fieldsPara">Music Genre: {val.music}</p>
                                <p id="fieldsPara">Start Date: {val.start_date}</p>
                                <p id="fieldsPara">End Date: {val.end_date}</p>
                                <div>
                                <Dropdown className="Selection" id={val._id} options={myBandArray} label={myBandArray.label} value={myBandArray.value} onChange={clickedDrop} placeholder="Select an option" />
                                </div>
                                <button className="sendRequests" id={val._id} onClick={handleSendRequest}>Send Requests</button>
                                </div>
                                </div>
                            
                            
                            
                           
                            
                             
                        )
                    })}</div>
                 
                    </div>
                
                </div>
)}
                
                
export default EventRequestsBand

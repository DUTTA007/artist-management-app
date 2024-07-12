import React,{useState} from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/EventRequest.css"
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import NavigationBar from "../Components/NavigationBar";
import Dropdown from 'react-dropdown'
import { updateClientLead } from "../actions/client";



const EventRequestsSolo = () => {
    const client = useSelector((state) => state.client);
    const clientdispatch = useDispatch();

    const users = useSelector((state) => state.users);
  

    
    
    var mySolo = [];
    
    for(var i=0; i<client.length; i++){
        if(client[i].requirements==='Solo'&& client[i].freelancer_id ===''){
                mySolo.push(client[i])
            }
            
        }

    var ArtistsNames = [];
    for ( i = 0; i < users.length; i++) {
        if(users[i].role==='freelancer'){
            const freelancer={
                label:users[i].firstName,
                value:users[i]._id
            
            }
            ArtistsNames.push(freelancer)
        }
        

    }


    const [option1, setOption1] = useState(ArtistsNames[0]);
  
        var freelancerId;
        const clickedDrop = (e) => {
        freelancerId = e.value;
        
    }
        var clickedDropId;
        
        const dispatch = useDispatch();
        const handleSendRequest = (e) => {
        clickedDropId = e.currentTarget.id;
        const myIdField = { 'freelancer_id': freelancerId }
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
                {mySolo.map((val,key)=>{
                        return(
                            <div class="column">
                            <div class="card" key={key}>
                                <p id="fieldsPara">Event Type: {val.type}</p>
                                <p id="fieldsPara">Event Location: {val.location}</p>
                                <p id="fieldsPara">Requirement for: {val.requirements}</p>
                                <p id="fieldsPara">Music Genre: {val.music}</p>
                                <p id="fieldsPara">Start Date: {val.start_date}</p>
                                <p id="fieldsPara">End Date: {val.end_date}</p>
                                <div>
                                <Dropdown className="Selection" id={val._id} options={ArtistsNames} label={ArtistsNames.label} value={ArtistsNames.value} onChange={clickedDrop} placeholder="Select an option" />
                                </div>
                                <button className="sendRequests" id={val._id} onClick={handleSendRequest}>Send Requests</button>
                                
                            
                                
                            </div>
                            </div>
                            
                            
                            
                        )
                    })}</div>
                    
                    </div>
                
                </div>
)}
                

export default EventRequestsSolo

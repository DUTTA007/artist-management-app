import React,{useState}from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/EventRequest.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import Dropdown from "react-dropdown";
import NavigationBar from "../Components/NavigationBar";
import { updateArtistRequests } from "../actions/artistRequests";



const EventRequestsArtists = () => {
    const artistRequests = useSelector((state) => state.artistRequests);
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);
    const [show, toggleShow]= useState(false);
    
    var myArtists = [];
    
    for(var i=0; i<artistRequests.length; i++){
        if(artistRequests[i].freelancer_id ===''){
                myArtists.push(artistRequests[i])
            }
        }
    

  
        var artistsNamesForSinger = [];
        var artistsNamesForKeyboard = [];
        var artistsNamesForGuitar = [];
        var artistsNamesForDrums = [];
        var artistsNamesForFlute = [];
        var artistsNamesForViolin = [];
        var artistNames=[];
        for ( i = 0; i < users.length; i++) {
            if(users[i].role==='freelancer'){
                switch (users[i].instrument){
                    case 'Guitar': 
                        const guitarist={
                        label:users[i].firstName, 
                        value:users[i]._id   
                    }
                        artistsNamesForGuitar.push(guitarist);
                        break;
                        case 'Singer': 
                        const  singer={
                            label:users[i].firstName, 
                            value:users[i]._id   
                        }
                        artistsNamesForSinger.push(singer);
                        break;
                        case 'Keyboard': 
                        const keyboard={
                            label:users[i].firstName, 
                            value:users[i]._id   
                        }
                        artistsNamesForKeyboard.push(keyboard);
                        break;
                        case 'Flute': 
                        const flautist={
                            label:users[i].firstName, 
                            value:users[i]._id   
                        }
                        artistsNamesForFlute.push(flautist);
                        break;
                        case 'Drums':
                           const drummer={
                                label:users[i].firstName, 
                                value:users[i]._id   
                            } 
                        artistsNamesForDrums.push(drummer);
                        break;
                        case 'Violin': 
                        const violinist={
                            label:users[i].firstName, 
                            value:users[i]._id   
                        }
                        artistsNamesForViolin.push(violinist);
                        break;
                        default:
                            artistNames.push(users[i].firstName);

                }
              
            }
        } 

        
        

        var freelancerId;
       
        const clickedDrop = (e) => {
        freelancerId = e.value;
        
        
    }
    

    var clickedDropId;
        
       
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
        dispatch(updateArtistRequests(clickedDropId, myIdField, config));
        dispatch(updateArtistRequests(clickedDropId, isApproved, config));
        dispatch(updateArtistRequests(clickedDropId, isPending, config));

    }
    

    return (
        <div id="homeDivStyle">
            <NavigationBar/>
            <SideBar/>
            <div id="eventRequestPane">
            <div class="row">
                {
                    myArtists.map((val,key)=>{
                        return(
                            
                            <div className="column">
                            <div className="card" key={key}>
                                <p id="fieldsPara">Event Type: {val.type}</p>
                                <p id="fieldsPara">Event Location: {val.location}</p>
                                <p id="fieldsPara">Requirement for: {val.requirements}</p>
                                <p id="fieldsPara">Start Date: {val.start_date}</p>
                                <p id="fieldsPara">End Date: {val.end_date}</p>
                                <div>
                                {
                                    val.requirements === "Guitarist" ?
                                    
                                    <Dropdown className="Selection" id={val._id} options={artistsNamesForGuitar} label={artistsNamesForGuitar.label}  value={artistsNamesForGuitar.value} onChange={clickedDrop}  placeholder="Select an option" />
                                    : null 
                                }
                                {
                                    val.requirements === "Keyboardist" ? 
                                    
                                <Dropdown className="Selection" id={val._id} options={artistsNamesForKeyboard} label={artistsNamesForKeyboard.label}  value={artistsNamesForKeyboard.value} onChange={clickedDrop}  placeholder="Select an option" />
                                : null
                                }
                                {
                                    val.requirements === "Flautist" ? 
                                    
                                <Dropdown className="Selection" id={val._id} options={artistsNamesForFlute} label={artistsNamesForFlute.label}  value={artistsNamesForFlute.value} onChange={clickedDrop}  placeholder="Select an option" />
                                    : null
                                }
                                {
                                    val.requirements === "Singer" ? 
                                    
                                <Dropdown className="Selection" id={val._id} options={artistsNamesForSinger} label={artistsNamesForSinger.label}  value={artistsNamesForSinger.value} onChange={clickedDrop}  placeholder="Select an option" />
                                : null
                                }
                                {
                                    val.requirements === "Drummer" ? 
                                    
                                <Dropdown className="Selection" id={val._id} options={artistsNamesForDrums} label={artistsNamesForDrums.label}  value={artistsNamesForDrums.value} onChange={clickedDrop}  placeholder="Select an option" />
                                : null
                                }
                                {
                                    val.requirements === "Violinist" ? 
                                    
                                <Dropdown className="Selection" id={val._id} options={artistsNamesForViolin} label={artistsNamesForViolin.label}  value={artistsNamesForViolin.value} onChange={clickedDrop}  placeholder="Select an option" />
                                : null
                                }                 
                                <div>
                                <button className="sendRequests" id={val._id} onClick={handleSendRequest}>Send Requests</button>
                                
                                </div>
                            </div>
                            </div>
                            </div>
                            
                        )
                        
                    })}</div>
                    </div>
                </div>           
)}
                
export default EventRequestsArtists
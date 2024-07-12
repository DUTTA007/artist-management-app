import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import UpdateProfile from './updateProfile';
import ChangePassword from './changePassword';
import ShowUsers from './Admin/showUsers';
import SideBar from './Components/SideBar';
import NavBar from './Components/NavBar';
import Home from './Home';
import AddRequest from './BandManager/AddRequest';
import AddEventRequest from './Client/AddEventRequest';
import EventRequests from './BandManager/EventRequests';
import EventRequestsBand from './Admin/EventRequestsBand';
import EventRequestsSolo from './Admin/EventRequestsSolo'
import SoloEventRequests from './Freelancer/SoloEventRequests'
import BandRequests from './Freelancer/BandRequests';
import ViewAllFreelancers from './Freelancer/ViewAllFreelancers';
import ViewAllBands from './BandManager/ViewAllBands';
import "./Styles/Login.css";
import "./Styles/SignUp.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {getUsers} from './actions/users'
import { getAllBands } from './actions/bands';
import { getAllClientLeads } from './actions/client';
import { getAllArtistRequests } from './actions/artistRequests'
import { getUserById } from './actions/users';
import EventRequestsArtists from './Admin/EventRequestsArtists';
import MyRequestsClient from './Client/MyRequestsClient';
import MyEventsFreelancer from './Freelancer/MyEventsFreelancer'
import MyEventsBand from './BandManager/MyEventsBand'
import ViewAllClientLeads from './Admin/ViewAllClientLeads';
import ViewAllUsersPagination from './Admin/ViewAllUsersPagination'

function App() {
  const dispatch = useDispatch();
  
  const tokenToPass = localStorage.getItem('token');
  const helloUserId = localStorage.getItem('userId');
  const config = {
    headers:{
      'x-access-token': tokenToPass
    }
  };
  useEffect (() => {
    dispatch(getUsers(config));
    dispatch(getUserById(helloUserId, config));
    dispatch(getAllBands(config));
    dispatch(getAllClientLeads(config));
    dispatch(getAllArtistRequests(config));
  }, [dispatch]);

  // const cors = require("cors");
  // App.use(cors());

  return (
    <div id='appDiv'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/sidebar" element={<SideBar/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/addrequest" element={<AddRequest/>}/>
        <Route exact path="/eventrequests" element={<EventRequests/>}/>
        <Route exact path="/addeventclientrequest" element={<AddEventRequest/>}/>
        <Route exact path="/eventrequestsforband" element={<EventRequestsBand/>}/>
        <Route exact path="/eventrequestsforsolo" element={<EventRequestsSolo/>}/>
        <Route exact path="/soloeventrequestsfreelancer" element={<SoloEventRequests/>}/>
        <Route exact path="/bandrequestsfreelancer" element={<BandRequests/>}/>
        <Route exact path="/viewallfreelancers" element={<ViewAllFreelancers/>}/>
        <Route exact path="/viewallbands" element={<ViewAllBands/>}/>
        <Route exact path="/eventrequestsforartists" element={<EventRequestsArtists/>}/>
        <Route exact path="/addeventclientrequest" element={<AddEventRequest />} />
        <Route exact path="/updateprofile" element={<UpdateProfile />} />
        <Route exact path="/updateBand" element={<UpdateProfile />} /> 
        <Route exact path="/changePassword" element={<ChangePassword />} />   
        <Route exact path="/showUsers" element={<ShowUsers />} />   
        <Route exact path="/myrequestsclient" element={<MyRequestsClient />} /> 
        <Route exact path="/myeventsfreelancer" element={<MyEventsFreelancer />} /> 
        <Route exact path="/myeventsband" element={<MyEventsBand />} /> 
        <Route exact path="/viewallclientrequests" element={<ViewAllClientLeads />} /> 
        <Route exact path="/viewalluserspagination" element={<ViewAllUsersPagination />} /> 
      </Routes>
      
    </BrowserRouter>
    </div>
    
  );
}

export default App;

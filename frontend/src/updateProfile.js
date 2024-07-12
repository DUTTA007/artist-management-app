import React, {useState} from "react";
import "./Styles/updateProfile.css";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch } from 'react-redux'
import { updateProfile } from './actions/users'
import { updateBands } from "./actions/bands";
import NavigationBar from "./Components/NavigationBar";
import { format } from "date-fns";
import SideBar from "./Components/SideBar";
import "./Styles/SideBar.css";

const UpdateProfile = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [phone, setPhone] = useState()
    const dispatch = useDispatch();
    const options = ['Guitar', 'Keyboard', 'Drums', 'Flute', 'Violin', 'Singer'];
    const navigate = useNavigate();  
    const navigateToHome = () => {
        navigate('/home');
    };
    const currentUser = localStorage.getItem('email');
    const currentUserId = localStorage.getItem('userId');
    
    var userArray = {};
    var bandArray = {};
    var currentRole = '';
    var userId = '';
    const users = useSelector((state) => state.users);
    const bands = useSelector((state) => state.bands);
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email === currentUser) {
            currentRole = users[i].role;
            userId = users[i]._id;
            userArray = users[i];
        }
    }
    var j
    var bandId;
    for (j = 0; j < bands.length; j++){
        if (bands[j].idBandManager === currentUserId) {
            bandArray = bands[j];
            bandId = bandArray._id;
        }
    }
    const [defaultOption, setDefaultOption] = useState(options[0]);
    const [userPData, setUserPData] = useState({firstName: '', lastName: '', contactNumber: '',  city: '', country: '', streetName: '', streetNumber: '', pinCode: '', companyName: '', instrument: '', bio: ''});
    const [bandPData, setBandPData] = useState({ bandName: '', bandType: '', bandDescription: ''});
    
    
    const handleSubmitUpdateProfile = (e) => {
        if(userPData.firstName === '') {
            userPData.firstName = userArray.firstName;
        }
        if(userPData.lastName === '') {
            userPData.lastName = userArray.lastName;
        }
        if(userPData.city === '') {
            userPData.city = userArray.address.city;
        }
        if(userPData.country === '') {
            userPData.country = userArray.address.country;
        }
        if(userPData.pinCode === '') {
            userPData.pinCode = userArray.address.pinCode;
        }
        if(userPData.streetName === '') {
            userPData.streetName = userArray.address.streetName;
        }
        if(userPData.streetNumber === '') {
            userPData.streetNumber = userArray.address.streetNumber;
        }
        if(userPData.contactNumber === '') {
            userPData.contactNumber = userArray.contactNumber;
        }
        if(userPData.instrument === '') {
            userPData.instrument = userArray.instrument;
        }
        if(userPData.companyName === '') {
            userPData.companyName = userArray.companyName;
        }
        if(userPData.bio === '') {
            userPData.bio = userArray.bio;
        }
        if(bandPData.bandName === '') {
            bandPData.bandName = bandArray.bandName;
        }
        if(bandPData.bandType === '') {
            bandPData.bandType = bandArray.bandType;
        }
        if(bandPData.bandDescription === '') {
            bandPData.bandDescription = bandArray.bandDescription;
        } 
        
        const myData = { address: { city: userPData.city, country: userPData.country, streetName: userPData.streetName, streetNumber: userPData.streetNumber, pinCode: userPData.pinCode },firstName: userPData.firstName, lastName: userPData.lastName, contactNumber: phone, companyName: userPData.companyName, role: currentRole, instrument: defaultOption.value, bio:userPData.bio};
        const myBandData = { bandName: bandPData.bandName, bandType: bandPData.bandType, bandDescription: bandPData.bandDescription};
        if (currentRole === 'bandManager') {
            e.preventDefault();
            dispatch(updateProfile(userId,myData));
            dispatch(updateBands(bandId, myBandData));
            
        } else {
            e.preventDefault();
            dispatch(updateProfile(userId,myData));
        }     
    }
    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="updateProfileMainDiv">
            <div id="updateProfileHeadingDiv">
                <h2 className="heading">Edit Profile</h2>
            </div>
            <form id="updateProfileFormContainer" onSubmit={handleSubmitUpdateProfile}>
                {
                    currentRole === "client" ? 
                    <div className="updateProfileFormSubDiv">
                        <div className="updateProfileFormSubDivForm">
                            <div className="updateProfileFormSubDivLeftClient">
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile">First Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="firstName" Value={userArray.firstName} onChange={(e) => setUserPData({...userPData, firstName: e.target.value})} />
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Last Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="lastName" Value={userArray.lastName} onChange={(e) => setUserPData({...userPData, lastName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Email</label>
                                    <input className="inputFieldSpaceupdateProfile" type="email" name="email" Value={userArray.email} onChange={(e) => setUserPData({...userPData, email: e.target.value})} disabled/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Contact Number</label>
                                    <PhoneInput id="contactInputUpdateProfile" placeholder="Enter phone number" value={userArray.contactNumber} onChange={setPhone}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Bio</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="bio" Value={userArray.bio} onChange={(e) => setUserPData({...userPData, bio: e.target.value})}/>
                                </div>
                            </div>
                            <div className="updateProfileFormSubDivRight">
                            <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile">City</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="city" Value={userArray.address.city} onChange={(e) => setUserPData({...userPData, city: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Country</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="country" Value={userArray.address.country} onChange={(e) => setUserPData({...userPData, country: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Street Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="streetName" Value={userArray.address.streetName} onChange={(e) => setUserPData({...userPData, streetName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Street Number</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="streetNumber" Value={userArray.address.streetNumber} onChange={(e) => setUserPData({...userPData, streetNumber: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Pin Code</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="pinCode" Value={userArray.address.pinCode} onChange={(e) => setUserPData({...userPData, pinCode: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Company Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="companyName" Value={userArray.companyName} onChange={(e) => setUserPData({...userPData, companyName: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div id="submitButtonContainerupdateProfile">
                                <button id="backButtonUpdateProfile" onClick={navigateToHome}>Back</button> 
                                <input id="submitButtonupdateProfile" type="submit" value="Save" /> 
                        </div>
                    </div>: null
                }
                {
                    currentRole === "bandManager" ? 
                    <div className="updateProfileFormSubDiv scroll">
                        <div className="updateProfileFormSubDivFormBand">
                            <div className="updateProfileFormSubDivLeftBand">
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile">First Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="firstName" Value={userArray.firstName} onChange={(e) => setUserPData({...userPData, firstName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Last Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="lastName" Value={userArray.lastName} onChange={(e) => setUserPData({...userPData, lastName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Email</label>
                                    <input className="inputFieldSpaceupdateProfile" type="email" name="email" Value={userArray.email} onChange={(e) => setUserPData({...userPData, email: e.target.value})} disabled/>
                                </div>                                        
                            </div>
                            <div className="updateProfileFormSubDivRight">
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Bio</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="bio" Value={userArray.bio} onChange={(e) => setUserPData({...userPData, bio: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Contact Number</label>
                                    <PhoneInput id="contactInputUpdateProfile" placeholder="Enter phone number" value={userArray.contactNumber} onChange={setPhone}/>
                                </div>
                            </div>
                                </div>
                                
                        <div id="bandDetailsDivUpdateProfile">
                            <div id="bandDetailsTextFieldsUpdateProfile">
                                <div id="bandDetailsNameUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Band Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="bandName" Value={bandArray.bandName} onChange={(e) => setBandPData({...bandPData, bandName: e.target.value})}/>
                                </div>
                                <div id="bandDetailsTypeUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Band Type</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="bandType" Value={bandArray.bandType} onChange={(e) => setBandPData({...bandPData, bandType: e.target.value})}/>
                                </div>
                            </div>
                            <div id="descriptionDivUpdateProfile">
                                    <label>Band Description</label>
                                    <input id="descriptionInputUpdateProfile" type="text" name="bandDescription" Value={bandArray.bandDescription} onChange={(e) => setBandPData({...bandPData, bandDescription: e.target.value})}/>
                            </div>
                            
                        </div>
                        <div id="submitButtonContainerupdateProfile">
                            <button id="backButtonUpdateProfile" onClick={navigateToHome}>Back</button>
                            <input id="submitButtonBandManagerUpdateProfile" type="submit" value="Save" />
                        </div>
                    </div>: null
                }
                {
                    currentRole === "freelancer" ? 
                    <div className="updateProfileFormSubDiv">
                        <div className="updateProfileFormSubDivForm">
                            <div className="updateProfileFormSubDivLeftClient">
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile">First Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="firstName" Value={userArray.firstName} onChange={(e) => setUserPData({...userPData, firstName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Last Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="lastName" Value={userArray.lastName} onChange={(e) => setUserPData({...userPData, lastName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Email</label>
                                    <input className="inputFieldSpaceupdateProfile" type="email" name="email" Value={userArray.email} onChange={(e) => setUserPData({...userPData, email: e.target.value})} disabled/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Contact Number</label>
                                    <PhoneInput id="contactInputUpdateProfile" placeholder="Enter phone number" value={userArray.contactNumber} onChange={setPhone}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Bio</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="bio" Value={userArray.bio} onChange={(e) => setUserPData({...userPData, bio: e.target.value})}/>
                                </div> 
                            </div>
                            <div className="updateProfileFormSubDivRight">
                                
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile">City</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="city" Value={userArray.address.city} onChange={(e) => setUserPData({...userPData, city: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Country</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="country" Value={userArray.address.country} onChange={(e) => setUserPData({...userPData, country: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Street Name</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="streetName" Value={userArray.address.streetName} onChange={(e) => setUserPData({...userPData, streetName: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Pin Code</label>
                                    <input className="inputFieldSpaceupdateProfile" type="text" name="pin" Value={userArray.address.pinCode} onChange={(e) => setUserPData({...userPData, pinCode: e.target.value})}/>
                                </div>
                                <div className="inputFieldUpdateProfile">
                                    <label className="inputFieldLabelUpdateProfile inputFieldLabelExtendedUpdateProfile">Instrument</label>
                                    <Dropdown options={options} value={userArray.instrument} onChange={setDefaultOption} placeholder="Select an option" />
                                </div>
                            </div>
                        </div>
                        <div id="submitButtonContainerupdateProfile">
                                <button id="backButtonUpdateProfile" onClick={navigateToHome}>Back</button>
                                <input id="submitButtonupdateProfile" type="submit" value="Save" />
                        </div>
                    </div>: null
                }
            </form>
            </div>
        </div>
    );

    
};
export default UpdateProfile
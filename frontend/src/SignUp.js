import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Styles/SignUp.css";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import axios from 'axios';
import DynamicTable from './DynamicTable';
import ArtistData from './ArtistData';
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64'

import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch } from 'react-redux'
import { createUser } from './actions/users'
import { createBand } from './actions/bands'
import { format } from 'date-fns'
import "./Styles/ArtistData.css";
import { uploadImageToS3 } from './actions/s3ServiceAPI'
import { uploadFile } from 'react-s3';
import S3FileUpload from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer


const config = {
    bucketName: 'musician-management-app',
    // dirName: 'photos', /* optional */
    region: 'eu-central-1',
    accessKeyId: '',
    secretAccessKey: '',
}

const SignUp = () => {
    const [selected, setSelected] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [phone, setPhone] = useState()

    const dispatch = useDispatch();

    const options = [
        'Guitar', 'Keyboard', 'Drums', 'Flute', 'Violin', 'Singer'
    ];
    const [defaultOption, setDefaultOption] = useState(options[0]);
    const changeHandler = e => {
        setSelected(e.target.value);
    };

    //   const changeHandlerFile = (event) => {
    // 	setSelectedFile(event.target.files[0]);
    // 	setIsSelected(true);
    // };

    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/');
    };

    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', contactNumber: '', password: '', dateOfBirth: '', city: '', country: '', streetName: '', streetNumber: '', pinCode: '', companyName: '', instrument: '', image: '', bio: '' });
    const [bandData, setBandData] = useState({ bandName: '', bandType: '', bandDescription: '', image_URL: ''});


    const [inputFields, setInputFields] = useState([
        { name: '', mobile: '', address: '', email: '' }
    ])


    const handleFormChange = (index, event) => {
        event.preventDefault();
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = (event) => {
        event.preventDefault();
        let newfield = { name: '', mobile: '', address: '', email: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index, event) => {
        event.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)

    }


    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }


    const handleSubmit = async e => {
        handleUpload(selectedFile);
        const trialDate = JSON.stringify(startDate);
        const birthDate = trialDate.slice(1, 11);
        const myData = { address: { city: userData.city, country: userData.country, streetName: userData.streetName, streetNumber: userData.streetNumber, pinCode: userData.pinCode }, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, contactNumber: phone, password: userData.password, dateOfBirth: birthDate, companyName: userData.companyName, role: selected, instrument: defaultOption.value, imageURL: userData.image, bio: userData.bio };
        e.preventDefault();
        var myRole = myData.role;
        dispatch(createUser(myData));
        await delay(3000);
        const myBMngrId = localStorage.getItem('bandMngrId');
        const myBandData = { bandName: bandData.bandName, bandType: bandData.bandType, bandDescription: bandData.bandDescription, artists: inputFields, idBandManager: myBMngrId, image_URL: bandData.image_URL}

        if(myRole === 'bandManager'){
            dispatch(createBand(myBandData));
        }
        
    }

    return (
        <div id="homeDiv">
            <div id="signUpMainDiv">
                <div id="signUpRadioDiv">
                    <div>
                        <input type="radio" name="role" value="client" checked={selected === "client"} onChange={changeHandler} />
                        <label htmlFor="client">Client</label>
                    </div>
                    <div>
                        <input type="radio" value="bandManager" name="role" checked={selected === "bandManager"} onChange={changeHandler} />
                        <label htmlFor="bandManager">Band Manager</label>
                    </div>
                    <div>
                        <input type="radio" value="freelancer" name="role" checked={selected === "freelancer"} onChange={changeHandler} />
                        <label htmlFor="freelancer">Freelancer</label>
                    </div>


                </div>
                <div id="signUpHeadingDiv">
                    <h2 className="heading">Sign Up</h2>
                </div>
                <form id="signUpFormContainer" onSubmit={handleSubmit}>
                    {
                        selected === "client" ?
                            <div className="signUpFormSubDiv">
                                <div className="signUpFormSubDivForm">
                                    <div className="signUpFormSubDivLeftClient">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">First Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="firstName" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Last Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="lastName" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Email</label>
                                            <input className="inputFieldSpaceSignUp" type="email" name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            {/* <label className="inputFieldLabel">Contact Number</label>
                                    <input className="inputFieldSpace" type="text" name="contactNumber" /> */}
                                            <label className="inputFieldLabel inputFieldLabelExtended">Contact Number</label>
                                            <PhoneInput id="contactInput" placeholder="Enter phone number" value={phone} onChange={setPhone} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Password</label>
                                            <input className="inputFieldSpaceSignUp" type="password" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Date of Birth</label>
                                            <DatePicker id="datePickerField" className="inputFieldSpaceSignUp" selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </div>
                                    </div>
                                    <div className="signUpFormSubDivRight">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">City</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="city" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Country</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="country" value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Street Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="streetName" value={userData.streetName} onChange={(e) => setUserData({ ...userData, streetName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Street Number</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="streetNumber" value={userData.streetNumber} onChange={(e) => setUserData({ ...userData, streetNumber: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Pin Code</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="pinCode" value={userData.pinCode} onChange={(e) => setUserData({ ...userData, pinCode: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Company Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="companyName" value={userData.companyName} onChange={(e) => setUserData({ ...userData, companyName: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div id="submitButtonContainer">
                                    <button id="backButton" onClick={navigateToLogin}>Back</button>
                                    <input id="submitButton" type="submit" value="Submit" />
                                </div>
                            </div> : null
                    }
                    {
                        selected === "bandManager" ?
                            <div className="signUpFormSubDiv scroll">
                                <div className="signUpFormSubDivFormBand">
                                    <div className="signUpFormSubDivLeftBand">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel">First Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="firstName" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtendedBand">Last Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="lastName" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtendedBand">Email</label>
                                            <input className="inputFieldSpaceSignUp" type="email" name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="signUpFormSubDivRightBand">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel">Password</label>
                                            <input className="inputFieldSpaceSignUp" type="password" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtendedBand">Date of Birth</label>
                                            <DatePicker id="datePickerField" className="inputFieldSpaceSignUp" selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtendedBand">Contact Number</label>
                                            <PhoneInput id="contactInput" placeholder="Enter phone number" value={phone} onChange={setPhone} />
                                        </div>
                                    </div>
                                </div>
                                <div id="bandDetailsDiv">
                                    <div id="bandDetailsTextFields">
                                        <div className="signUpFormSubDivLeftBand">
                                            <div className="inputFieldSignUp">
                                                <label className="inputFieldLabel inputFieldLabelExtendedBand">Band Name</label>
                                                <input className="inputFieldSpaceSignUp" type="text" name="bandName" value={bandData.bandName} onChange={(e) => setBandData({ ...bandData, bandName: e.target.value })} />
                                            </div>
                                            <div className="inputFieldSignUp">
                                                <label className="inputFieldLabel inputFieldLabelExtendedBand">Band Type</label>
                                                <input className="inputFieldSpaceSignUp" type="text" name="bandType" value={bandData.bandType} onChange={(e) => setBandData({ ...bandData, bandType: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="signUpFormSubDivRightBand">
                                            <div className="inputFieldSignUp">
                                                <label className="inputFieldLabel inputFieldLabelExtendedBand">Band Description</label>
                                                <input className="inputFieldSpaceSignUp" type="text" name="bandDescription" value={bandData.bandDescription} onChange={(e) => setBandData({ ...bandData, bandDescription: e.target.value })} />
                                            </div>
                                            <div className="inputFieldSignUp">
                                                <label className="inputFieldLabel inputFieldLabelExtendedBand">Upload Image</label>
                                                <input type="file" name="file" onChange={handleFileInput}/>
                                                {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setBandData({ ...bandData, image_URL: base64 })} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div id="descriptionDiv">
                                    <label>Band Description</label>
                                    <input id="descriptionInput" type="text" name="bandDescription" value={bandData.bandDescription} onChange={(e) => setBandData({...bandData, bandDescription: e.target.value})}/>
                            </div> */}
                                    <div id="dynamicTableDiv">
                                        <div>
                                            <form>
                                                <label className="inputFieldLabel inputFieldLabelExtended">Add Member Details</label>
                                                {inputFields.map((input, index) => {
                                                    return (
                                                        <div id="artistFieldsDiv" key={index}>
                                                            {/* <h6 className="artistInputField">{index}</h6> */}
                                                            <input
                                                                name='name'
                                                                placeholder='Name'
                                                                className="artistInputField artistInputFieldTop"
                                                                value={input.name}
                                                                onChange={event => handleFormChange(index, event)}
                                                            />
                                                            <input
                                                                name='mobile'
                                                                placeholder='Mobile'
                                                                className="artistInputField artistInputFieldExtended artistInputFieldTop"
                                                                value={input.mobile}
                                                                onChange={event => handleFormChange(index, event)}
                                                            />
                                                            <input
                                                                name='address'
                                                                placeholder='Address'
                                                                className="artistInputField artistInputFieldExtended artistInputFieldTop"
                                                                value={input.address}
                                                                onChange={event => handleFormChange(index, event)}
                                                            />
                                                            <input
                                                                name='email'
                                                                placeholder='Email'
                                                                className="artistInputField artistInputFieldExtended artistInputFieldTop"
                                                                value={input.email}
                                                                onChange={event => handleFormChange(index, event)}
                                                            />
                                                            <button id="removeButton" className="artistInputFieldExtended artistInputFieldTop" onClick={event => removeFields(index, event)}>Remove</button>
                                                        </div>
                                                    )
                                                })}
                                                <button id="addMoreButton" onClick={addFields}>Add Next Member</button>
                                                {/* <button onClick={submit}>Submit</button> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div id="submitButtonContainer">
                                    <button id="backButton" onClick={navigateToLogin}>Back</button>
                                    <input id="submitButtonBandManager" type="submit" value="Submit" />
                                </div>
                            </div> : null
                    }
                    {
                        selected === "freelancer" ?
                            <div className="signUpFormSubDiv">
                                <div className="signUpFormSubDivForm">
                                    <div className="signUpFormSubDivLeftFree">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">First Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="firstName" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Last Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="lastName" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Email</label>
                                            <input className="inputFieldSpaceSignUp" type="email" name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Contact Number</label>
                                            <PhoneInput id="contactInput" placeholder="Enter phone number" value={phone} onChange={setPhone} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Password</label>
                                            <input className="inputFieldSpaceSignUp" type="password" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Date of Birth</label>
                                            <DatePicker id="datePickerField" className="inputFieldSpaceSignUp" selected={startDate} onChange={(date) => setStartDate(date)} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">City</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="city" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="signUpFormSubDivRight">
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Country</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="country" value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Street Name</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="streetName" value={userData.streetName} onChange={(e) => setUserData({ ...userData, streetName: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Pin Code</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="pin" value={userData.pinCode} onChange={(e) => setUserData({ ...userData, pinCode: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Instrument</label>
                                            <Dropdown options={options} value={defaultOption} onChange={setDefaultOption} placeholder="Select an option" />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Bio</label>
                                            <input className="inputFieldSpaceSignUp" type="text" name="bio" value={userData.bio} onChange={(e) => setUserData({ ...userData, bio: e.target.value })} />
                                        </div>
                                        <div className="inputFieldSignUp">
                                            <label className="inputFieldLabel inputFieldLabelExtended">Upload Image</label>
                                            {/* <input type="file" name="file" /> */}
                                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setUserData({ ...userData, image: base64 })} />
                                        </div>
                                    </div>
                                </div>
                                <div id="submitButtonContainer">
                                    <button id="backButton" onClick={navigateToLogin}>Back</button>
                                    <input id="submitButton" type="submit" value="Submit" />
                                </div>
                            </div> : null
                    }
                </form>
            </div>
        </div>
    );
}

export default SignUp;
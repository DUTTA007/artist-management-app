import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/AddRequest.css";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import NavigationBar from "../Components/NavigationBar";
import { createArtistRequest } from "../actions/artistRequests"
import { useDispatch } from 'react-redux'

const AddRequest = () => {
    const options1 = [
        'Public', 'Private'
    ];
    // const defaultOption1 = options1[0];
    const [defaultOption1, setDefaultOption1] = useState(options1[0]);
    const options2 = [
        'Keyboardist', 'Guitarist', 'Drummer', 'Flautist', 'Violinist', 'Singer'
    ];
    // const defaultOption2 = options2[0];
    const [defaultOption2, setDefaultOption2] = useState(options2[0]);
    const options3 = [
        'Bollywood', 'Jazz', 'Pop', 'Rock', 'Classical'
    ];
    // const defaultOption3 = options3[0];
    const [defaultOption3, setDefaultOption3] = useState(options3[0]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dispatch = useDispatch();

    const [artistData, setArtistData] = useState({ type: '', start_date: '', end_date: '', requirements: '', agreed_wage: '', contact: '', music: '', location: '', freelancer_id: '', is_approved: '', is_pending: '' });

    const handleSubmit = (e) => {
        const currentBMId = localStorage.getItem('userId');
        const trialStartDate = JSON.stringify(startDate);
        const finalStartDate = trialStartDate.slice(1, 11);
        const trialEndDate = JSON.stringify(endDate);
        const finalEndDate = trialEndDate.slice(1, 11);

        const myArtistRequestData = { type: defaultOption1.value, start_date: finalStartDate, end_date: finalEndDate, requirements: defaultOption2.value, agreed_wage: artistData.agreed_wage, contact: artistData.contact, music: defaultOption3.value, location: artistData.location, freelancer_id: '', is_approved: false, is_pending: true };

        const tokenToPass = localStorage.getItem('token');
        const config = {
            headers: {
                'x-access-token': tokenToPass
            }
        };

        e.preventDefault();
        dispatch(createArtistRequest(myArtistRequestData, config));
        // alert("myRequestData", myRequestData);
    };

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="addRequestPane">
                <div id="titleContainer">
                    <h2 className="titleStyle">Add Artist Request</h2>
                </div>
                <div id="fieldsOuterContainer">
                    <div id="fieldsContainerLeft">
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Event Type</label>
                            <Dropdown options={options1} value={defaultOption1} onChange={setDefaultOption1} placeholder="Select an option" />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Requirement</label>
                            <Dropdown options={options2} value={defaultOption2} onChange={setDefaultOption2} placeholder="Select an option" />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Music</label>
                            <Dropdown options={options3} value={defaultOption3} onChange={setDefaultOption3} placeholder="Select an option" />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel inputFieldLabelExtended1">Phone Number</label>
                            <input className="inputFieldSpace1" type="text" name="phoneNumber" value={artistData.contact} onChange={(e) => setArtistData({ ...artistData, contact: e.target.value })} />
                        </div>
                    </div>
                    <div id="fieldsContainerRight">
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">City</label>
                            <input className="inputFieldSpace1Right" type="text" name="location" value={artistData.location} onChange={(e) => setArtistData({ ...artistData, location: e.target.value })} />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Start Date</label>
                            <DatePicker id="datePickerField1" className="inputFieldSpace" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">End Date</label>
                            <DatePicker id="datePickerField1" className="inputFieldSpace" selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Approx. Pay</label>
                            <input className="inputFieldSpace1Right" type="text" name="agreed_wage" value={artistData.agreed_wage} onChange={(e) => setArtistData({ ...artistData, agreed_wage: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div id="addRequestButtonContainer">
                    {/* <button id="addRequestButton" onClick={handleSubmit}>Add Request</button> */}
                    <input id="addRequestButton" type="submit" value="Send Request" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default AddRequest;
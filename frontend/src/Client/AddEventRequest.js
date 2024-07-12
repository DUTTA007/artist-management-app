import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/AddRequest.css";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import { useDispatch } from 'react-redux'
import { addClientRequest } from '../actions/client'
import NavigationBar from "../Components/NavigationBar";

const AddEventRequest = () => {
    const options1 = [
        'Public', 'Private'
    ];
    // const defaultOption1 = options1[0];
    const [defaultOption1, setDefaultOption1] = useState(options1[0]);
    const options2 = [
        'Band', 'Solo'
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

    const [requestData, setRequestData] = useState({ type: '', start_date: '', end_date: '', requirements: '', agreed_wage: '', contact: '', music: '', location: '' });

    const handleSubmit = (e) => {
        const currentClientId = localStorage.getItem('userId');
        const trialStartDate = JSON.stringify(startDate);
        const finalStartDate = trialStartDate.slice(1, 11);
        const trialEndDate = JSON.stringify(endDate);
        const finalEndDate = trialEndDate.slice(1, 11);

        const myRequestData = { client_id: currentClientId, type: defaultOption1.value, start_date: finalStartDate, end_date: finalEndDate, requirements: defaultOption2.value, agreed_wage: requestData.agreed_wage, contact: requestData.contact, music: defaultOption3.value, location: requestData.location, is_approved: false, is_pending: true, band_id: '', freelancer_id: '' };

        e.preventDefault();

        const tokenToPass = localStorage.getItem('token');
        const config = {
            headers: {
                'x-access-token': tokenToPass
            }
        };
        dispatch(addClientRequest(myRequestData, config));
        // alert("myRequestData", myRequestData);
    };

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="addRequestPane">
                <div id="titleContainer">
                    <h2 className="titleStyle">Add Request</h2>
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
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">Phone Number</label>
                            <input className="inputFieldSpace1" type="text" name="phoneNumber" value={requestData.contact} onChange={(e) => setRequestData({ ...requestData, contact: e.target.value })} />
                        </div>
                    </div>
                    <div id="fieldsContainerRight">
                        <div className="inputFieldSignUp1">
                            <label className="inputFieldLabel1 inputFieldLabelExtended1">City</label>
                            <input className="inputFieldSpace1" type="text" name="location" value={requestData.location} onChange={(e) => setRequestData({ ...requestData, location: e.target.value })} />
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
                            <input className="inputFieldSpace1" type="text" name="agreed_wage" value={requestData.agreed_wage} onChange={(e) => setRequestData({ ...requestData, agreed_wage: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div id="addRequestButtonContainer">
                    {/* <button id="addRequestButton">Add Request</button> */}
                    <input id="addRequestButton" type="submit" value="Add Request" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default AddEventRequest;
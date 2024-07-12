import React, { useState } from "react";
import "./Styles/ArtistData.css";

const ArtistData = () => {

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

    const submit = (e) => {
        e.preventDefault();
    }

    const removeFields = (index, event) => {
        event.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
        
    }

    return (
        <div>
            <form onSubmit={submit}>
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
                <button onClick={submit}>Submit</button>
            </form>
        </div>
    );
}

export default ArtistData
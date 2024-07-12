import React, { useState } from "react";
import "./Styles/DynamicTable.css";

const DynamicTable = () => {

    const [rows, setRows] = useState([{}]);

    const handleChange = idx => e => {
        // console.log("e.target",e.target);
        const { name, value } = e.target;
        // console.log("name, value",{name, value});
        // console.log("Type of rows",typeof rows);
        const rows1 = [...rows];
        console.log("rows1 full", rows1);
        rows1[idx] = {
            [name]: value
        };
        console.log("rows1", rows1[idx]);
        setRows(rows1);
        console.log("Final rows", [...rows]);
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        const item = {
            name: "",
            mobile: ""
        };
        setRows([...rows, item])
    };

    const handleRemoveRow = () => {
        setRows(rows.slice(0, -1));
    };

    const handleRemoveSpecificRow = (idx) => () => {
        const rows1 = [...rows];
        rows1.splice(idx, 1)
        setRows(rows1);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th> Id </th>
                    <th> Name </th>
                    <th> Mobile </th>
                    <th> Address </th>
                    <th> Email </th>
                    <th> Instrument </th>
                    <th> Remove </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                            <td>{idx}</td>
                            <td>
                                <input className="tableInputStyle" type="text" name="name" value={rows[idx].name} onChange={handleChange(idx)}/>
                            </td>
                            <td>
                                <input className="tableInputStyle" type="text" name="mobile" value={rows[idx].mobile} onChange={handleChange(idx)}/>
                            </td>
                            <td>
                                <input className="tableInputStyle" type="text" name="address" value={rows[idx].address} onChange={handleChange(idx)}/>
                            </td>
                            <td>
                                <input className="tableInputStyle" type="email" name="email" value={rows[idx].email} onChange={handleChange(idx)}/>
                            </td>
                            <td>
                                <input className="tableInputStyle" type="text" name="instrument" value={rows[idx].instrument} onChange={handleChange(idx)}/>
                            </td>
                            <td>
                                <button onClick={handleRemoveSpecificRow(idx)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button id="addMemberButton" onClick={handleAddRow}> Add Band Member </button>
            {/* <button onClick={handleRemoveRow}> Delete Last Row </button> */}
        </div>
    );
}

export default DynamicTable;
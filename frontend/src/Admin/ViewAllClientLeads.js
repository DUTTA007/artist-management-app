import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import "../Styles/ViewAllClientLeads.css";
import { useSelector } from "react-redux";
import NavigationBar from "../Components/NavigationBar";

const ViewAllClientLeads = () => {

    const client = useSelector((state) => state.client);
    const [currentPage, setCurrentPage] = useState(1)
    const [leadsPerPage, setLeadsPerPage] = useState(4)
    const pageNos = [];
    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = client.slice(indexOfFirstLead, indexOfLastLead)

    const totalLeads = client.length
    for(let i=1; i<=Math.ceil(totalLeads/leadsPerPage); i++){
        pageNos.push(i)
    }

    const paginate = (number) => {
        setCurrentPage(number)
    };

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="allClientLeadsPane">
            {currentLeads.map((item, index) => (
                <div key={index} id="leadCard">
                    { 
                        currentLeads[index].is_pending == true ?
                        <div id="leadCardColorBand"></div> : <div id="leadCardColorBandSeaGreen"></div>
                    }
                    {/* <div id="leadCardColorBand"></div> */}
                    <div id="leadCardPartI">
                        <b>Request id: {currentLeads[index]._id}</b>
                        <p id="leadCardPTag">Client id: {currentLeads[index].client_id}</p>
                        <p id="leadCardPTag">Contact: {currentLeads[index].contact}</p>
                    </div>
                    <div id="leadCardPartII">
                        <p id="leadCardPTag">Type: {currentLeads[index].type}</p>
                        <p id="leadCardPTag">Requirements: {currentLeads[index].requirements}</p>
                        <p id="leadCardPTag">Location: {currentLeads[index].location}</p>
                    </div>
                    <div id="leadCardPartIII">
                        <p id="leadCardPTag">Date: {currentLeads[index].start_date}</p>
                        <p id="leadCardPTag">Approx. Budget: {currentLeads[index].agreed_wage}</p>

                        { 
                            currentLeads[index].is_pending == true ?
                            <p id="leadCardPTag">Status: <b>Pending</b></p> : <p id="leadCardPTag">Status: <b>Assigned</b></p>
                        }
                        {/* <p id="leadCardPTag">Status: {currentLeads[index].is_pending}</p> */}
                    </div>
                </div>
            ))}
            <nav>
                <ul className="pagination">
                {pageNos.map(number => (
                    <li key={number}>
                        <a id={number} onClick={() => paginate(number)} href="#">{number}</a>
                    </li>
                ))}
                </ul>
            </nav>
            </div>
        </div>
    );
}

export default ViewAllClientLeads
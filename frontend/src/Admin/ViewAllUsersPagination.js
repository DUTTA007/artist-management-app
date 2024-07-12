import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import { useSelector } from "react-redux";
import NavigationBar from "../Components/NavigationBar";
import ReactPaginate from 'react-paginate';
import { getPaginatedUsers } from '../actions/users';
import { useDispatch } from 'react-redux'
import axios from "axios";


const ViewAllUsersPagination = () => {

    const [dta, setDta] = useState([])
    const dispatch = useDispatch();
    const url20 = 'http://localhost:3001/user/pageNo/'
    const url21 = '/pageSize/'
    const url1 = 'http://localhost:3001/user'

    useEffect (() => {
        const getUsers = axios.get(`${url1}`).then((response) => {
            var myResponse = response.data;
            const myResponse2 = myResponse.slice(0,4)
            setDta(myResponse2);
        });
      }, [dispatch]);

    const userData = useSelector((state) => state.users);
    let count = userData.length / 4

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        let pageSize = 4;
        axios.get(`${url20}${currentPage}${url21}${pageSize}`).then((response) => {
            setDta(response.data);
        });
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="allClientLeadsPane">
                <h2 id="h2TagStyle">All Users</h2>
                {dta.map((item, index) => (
                    <div key={index} id="leadCard">
                        <div id="leadCardColorBandSeaGreen"></div>
                        <div id="leadCardPartI">
                            <b>User id: {dta[index]._id}</b>
                            <p id="leadCardPTag">First Name: {dta[index].firstName}</p>
                            <p id="leadCardPTag">Last Name: {dta[index].lastName}</p>
                        </div>
                        <div id="leadCardPartII">
                            <p id="leadCardPTag">Email: {dta[index].email}</p>
                            <p id="leadCardPTag">Role: {dta[index].role}</p>
                            <p id="leadCardPTag">Contact: {dta[index].contactNumber}</p>
                        </div>
                        <div id="leadCardPartIII">
                            <p id="leadCardPTag">Date: {dta[index].dateOfBirth}</p>
                            <p id="leadCardPTag">City: {dta[index].address.city}</p>
                            <p id="leadCardPTag">Country: {dta[index].address.country}</p>
                           
                        </div>
                    </div>
                ))}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={count}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                />
            </div>
        </div>
    );
}

export default ViewAllUsersPagination
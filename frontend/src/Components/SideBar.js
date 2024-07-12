import React, { useState } from "react";
import "../Styles/SideBar.css";
import { SideBarData } from "./SideBarData";
import { SideBarDataClient } from "./SideBarData";
import { SideBarDataAdmin } from "./SideBarData";
import { SideBarDataFreelancer } from "./SideBarData";
import { SideBarDataBandManager } from "./SideBarData";
import NavBar from './NavBar';
import { useSelector } from "react-redux";

const SideBar = () => {

    const currentUser = localStorage.getItem('email');
    var arrayName = 'SideBarData';
    var currentRole = '';
    const users = useSelector((state) => state.users);
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == currentUser) {
            currentRole = users[i].role;
        }
    }
    return (
        <div className="sideBar">
            <ul className="sideBarList">
                {
                    currentRole === 'client' ?
                        SideBarDataClient.map((val, key) => {
                            return (
                                <li
                                    id={window.location.pathname == val.link ? "active" : ""}
                                    className="sideBarRow"
                                    key={key}
                                    onClick={() => {
                                        window.location.pathname = val.link;
                                    }}
                                >
                                    <div id="iconDiv">{val.icon}</div>
                                    <div id="titleDiv">{val.title}</div>
                                </li>
                            );
                        }) : null
                }
                {
                    currentRole === 'freelancer' ?
                        SideBarDataFreelancer.map((val, key) => {
                            return (
                                <li
                                    id={window.location.pathname == val.link ? "active" : ""}
                                    className="sideBarRow"
                                    key={key}
                                    onClick={() => {
                                        window.location.pathname = val.link;
                                    }}
                                >
                                    <div id="iconDiv">{val.icon}</div>
                                    <div id="titleDiv">{val.title}</div>
                                </li>
                            );
                        }) : null
                }
                {
                    currentRole === 'bandManager' ?
                        SideBarDataBandManager.map((val, key) => {
                            return (
                                <li
                                    id={window.location.pathname == val.link ? "active" : ""}
                                    className="sideBarRow"
                                    key={key}
                                    onClick={() => {
                                        window.location.pathname = val.link;
                                    }}
                                >
                                    <div id="iconDiv">{val.icon}</div>
                                    <div id="titleDiv">{val.title}</div>
                                </li>
                            );
                        }) : null
                }
                {
                    currentRole === 'admin' ?
                        SideBarDataAdmin.map((val, key) => {
                            return (
                                <li
                                    id={window.location.pathname == val.link ? "active" : ""}
                                    className="sideBarRow"
                                    key={key}
                                    onClick={() => {
                                        window.location.pathname = val.link;
                                    }}
                                >
                                    <div id="iconDiv">{val.icon}</div>
                                    <div id="titleDiv">{val.title}</div>
                                </li>
                            );
                        }) : null
                }
            </ul>
        </div>
    );
}

export default SideBar
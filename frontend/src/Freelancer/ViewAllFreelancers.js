import React from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import NavigationBar from "../Components/NavigationBar";
import { useSelector } from "react-redux";
import "../Styles/ViewAllFreelancers.css";

const ViewAllFreelancers = () => {

    const users = useSelector((state) => state.users);

    var myUsersArrayAll = [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].role === 'freelancer') {
            myUsersArrayAll.push(users[i]);
        }
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="viewAllFreeLancersPane" className="scroll">
                <h2 className="labelStyleViewAll">Artists</h2>
                <div id="imageDataCardsPane">
                        {myUsersArrayAll.map((item, index) => (


                            <div key={index} className="homeCardStyleAll">
                                <img src={myUsersArrayAll[index].imageURL} alt="Girl in a jacket" className="imgStyle" width="206" height="170"></img>
                                <h4>{myUsersArrayAll[index].firstName}</h4>
                                <p>{myUsersArrayAll[index].bio}</p>
                            </div>


                        ))}
                    </div>
            </div>
        </div>
    );
}

export default ViewAllFreelancers

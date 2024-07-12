import React from "react";
import SideBar from "../Components/SideBar";
import "../Styles/SideBar.css";
import NavigationBar from "../Components/NavigationBar";
import { useSelector } from "react-redux";
import "../Styles/ViewAllFreelancers.css";

const ViewAllBands = () => {

    const users = useSelector((state) => state.users);

    var myBandArrayAll = [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].role === 'bandManager') {
            myBandArrayAll.push(users[i]);
        }
    }

    const bands = useSelector((state) => state.bands);

    var myBandDetailsArrayAll = [];

    for(var j=0; j<bands.length; j++){
        for(var k=0; k<myBandArrayAll.length; k++){
            if(bands[j].idBandManager == myBandArrayAll[k]._id){
                myBandDetailsArrayAll.push(bands[j])
            }
        }
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="viewAllFreeLancersPane">
                <h2 className="labelStyleViewAll">Artists</h2>
                <div id="imageDataCardsPane">
                        {myBandDetailsArrayAll.map((item, index) => (


                            <div key={index} className="homeCardStyleAll">
                                <img src={myBandDetailsArrayAll[index].image_URL} alt="Girl in a jacket" className="imgStyle" width="206" height="170"></img>
                                <h4>{myBandDetailsArrayAll[index].bandName}</h4>
                                <p>{myBandDetailsArrayAll[index].bandDescription}</p>
                            </div>


                        ))}
                    </div>
            </div>
        </div>
    );
}

export default ViewAllBands
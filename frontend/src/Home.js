import React from "react";
import SideBar from "./Components/SideBar";
import "./Styles/SideBar.css";
import "./Styles/Home.css";
import NavigationBar from "./Components/NavigationBar";
import { useSelector } from "react-redux";
import { display, margin } from "@mui/system";

const Home = () => {

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const users = useSelector((state) => state.users);

    var myUsersArray = [];
    var myBandArray = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].role === 'freelancer') {
            myUsersArray.push(users[i]);
        }
        else if(users[i].role === 'bandManager') {
            myBandArray.push(users[i]);
        }
    }

    myUsersArray = myUsersArray.slice(0, 4);
    myBandArray = myBandArray.slice(0, 4);

    var myBandDetailsArray = [];
    // // // var myBandImageUrls = [];

    const bands = useSelector((state) => state.bands);
    
    for(var j=0; j<bands.length; j++){
        for(var k=0; k<myBandArray.length; k++){
            if(bands[j].idBandManager == myBandArray[k]._id){
                myBandDetailsArray.push(bands[j])
            }
        }
    }

    return (
        <div id="homeDivStyle">
            <NavigationBar />
            <SideBar />
            <div id="homePane">
                <b className="labelStyle">Artists</b>
                <div id="freelancerViewDiv">
                    <div id="imageDataCardsPaneHome">
                        {myUsersArray.map((item, index) => (


                            <div key={index} className="homeCardStyle">
                                <img src={myUsersArray[index].imageURL} alt="Girl in a jacket" className="imgStyle" width="190" height="150"></img>
                                <h4>{myUsersArray[index].firstName}</h4>
                                <p>{myUsersArray[index].bio}</p>
                            </div>


                        ))}
                    </div>
                    <div id="viewButtonDiv">
                        {/* <button id="viewButton">View All</button> */}
                        <a href="/viewallfreelancers">View all</a>
                    </div>
                </div>


                <b className="labelStyle">Bands</b>
                <div id="freelancerViewDiv">
                    <div id="imageDataCardsPaneHome">
                        {myBandDetailsArray.map((item, index) => (


                            <div key={index} className="homeCardStyle">
                                <img src={myBandDetailsArray[index].image_URL} alt="Girl in a jacket" className="imgStyle" width="190" height="150"></img>
                                <h4>{myBandDetailsArray[index].bandName}</h4>
                                <p>{myBandDetailsArray[index].bandDescription}</p>
                            </div>


                        ))}
                    </div>
                    <div id="viewButtonDiv">
                        {/* <button id="viewButton">View All</button> */}
                        <a href="/viewallbands">View all</a>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Home;
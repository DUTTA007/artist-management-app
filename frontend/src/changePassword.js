import React, {useState} from "react";
import "./Styles/updateProfile.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { updateProfile } from './actions/users'
import { changePwd } from "./actions/users";
import NavigationBar from "./Components/NavigationBar";
import SideBar from "./Components/SideBar";
import "./Styles/SideBar.css"; 

const ChangePassword = () => {
  const dispatch = useDispatch();
  const currentUserId = localStorage.getItem('userId');
  const [userPwd, setUserPwd] = useState({ password: '' });
  var pwdStatus = localStorage.getItem('status');
    var myTestLogin;
    var usersArray = {};
    const users = useSelector((state) => state.users);
    for (var i = 0; i < users.length; i++){
        if (users[i]._id === currentUserId) {
            usersArray = users[i];
        }
    }
  const handleCurrentPwd = (e) => {
    const currentUserEmail = localStorage.getItem('email');
    const currentPwdValue = document.getElementById("currentPwdField").value;
      myTestLogin = { email: currentUserEmail, password: currentPwdValue }
      e.preventDefault();
    dispatch(changePwd(myTestLogin));  
  }

  const handleUpdatePwd = (e) => {
    const myPwdData = { password: userPwd.password };
    e.preventDefault();
    dispatch(updateProfile(currentUserId, myPwdData));
  }
return (
    <div id="homeDivStyle">
        <NavigationBar />
        <SideBar/>
          <div id="updateProfileMainDiv">
              <div id="changePwdHeadingDiv">
                  <h2 className="heading">Change Password</h2>
              </div >
              <form id="changePwdFormContainer">
                <div className="changePwdFormSubDiv">
                    { 
                        pwdStatus === "202"? 
                        <div>
                            <div className="changePwdFormSubDivForm">
                                <label className="inputFieldLabelChangePwd inputFieldLabelExtendedChangePwd">Enter Current Password</label>
                                <input id="currentPwdField" className="inputFieldSpaceChangePwd" type="password" name="password" Value={usersArray.password} disabled />
                            </div> 
                            <div id="submitButtonContainerChangePwd">
                                    <div id="submitButtonContainerChangePwd">
                                        <input id="submitButtonUdatePassword" type="submit" value="Check Password" onClick={handleCurrentPwd} />
                                    </div>
                            </div>
                        </div> :
                        <div>
                            <div className="changePwdFormSubDivForm">
                                <label className="inputFieldLabelChangePwd inputFieldLabelExtendedChangePwd">Enter Current Password</label>
                                <input id="currentPwdField" className="inputFieldSpaceChangePwd" type="password" name="password" Value =""/>
                            </div> 
                            <div id="submitButtonContainerChangePwd">
                                    <div id="submitButtonContainerChangePwd">
                                        <input id="submitButtonUdatePassword" type="submit" value="Check Password" onClick={handleCurrentPwd} />
                                    </div>
                            </div>
                        </div>    
                    }
                    {
                        pwdStatus === "202"?
                        <div>  
                            <div className="changePwdFormSubDivForm">
                                <label className="inputFieldLabelChangePwd inputFieldLabelExtendedChangePwd">Enter New Password</label>
                                <input id="currentPwdField" className="inputFieldSpaceChangePwd" type="password" name="password" Value="" onChange={(e) => setUserPwd({...userPwd, password: e.target.value})}/>
                            </div>
                            <div id="submitButtonContainerChangePwd">
                                    <div id="submitButtonContainerChangePwd">
                                        <input id="submitButtonUdatePassword" type="submit" value="Submit" onClick={handleUpdatePwd} />
                                    </div>
                            </div>
                        </div> : null
                    }
                </div>
              </form>
        </div> 
    </div>
  );
};

export default ChangePassword

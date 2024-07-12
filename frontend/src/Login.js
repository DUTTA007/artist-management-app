import React, {useState} from "react";
import "./Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import {login} from './actions/users'

const Login = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const navigateToSignUp = () => {
        navigate('/signup');
    };

    // const navigateToSidebar = () => {
    //     navigate('/home');
    // };

    const [credentials, setCredentials] = useState({email: '', password: ''});

    const handleSubmitL = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    return (
        <div id="homeDiv">
            <div id="loginMainDiv">
            <div id="LoginHeadingDiv">
                <h2 className="heading">Login</h2>
            </div>
            <form id="loginFormContainer">
                <div id="inputFieldsContainer">
                    <div className="inputFieldLogin">
                        <label className="inputFieldLabel">Email</label>
                        <input className="inputFieldSpace" type="text" name="email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
                    </div>
                    <div className="inputFieldLogin">
                        <label className="inputFieldLabel">Password</label>
                        <input className="inputFieldSpace" type="password" name="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    </div>
                </div>
                <div id="navigateSignUpDiv">
                    <label className="navigateSignUpLabel">Not a user? </label>
                    <button id="navigateSignUpButton" onClick={navigateToSignUp}>Sign up</button>
                </div>
                <div id="submitButtonContainer">
                    <input id="submitButton" type="submit" value="Submit" onClick={handleSubmitL}/>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
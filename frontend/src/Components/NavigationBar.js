import React, { useState, useEffect, useRef } from 'react';
import img1 from '../Images/Logo_design.png'
import musicLogo from '../Images/MusicPhactoryLogo.png'
import musicLogo1 from '../Images/MusicPhactoryLogo2.png'
import musicLogo2 from '../Images/MusicPhactoryLogo3.png'
import '../Styles/NavBar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const myName = localStorage.getItem('userName');
    const myRole = localStorage.getItem('userRole');
    var currentRole;
    if(myRole === "bandManager"){
        currentRole = "Band Manager"
    }
    else if(myRole === "client"){
        currentRole = "Client"
    }
    else if(myRole === "freelancer"){
        currentRole = "Freelancer"
    }
    else{
        currentRole = "Admin"
    }

    const [open, setOpen] = useState(false);
    
    let user = JSON.parse(localStorage.getItem('userinfo'));
    const navigate = useNavigate();
    function logOut() {
        localStorage.clear();
        navigate('/');
    }
    return (
        <>
            <div className="NavigationBar">
                <div className="Logo">
                    <img src={musicLogo} style={{ width: 88, height: 92 }} alt="" />
                </div>
                <div className='Title'>
                    <h3 style={{ textIndent: '5%', fontSize: 26, color: '#ffffff' }}>ArtistsBuzz</h3>
                </div>
                <div className='messageDiv'>
                    <h3 className='helloStringStyle'>Hello, {myName}!</h3>
                    <p id='roleMessage'>{currentRole}</p>
                </div>
                <div className='userProfileIconDiv' onClick={() => { setOpen(!open) }}>
                        <AccountCircleIcon style={{ fontSize: '40px', color: 'white' }} />
                </div>
                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <ul id='myUl'>
                        <li className='dropdownItem'>
                            <a href='./updateProfile'> Edit Profile</a>
                        </li>
                        <li className='dropdownItem'>
                            <a href='./changePassword'> Manage Password</a>
                        </li>
                        <li className='dropdownItem'>
                            <a onClick={logOut}> Sign Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default NavigationBar


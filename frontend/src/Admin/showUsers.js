import React, { useState, useEffect } from 'react'
import "../Styles/showUsers.css";
import "../Styles/SideBar.css";
import SideBar from "../Components/SideBar";
import NavigationBar from "../Components/NavigationBar";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import axios from "axios";


const ShowUsers = () => {
  const [selected1, setSelected1] = useState("");
  const [dataFil, setDataFil] = useState([])
  const url15 = 'http://localhost:3001/user/filterParam/'
  const url16 = '/value/'

  const changeHandler1 = e => {
        setSelected1(e.target.value);
    };

  const options = ['Instrument', 'Role', 'First Name', 'Last Name', 'Contact Number', 'Email'];
  const [defaultOption, setDefaultOption] = useState(options[0]);
  const users = useSelector((state) => state.users);

  const handleFilter = (e) => {
  var myChoice = defaultOption.value;
  var myFinalChoice;
    
  if (myChoice === 'First Name') {
    myFinalChoice = 'firstName'
  }
  else if (myChoice === 'Last Name') {
    myFinalChoice = 'lastName'
  }
  else if (myChoice === 'Contact Number') {
    myFinalChoice = 'contactNumber'
  }
  else if (myChoice === 'Email') {
    myFinalChoice = 'email'
  }
  else if (myChoice === 'Instrument') {
    myFinalChoice = 'instrument'
  }
  else {
    myFinalChoice = 'role'
  }
    
    var myFilterValue = document.getElementById("filterText").value;
    e.preventDefault();
    axios.get(`${url15}${myFinalChoice}${url16}${myFilterValue}`).then((response) => {
            console.log("This is axios direct call inside Show Users filtered...",response.data)
            setDataFil(response.data);
        });
  }

  return (
    <div>
      <NavigationBar />
      <SideBar />
      <div className='wrapperDiv'>
        <div className='mainFilterPane'>
          <div className='catDiv'>
            <Dropdown classname="dropDownAndLabelDiv" options={options} value={""} onChange={setDefaultOption} placeholder="Filter By" />
          </div>
          <div className='filterInputStyle'>
            <input id='filterText' type="text" name="enterValue" placeholder="Type here" Value="" />
          </div>
          <div className='filterButtonContainer'>
            <Button id= "filterButton" onClick={handleFilter}> Filter </Button>
          </div>

          <div className='radioStyle'>
              <input type="radio" name="all" value="all" checked={selected1 === "all"} onChange={changeHandler1}/>
              <label>View All</label>
          </div>
          <div className='radioStyle'>
              <input type="radio" value="filter" name="filter" checked={selected1 === "filter"} onChange={changeHandler1} />
              <label>View Filtered</label>
          </div>
          
        </div>

        {
          selected1 === "all" ?
            <div className='mainUsersPane'>
              <table className='tableStyle'>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Date Of Birth</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Street Name</th>
                    <th>Street Number</th>
                    <th>Pin Code</th>
                    <th>Company Name</th>
                    <th>Role</th>
                    <th>Instrument</th>
                    <th>Bio</th>
                  </tr>
                </thead>
            
                <tbody>
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td>{users[index].firstName}</td>
                      <td>{users[index].lastName}</td>
                      <td>{users[index].contactNumber}</td>
                      <td>{users[index].email}</td>
                      <td>{users[index].dateOfBirth}</td>
                      <td>{users[index].address.city}</td>
                      <td>{users[index].address.country}</td>
                      <td>{users[index].address.streetName}</td>
                      <td>{users[index].address.streetNumber}</td>
                      <td>{users[index].address.pinCode}</td>
                      <td>{users[index].companyName}</td>
                      <td>{users[index].role}</td>
                      <td>{users[index].instrument}</td>
                      <td>{users[index].bio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> : null
        }

        {
          selected1 === "filter" ?
             <div className='mainUsersPane'>
          <table className='tableStyle'>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>City</th>
              <th>Country</th>
              <th>Street Name</th>
              <th>Street Number</th>
              <th>Pin Code</th>
              <th>Company Name</th>
              <th>Role</th>
              <th>Instrument</th>
              <th>Bio</th>
            </tr>
            </thead>
            
            <tbody>
              {dataFil.map((item, index) => (
              <tr key={index}>
              <td>{dataFil[index].firstName}</td>
              <td>{dataFil[index].lastName}</td>
              <td>{dataFil[index].contactNumber}</td>
              <td>{dataFil[index].email}</td>
              <td>{dataFil[index].dateOfBirth}</td>
              <td>{dataFil[index].address.city}</td>
              <td>{dataFil[index].address.country}</td>
              <td>{dataFil[index].address.streetName}</td>
              <td>{dataFil[index].address.streetNumber}</td>
              <td>{dataFil[index].address.pinCode}</td>
              <td>{dataFil[index].companyName}</td>
              <td>{dataFil[index].role}</td>
              <td>{dataFil[index].instrument}</td>
              <td>{dataFil[index].bio}</td>
              </tr>
              ))}
            </tbody>
          </table>
             </div> : null
        }  
      </div>
    </div>
  )
}
export default ShowUsers

import React, {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const NavBarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Event Requests",
        icon: <EditLocationAltIcon/>,
        link: "/eventrequests"
    },
    {
        title: "Add Request",
        icon: <AddBoxIcon/>,
        link: "/addrequest"
    },
];
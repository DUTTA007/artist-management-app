import React, {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventRequestsBand from "../Admin/EventRequestsBand";

export const SideBarData = [
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

export const SideBarDataClient = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Add Client Request",
        icon: <AddBoxIcon/>,
        link: "/addeventclientrequest"
    },
    {
        title: "My Requests",
        icon: <AddBoxIcon/>,
        link: "/myrequestsclient"
    },
];

export const SideBarDataAdmin = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Band Events",
        icon: <EditLocationAltIcon/>,
        link: "/eventrequestsforband"
    },
    {
        title: "Solo Events",
        icon: <EditLocationAltIcon/>,
        link: "/eventrequestsforsolo"
    },
    {
        title: "Artist Requests",
        icon: <EditLocationAltIcon/>,
        link: "/eventrequestsforartists"
    },
    {
        title: "View Users",
        icon: <AddBoxIcon/>,
        link: "/showUsers"
    },
    {
        title: "View All Requests",
        icon: <AddBoxIcon/>,
        link: "/viewallclientrequests"
    },
    {
        title: "Pagination",
        icon: <AddBoxIcon/>,
        link: "/viewalluserspagination"
    },
];

export const SideBarDataFreelancer = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Solo Event Requests",
        icon: <EditLocationAltIcon/>,
        link: "/soloeventrequestsfreelancer"
    },
    {
        title: "Requests from bands",
        icon: <AddBoxIcon/>,
        link: "/bandrequestsfreelancer"
    },
    {
        title: "My Events",
        icon: <AddBoxIcon/>,
        link: "/myeventsfreelancer"
    }
];

export const SideBarDataBandManager = [
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
    {
        title: "My Band Events",
        icon: <AddBoxIcon/>,
        link: "/myeventsband"
    }
];
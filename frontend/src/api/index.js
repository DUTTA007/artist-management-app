import axios from 'axios';

const url1 = 'http://localhost:3001/api/user'
const url2 = 'http://localhost:3001/user/signup'
const url3 = 'http://localhost:3001/user/login'
const url4 = 'http://localhost:3001/api/artistRequests'
const url8 = 'http://localhost:3001/api/band'
const url9 = 'http://localhost:3001/api/clientLeads/id'
const url10 = 'http://localhost:3001/api/clientLeads'
const url14 = 'http://localhost:3001/api/artistRequests/id'
const url18 = 'http://localhost:3001/band'
const url11 = 'http://localhost:3001/band/id' 
const url15 = 'http://localhost:3001/user/filterParam/'
const url16 = '/value/'
const url7 = 'http://localhost:3001/user/id/'
const url17 = 'http://localhost:3001/api/user/id/'
const url19 = 'http://localhost:3002/s3-upload-service/'
const url20 = 'http://localhost:3001/user/pageNo/'
const url21 = '/pageSize/'

export const fetchUsers = (config) => axios.get(url1, config);
export const createUser = (newUser) => axios.post(url2, newUser);
export const login = (creds) => axios.post(url3, creds);
export const addClientRequest = (reqDetails, config) => axios.post(url10, reqDetails, config);
export const createBand = (newBand) => axios.post(url18, newBand);
export const fetchBands = (config) => axios.get(url8, config);
export const updateLeads = (clickedId, updatedLeadData, config) => axios.put(`${url9}/${clickedId}`, updatedLeadData, config);
export const fetchClientLeads = (config) => axios.get(url10, config);
export const addArtistRequest = (newRequest, config) => axios.post(url4, newRequest, config);
export const fetchArtistRequests = (config) => axios.get(url4, config);
export const updateArtistReq = (artistReqId, updatedArtistReqData, config) => axios.put(`${url14}/${artistReqId}`, updatedArtistReqData, config);
export const updateBand = (bandId, updatedBandData) => axios.put(`${url11}/${bandId}`, updatedBandData);
export const fetchFilteredUsers = (filterName, filterValue) => axios.get(`${url15}${filterName}${url16}${filterValue}`);
export const updateProfile = (userId, updatedUserData) => axios.put(`${url7}${userId}`, updatedUserData)  //(url7+currentId, updatedUserData)   ///GB
export const fetchUserById = (userId, config) => axios.get(`${url17}${userId}`, config);
export const s3Upload = (newImage, headers) => axios.post(url19, newImage, headers);
export const paginateUsers = (pageNo, pageSize) => axios.get(`${url20}${pageNo}${url21}${pageSize}`);





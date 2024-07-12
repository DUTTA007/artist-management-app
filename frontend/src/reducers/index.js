import { combineReducers } from 'redux';
import users from './users'
import client from './client'
import bands from './bands';
import artistRequests from './artistRequests';
import filteredUsers from './filteredUsers';
import userById from './userById';
import s3ImageUpload from './s3ImageUpload';
import paginatedUsers from './paginatedUsers';

export default combineReducers({ users, client, bands, artistRequests, filteredUsers, userById, s3ImageUpload, paginatedUsers });
// export default combineReducers({ client });
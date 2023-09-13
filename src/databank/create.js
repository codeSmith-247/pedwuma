import axios from 'axios';
import {base, encrypt} from './config';
import { getItem, ipInfo } from './read';

export const createJob = (data) => {

    return  axios.post(`${base}/createJob`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const createUser = (data) => {

    return  axios.post(`${base}/createUser`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const createProposal = (data) => {

    return  axios.post(`${base}/createProposal`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const setItem = (item, value) => {
    localStorage.setItem(item, encrypt(value));
}

export const sendVerification = (email) => {
    let data = new FormData();

    data.append('email', email);

    return  axios.post(`${base}/sendEmailVerification`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const sendChat = (data) => {

    return  axios.post(`${base}/chats/send`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const createProfileView = (id) => {
    let data = ipInfo();

    let viewData = new FormData();

    viewData.append('id', id);

    Object.keys(data).map( key => {
        viewData.append(`${key}`, data[`${key}`]);
    })

    return  axios.post(`${base}/view/skilled`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}




export default {
    createJob,
    createUser,
    setItem,
    sendVerification,
    createProfileView,

    createProposal,
}
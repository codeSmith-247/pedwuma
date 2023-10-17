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

export const createSkilledJob = (data) => {

    return  axios.post(`${base}/createSkilledJob`, data, {
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

export const createPortfolio = (data) => {

    return  axios.post(`${base}/createPortfolio`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const createAppointment = (data) => {

    return  axios.post(`${base}/createAppointment`, data, {
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

export const sendMessage = (data) => {
    return axios.post(`${base}/sendMessage`, data, {
        headers: {
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

export const awardJobs = (jobs, id) => {
    let data = new FormData();

    data.append('job_ids', jobs);
    data.append('id', id);

    return  axios.post(`${base}/awardJobs`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const completeJobs = (jobs, id) => {
    let data = new FormData();

    data.append('job_ids', jobs);
    data.append('id', id);

    return  axios.post(`${base}/completeJobs`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const postReview = (data) => {

    return  axios.post(`${base}/postReview`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default {
    createJob,
    createSkilledJob,
    createUser,
    setItem,
    sendVerification,
    createProfileView,

    createProposal,
    createPortfolio,
    createAppointment,
    
    awardJobs,
    completeJobs,
    postReview,

    sendChat,
    sendMessage,
}
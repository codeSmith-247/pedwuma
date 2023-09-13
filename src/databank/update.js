import axios from 'axios';
import {base} from './config';
import { getItem } from './read';


export const updateJob = (data) => {

    return  axios.post(`${base}/updateJob`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const setProposalStates = (id, status) => {
    let data = new FormData();
    data.append('id', id);
    data.append('status', status)

    return  axios.post(`${base}/setProposal`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const updateEmployer = (data) => {

    return  axios.post(`${base}/updateEmployer`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default {
    updateJob,
    updateEmployer,
    setProposalStates,
}
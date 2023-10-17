import axios from 'axios';
import {base} from './config';
import { getItem } from './read';


export const deleteJob = (id) => {

    let data = new FormData();
    data.append('id', id);

    return  axios.post(`${base}/deleteJob`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const deletePortfolio = (id) => {

    let data = new FormData();
    data.append('id', id);

    return  axios.post(`${base}/deletePortfolio`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default {
    deleteJob,
    deletePortfolio,
}
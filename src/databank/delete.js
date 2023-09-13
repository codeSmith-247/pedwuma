import axios from 'axios';
import {base} from './config';
import { getItem } from './read';


export const deleteJob = (data) => {

    return  axios.post(`${base}/updateJob`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export default {
    deleteJob,
}
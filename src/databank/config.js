import { useQuery as useQueryOriginal } from 'react-query';
import CryptoJS from 'crypto-js';

// export const base = "https://localhost/pedwuma/backend";
export const base = "https://pedwuma.com/backend";
export const url = "";

const secretKey = '@mysecrete@key@200';

export function encrypt(token) {
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString().replaceAll('+','xNkt').replaceAll('/','p51Rd').replaceAll('=','Mfm6');
    return encryptedToken;
}

export function decrypt(encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken.replaceAll('xNkt', '+').replaceAll('p51Rd', '/').replaceAll('Mfm6', '='), secretKey);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
}

export function timeAgo(timestamp) {
    // Parse the timestamp string into a Date object
    const timestampDate = new Date(timestamp?.replace(' ', 'T')); // Replace space with 'T' for proper parsing

    // Calculate the time difference in seconds
    const seconds = Math.floor((Date.now() - timestampDate) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(seconds / interval.seconds);

        if (count >= 1) {
            return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
        }
    }

    return 'just now';
}

// Create a custom useQuery function that wraps the original useQuery
export const useQuery = (queryKey, options) => {
  const queryResult = useQueryOriginal(queryKey, options);

  setTimeout(() => {
    document.querySelector('to-lang-trigger');
  })

  return queryResult;
};


export default {
    base,
    url,
    encrypt,
    decrypt,
    timeAgo,
    useQuery
};
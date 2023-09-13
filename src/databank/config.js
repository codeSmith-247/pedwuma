import CryptoJS from 'crypto-js';

export const base = "https://localhost/pedwuma/backend";
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
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
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


export default {
    base,
    url,
    encrypt,
    decrypt,
    timeAgo,
};
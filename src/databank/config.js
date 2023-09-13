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

export default {
    base,
    url,
    encrypt,
    decrypt,
};
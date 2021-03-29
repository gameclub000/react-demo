import { message } from 'antd';
import axios from 'axios';

export const handleProviderSuccess = (response) => {
    const info = response?.data || {};
    info.tx = [];
    return info;
};

export const handleProviderError = (error, notification = message) => {
    notification.error('System Error, Please try again!');
    return error;
};

const provider = (blockHash) => {
    return axios.get(`https://blockchain.info/rawblock/${blockHash}`);
};

const response = (blockHash) =>
    provider(blockHash)
        .then((res) => {
            return handleProviderSuccess(res);
        })
        .catch((error) => {
            return handleProviderError(error);
        });

export default response;

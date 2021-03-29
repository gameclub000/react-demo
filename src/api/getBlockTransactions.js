import { message } from 'antd';
import axios from 'axios';

export const handleProviderSuccess = (res, notification = message) => {
    let result = {};
    if (res.data?.code === 0) {
        result = res.data;
    } else {
        notification.error('System Error, Please try again!');
    }
    return result;
};

export const handleProviderError = (error, notification = message) => {
    notification.error('System Error, Please try again!');
    return error;
};

const provider = (page, size, blockHash) =>
    axios
        .get(`/api/blockTransactions/${blockHash}?page=${page}&size=${size}`)
        .then((res) => {
            return handleProviderSuccess(res);
        })
        .catch((error) => {
            return handleProviderError(error);
        });

export default provider;

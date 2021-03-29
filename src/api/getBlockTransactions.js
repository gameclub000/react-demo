import { message } from 'antd';
import axios from 'axios';

export const handleProviderSuccess = (response, page, size, blockHash) => {
    const records = response?.data?.tx || [];
    const length = records.length;
    const list = records.splice(
        (Number(page) - 1) * Number(size),
        Number(size)
    );
    return {
        page,
        size,
        total: length > 0 ? length : 0,
        hash: blockHash,
        list
    };
};

export const handleProviderError = (error, notification = message) => {
    notification.error('System Error, Please try again!');
    return error;
};

const provider = (blockHash) => {
    return axios.get(`https://blockchain.info/rawblock/${blockHash}`);
};

const response = (page, size, blockHash) =>
    provider(blockHash)
        .then((res) => {
            return handleProviderSuccess(res, page, size, blockHash);
        })
        .catch((error) => {
            return handleProviderError(error);
        });

export default response;

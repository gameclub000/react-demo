import response, {
    handleProviderSuccess,
    handleProviderError
} from './getBlockTransactions';
import axios from 'axios';

jest.mock('axios');

describe('API getBlockTransactions', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('shoud handleProviderSuccess handle response', () => {
        const page = 1;
        const size = 2;
        const blockHash = 'xxx';
        const response = {
            data: {
                tx: [0, 1, 2, 3, 4, 5, 6]
            }
        };
        const result = handleProviderSuccess(response, page, size, blockHash);
        expect(result).toEqual({
            page,
            size,
            total: 7,
            hash: blockHash,
            list: [0, 1]
        });
    });

    it('shoud handleProviderError call notification.error', () => {
        const notification = {
            error: jest.fn()
        };
        handleProviderError('error', notification);
        expect(notification.error).toBeCalled();
    });

    it('should call handleProviderSuccess with response after axios response result', async () => {
        const page = 1;
        const size = 2;
        const blockHash = 'xxx';
        const result = {
            data: {
                tx: [0, 1, 2, 3, 4, 5, 6]
            }
        };
        axios.get.mockResolvedValue(result);
        return response(page, size, blockHash).then((res) => {
            expect(res).toEqual({
                page,
                size,
                total: 7,
                hash: blockHash,
                list: [0, 1]
            });
        });
    });
});

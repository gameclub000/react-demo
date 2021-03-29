import provider, {
    handleProviderSuccess,
    handleProviderError
} from './getBlockTransactions';
import axios from 'axios';

jest.mock('axios');

describe('API getBlockTransactions', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('shoud handleProviderSuccess handle response', () => {
        const response = {
            data: {
                code: 0,
                data: 'ok'
            }
        };
        const result = handleProviderSuccess(response);
        expect(result).toEqual(response.data);
    });

    it('shoud handleProviderSuccess call notification.error when data invalid', () => {
        const notification = {
            error: jest.fn()
        };
        const response = {
            data: {
                code: -1,
                data: 'ok'
            }
        };
        handleProviderSuccess(response, notification);
        expect(notification.error).toBeCalled();
    });

    it('shoud handleProviderError call notification.error', () => {
        const notification = {
            error: jest.fn()
        };
        handleProviderError('error', notification);
        expect(notification.error).toBeCalled();
    });

    it('should call handleProviderSuccess with response after axios response result', async () => {
        const result = {
            data: {
                code: 0,
                data: 'ok'
            }
        };
        axios.get.mockResolvedValue(result);
        return provider('blockHash').then((res) => {
            expect(res).toEqual(result.data);
        });
    });
});

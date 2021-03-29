import provider, {
    handleProviderSuccess,
    handleProviderError
} from './getBlockInfo';
import axios from 'axios';

jest.mock('axios');

describe('API getBlockInfo', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('shoud handleProviderSuccess handle response', () => {
        const response = {
            data: {
                tx: []
            }
        };
        const result = handleProviderSuccess(response);
        expect(result).toEqual(response.data);
    });

    it('shoud handleProviderError call notification.error', () => {
        const notification = {
            error: jest.fn()
        };
        handleProviderError('error', notification);
        expect(notification.error).toBeCalled();
    });

    it('should call handleProviderSuccess with response after axios response result', async () => {
        const response = {
            data: {
                tx: []
            }
        };
        axios.get.mockResolvedValue(response.data);
        return provider('blockHash').then((res) => {
            expect(res).toEqual(response.data);
        });
    });
});

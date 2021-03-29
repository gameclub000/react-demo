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
                code: 0,
                data: 'ok'
            }
        };
        const result = handleProviderSuccess(response);
        expect(result).toEqual('ok');
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
            expect(res).toEqual('ok');
        });
    });
});

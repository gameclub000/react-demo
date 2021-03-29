import reducer, { initialState, getData } from './BlockInfoSlice';
import {
    STATUS_FULFILLED,
    STATUS_IDLE,
    STATUS_PENDING
} from '../../config/contants';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockApi = () => ['mock'];
const mockApiError = () => {
    throw new Error('error');
};

describe('BlockInfoSlice', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should initialState status equal to STATUS_IDLE', () => {
        expect(initialState.status).toBe(STATUS_IDLE);
    });

    it('should sets status after fetchList is pending', () => {
        const action = { type: getData.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            error: null,
            data: {},
            status: STATUS_PENDING
        });
    });

    it('should dispatch fulfilled with response after fetch success', () => {
        const store = mockStore(initialState);

        // Return the promise
        return store
            .dispatch(getData({ api: mockApi, currentBlock: '' }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(getData.pending().type);
                expect(actions[1].type).toEqual(getData.fulfilled().type);
                expect(actions[1].payload).toEqual(mockApi());
            });
    });

    it('should handle response after fetch success', () => {
        const data = 'data';
        const action = {
            type: getData.fulfilled.type,
            payload: data
        };

        const state = reducer(initialState, action);

        expect(state.status).toEqual(STATUS_FULFILLED);
        expect(state.data).toEqual(data);
    });

    it('should dispatch rejected with response after fetch fail', () => {
        const store = mockStore(initialState);
        // Return the promise
        return store.dispatch(getData({ api: mockApiError })).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getData.pending().type);
            expect(actions[1].type).toEqual(getData.rejected().type);
            expect(actions[1].payload.toString()).toEqual('Error: error');
        });
    });

    it('should handle response after fetch fail', () => {
        const action = {
            type: getData.rejected.type,
            error: 'some error'
        };

        const state = reducer(initialState, action);

        expect(state.error).toEqual(action.error);
    });
});

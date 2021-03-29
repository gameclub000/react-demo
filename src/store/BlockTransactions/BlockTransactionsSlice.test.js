import reducer, { initialState, getList } from './BlockTransactionsSlice';
import { STATUS_IDLE, STATUS_PENDING } from '../../config/contants';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockApi = () => ['mock'];
const mockApiError = () => {
    throw new Error('error');
};

describe('BlockTransactionsSlice', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should initialState status equal to STATUS_IDLE', () => {
        expect(initialState.status).toBe(STATUS_IDLE);
    });

    it('should sets status after fetchList is pending', () => {
        const action = { type: getList.pending.type };
        const state = reducer(initialState, action);
        expect(state.status).toEqual(STATUS_PENDING);
    });

    it('should dispatch fulfilled with response after fetch success', () => {
        const store = mockStore(initialState);

        // Return the promise
        return store
            .dispatch(getList({ api: mockApi, page: 1, size: 10 }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(getList.pending().type);
                expect(actions[1].type).toEqual(getList.fulfilled().type);
                expect(actions[1].payload).toEqual(mockApi());
            });
    });

    it('should handle response after fetch success', () => {
        const data = ['data'];
        const action = {
            type: getList.fulfilled.type,
            payload: {
                list: data,
                page: 0,
                total: 100
            }
        };

        const state = reducer(initialState, action);

        expect(state.list).toEqual(data);
        expect(state.page).toEqual(0);
        expect(state.total).toEqual(100);
    });

    it('should dispatch rejected with response after fetch fail', () => {
        const store = mockStore(initialState);
        // Return the promise
        return store.dispatch(getList({ api: mockApiError })).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(getList.pending().type);
            expect(actions[1].type).toEqual(getList.rejected().type);
            expect(actions[1].payload.toString()).toEqual('Error: error');
        });
    });

    it('should handle response after fetch fail', () => {
        const action = {
            type: getList.rejected.type,
            error: 'some error'
        };

        const state = reducer(initialState, action);

        expect(state.error).toEqual(action.error);
    });
});

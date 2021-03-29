import {
    STATUS_FAILED,
    STATUS_FULFILLED,
    STATUS_IDLE,
    STATUS_PENDING
} from '../../config/contants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getBlockTransactions from '../../api/getBlockTransactions';

const ACTION_LIST = 'BlockTransactions/fetchList';
const PAGE_SIZE = 10;

export const initialState = {
    currentBlock: '',
    list: [],
    page: 1,
    total: 0,
    status: STATUS_IDLE,
    error: null
};

export const getList = createAsyncThunk(
    ACTION_LIST,
    async (
        { api = getBlockTransactions, page = 1, currentBlock },
        { getState, rejectWithValue }
    ) => {
        try {
            const { currentBlock: defaultBlock } =
                getState()?.BlockTransactions || {};
            const response = await api(
                page,
                PAGE_SIZE,
                currentBlock || defaultBlock
            );
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const slice = createSlice({
    name: 'BlockTransactions',
    initialState,
    reducers: {},
    extraReducers: {
        [getList.pending]: (state) => {
            state.status = STATUS_PENDING;
        },
        [getList.fulfilled]: (state, action) => {
            state.status = STATUS_FULFILLED;
            const { list = [], page = 1, total = 0, hash = '' } =
                action.payload?.data || {};
            state.list = list;
            state.page = page;
            state.total = total;
            state.currentBlock = hash;
        },
        [getList.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectBlockTransactions = (state) => {
    let list = state.BlockTransactions.list;
    return list;
};

export const selectBlockTransactionsStatus = (state) =>
    state.BlockTransactions.status;

export const selectPagination = (state) => {
    return {
        total: state.BlockTransactions.total,
        current: state.BlockTransactions.page,
        pageSize: PAGE_SIZE,
        showSizeChanger: false
    };
};

export default slice.reducer;

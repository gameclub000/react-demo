import {
    STATUS_FAILED,
    STATUS_FULFILLED,
    STATUS_IDLE,
    STATUS_PENDING
} from '../../config/contants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getBlockInfo from '../../api/getBlockInfo';

const ACTION_DATA = 'BlockInfo/fetchData';

export const initialState = {
    data: {},
    status: STATUS_IDLE,
    error: null
};

export const getData = createAsyncThunk(
    ACTION_DATA,
    async ({ api = getBlockInfo, currentBlock }, { rejectWithValue }) => {
        try {
            const response = await api(currentBlock);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const slice = createSlice({
    name: 'BlockInfo',
    initialState,
    reducers: {},
    extraReducers: {
        [getData.pending]: (state) => {
            state.status = STATUS_PENDING;
        },
        [getData.fulfilled]: (state, action) => {
            state.status = STATUS_FULFILLED;
            state.data = action.payload;
        },
        [getData.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.error;
        }
    }
});

export const selectBlockInfo = (state) => {
    let data = state.BlockInfo.data;
    return data;
};

export const selectBlockInfoStatus = (state) => state.BlockInfo.status;

export default slice.reducer;

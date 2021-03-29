import { configureStore } from '@reduxjs/toolkit';
import BlockTransactionsReducer from '../store/BlockTransactions/BlockTransactionsSlice';
import BlockInfoReducer from '../store/BlockInfo/BlockInfoSlice';

export default configureStore({
    reducer: {
        BlockTransactions: BlockTransactionsReducer,
        BlockInfo: BlockInfoReducer
    }
});

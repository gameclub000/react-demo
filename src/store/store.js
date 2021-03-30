import { configureStore } from '@reduxjs/toolkit';
import BlockTransactionsReducer from './BlockTransactions/BlockTransactionsSlice';
import BlockInfoReducer from './BlockInfo/BlockInfoSlice';

export default configureStore({
    reducer: {
        BlockTransactions: BlockTransactionsReducer,
        BlockInfo: BlockInfoReducer
    }
});

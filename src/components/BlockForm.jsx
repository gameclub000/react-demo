import { Button, Card, Form, Input } from 'antd';
import { useState } from 'react';
import { getList } from '../store/BlockTransactions/BlockTransactionsSlice';
import { getData } from '../store/BlockInfo/BlockInfoSlice';
import { useDispatch } from 'react-redux';

export const DEFAULT_BLOCK_HASH =
    '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

const BlockForm = () => {
    const dispatch = useDispatch();
    const [currentBlock, setCurrentBlock] = useState(DEFAULT_BLOCK_HASH);

    const handleCurrentBlockChange = (e) => setCurrentBlock(e.target.value);

    const handleSubmit = () => {
        dispatch(
            getData({
                currentBlock: DEFAULT_BLOCK_HASH
            })
        );
        dispatch(
            getList({
                page: 1,
                currentBlock
            })
        );
    };

    return (
        <Card>
            <Form title="form" onSubmitCapture={handleSubmit}>
                <Input
                    title="input"
                    value={currentBlock}
                    onChange={handleCurrentBlockChange}
                />
                <Button htmlType="submit" type="primary">
                    Search
                </Button>
            </Form>
        </Card>
    );
};

export default BlockForm;

import { Button, Card, Form, Input } from 'antd';
import { useState } from 'react';
import { getList } from '../store/BlockTransactions/BlockTransactionsSlice';
import { getData } from '../store/BlockInfo/BlockInfoSlice';
import { useDispatch } from 'react-redux';

const DEFAULT_BLOCK_HASH =
    '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

const BlockForm = () => {
    const dispatch = useDispatch();
    const [currentBlock, setCurrentBlock] = useState(DEFAULT_BLOCK_HASH);

    const handleCurrentBlockChange = (e) => setCurrentBlock(e.target.value);

    const handleSubmit = () => {
        dispatch(
            getList({
                page: 1,
                currentBlock
            })
        );
        dispatch(
            getData({
                currentBlock
            })
        );
    };

    return (
        <Card>
            <Form onSubmitCapture={handleSubmit}>
                <Form.Item>
                    <Input
                        value={currentBlock}
                        onChange={handleCurrentBlockChange}
                    />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                    Search
                </Button>
            </Form>
        </Card>
    );
};

export default BlockForm;

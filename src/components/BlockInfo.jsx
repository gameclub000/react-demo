import React from 'react';
import { useSelector } from 'react-redux';
import { STATUS_PENDING } from '../config/contants';
import {
    selectBlockInfo,
    selectBlockInfoStatus
} from '../store/BlockInfo/BlockInfoSlice';
import { Card, Descriptions, Spin } from 'antd';
import moment from 'moment';

const BlockInfo = () => {
    const blockInfo = useSelector(selectBlockInfo);
    const status = useSelector(selectBlockInfoStatus);

    if (status === STATUS_PENDING) {
        return (
            <Card style={{ marginTop: '10px' }}>
                <Spin />
            </Card>
        );
    }

    return (
        <Card style={{ marginTop: '10px' }}>
            <Descriptions title="Block" bordered>
                <Descriptions.Item label="Hash">
                    {blockInfo?.hash}
                </Descriptions.Item>
                <Descriptions.Item label="Confirmations">
                    Unknown
                </Descriptions.Item>
                <Descriptions.Item label="Timestamp">
                    {moment(blockInfo?.time * 1000).format(
                        'YYYY-MM-DD HH:mm:ss'
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Height">
                    {blockInfo?.hash}
                </Descriptions.Item>
                <Descriptions.Item label="Miner">Unknown</Descriptions.Item>
                <Descriptions.Item label="Number of Transactions">
                    {blockInfo?.n_tx}
                </Descriptions.Item>
                <Descriptions.Item label="Difficulty">
                    Unknown
                </Descriptions.Item>
                <Descriptions.Item label="Merkle root">
                    {blockInfo?.mrkl_root}
                </Descriptions.Item>
                <Descriptions.Item label="Version">
                    {blockInfo?.ver}
                </Descriptions.Item>
                <Descriptions.Item label="Bits">
                    {blockInfo?.bits}
                </Descriptions.Item>
                <Descriptions.Item label="Weight">
                    {blockInfo?.weight} WU
                </Descriptions.Item>
                <Descriptions.Item label="Size">
                    {blockInfo?.size} bytes
                </Descriptions.Item>
                <Descriptions.Item label="Nonce">
                    {blockInfo?.nonce}
                </Descriptions.Item>
                <Descriptions.Item label="Transaction Volume">
                    Unknown
                </Descriptions.Item>
                <Descriptions.Item label="Block Reward">
                    Unknown
                </Descriptions.Item>
                <Descriptions.Item label="Fee Reward">
                    Unknown
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default BlockInfo;

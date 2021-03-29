import React from 'react';
import { Table, Card, Space, Button } from 'antd';
import {
    getList,
    selectPagination,
    selectBlockTransactions,
    selectBlockTransactionsStatus
} from '../store/BlockTransactions/BlockTransactionsSlice';
import { STATUS_FAILED, STATUS_PENDING } from '../config/contants';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DoubleRightOutlined } from '@ant-design/icons';

const AddressLink = (address) => {
    return (
        <a
            href={`https://www.blockchain.com/btc/address/${address}`}
            target="_blank"
            rel="noreferrer"
        >
            {address}
        </a>
    );
};

const BlockTransactions = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectBlockTransactionsStatus);
    const list = useSelector(selectBlockTransactions);
    const pagination = useSelector(selectPagination);

    const columns = [
        {
            title: 'Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (hash, record) => {
                return (
                    <div>
                        <div>Hash: {record?.hash}</div>
                        <div>
                            <Space>
                                <ul style={{ width: '30vw' }}>
                                    {record?.inputs?.map((item) => (
                                        <li key={item.script}>
                                            {item?.prev_out
                                                ? AddressLink(
                                                      item?.prev_out?.addr
                                                  )
                                                : 'COINBASE (Newly Generated Coins)'}
                                        </li>
                                    ))}
                                </ul>
                                <DoubleRightOutlined />
                                <ul style={{ width: '40vw' }}>
                                    {record?.out?.map((item) => (
                                        <li key={item.script}>
                                            <Space>
                                                <div>
                                                    {item.spent
                                                        ? AddressLink(
                                                              item?.addr
                                                          )
                                                        : 'OP_RETURN'}
                                                </div>
                                                <div>
                                                    {item.value / 100000000} BTC
                                                </div>
                                            </Space>
                                        </li>
                                    ))}
                                </ul>
                            </Space>
                        </div>
                        <div>Fee: {record?.fee / 100000000} BTC</div>
                        <div>
                            {moment(record?.time * 1000).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}
                        </div>
                    </div>
                );
            }
        }
    ];

    const onChange = (pagination) => {
        const { current } = pagination;
        dispatch(
            getList({
                page: current
            })
        );
    };

    if (status === STATUS_FAILED) {
        return (
            <Card style={{ marginTop: '10px' }}>
                <Button onClick={() => onChange(1)}>Try Again.</Button>
            </Card>
        );
    }

    return (
        <Card style={{ marginTop: '10px' }}>
            <Table
                rowKey="hash"
                loading={STATUS_PENDING === status}
                dataSource={list}
                columns={columns}
                size="small"
                pagination={pagination}
                onChange={onChange}
            />
        </Card>
    );
};

export default BlockTransactions;

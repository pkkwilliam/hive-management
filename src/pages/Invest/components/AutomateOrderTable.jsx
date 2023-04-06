import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { GET_INVEST_AUTOMATE_ORDERS } from '@/services/hive/automateOrderService';
import { OPEN_ORDER, CLOSE_ORDER } from '@/services/hive/manualOrderService';
import { getEnumLabelByKey, getEnumObjectByKey } from '@/enum/enumUtil';
import {
  AUTOMATE_ORDER_STATUS,
  AUTOMATE_ORDER_STATUS_SELLING,
  AUTOMATE_ORDER_STATUS_SUBMITTED,
  AUTOMATE_ORDER_STATUS_SOLD,
  AUTOMATE_ORDER_STATUS_FILLED,
} from '@/enum/AutomateOrderStatus';
import { Badge, Button, Popover, Progress, Space, Tag } from 'antd';
import { LoadingOutlined, ReloadOutlined, SyncOutlined } from '@ant-design/icons';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import { TRANSACTION_REASONS } from '@/enum/TransactionReason';
import Text from 'antd/lib/typography/Text';

const AutomateOrderPopover = ({ item }) => {
  return (
    <Popover
      content={
        <div>
          <p>{`Open Time: ${item.openTime}`}</p>
          <p>{`Open Order ID: ${item.openOrderId}`}</p>
          <p>{`Open Commission: ${item.openCommission}`}</p>
          <p>{`Open Price (Expected): ${item.expectedOpenPrice}`}</p>
          <p>{`Open Price (Actual): ${item.actualOpenPrice}`}</p>
          <p>{`Open Size (Expected): ${item.expectedOpenSize}`}</p>
          <p>{`Open Size (Actual): ${item.actualOpenSize}`}</p>
          <p>{`Close Time: ${item.closeTime}`}</p>
          <p>{`Close Order ID: ${item.closeOrderId}`}</p>
          <p>{`Close Commission: ${item.closeCommission}`}</p>
          <p>{`Close Price (Expected): ${item.expectedClosePrice}`}</p>
          <p>{`Close Price (Actual): ${item.actualClosePrice}`}</p>
          <p>{`Close Size (Expected): ${item.expectedCloseSize}`}</p>
          <p>{`Close Size (Actual): ${item.actualCloseSize}`}</p>
        </div>
      }
      title={`ID: ${item.id}`}
    >
      <Badge status={item.active ? 'processing' : 'default'} text={<a>{item.id}</a>} />
    </Popover>
  );
};

const StatusBar = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const { active, invest, status } = props.record;
  const enumObject = getEnumObjectByKey(AUTOMATE_ORDER_STATUS, status);
  const spin =
    status === AUTOMATE_ORDER_STATUS_SELLING.key || status === AUTOMATE_ORDER_STATUS_SUBMITTED.key;
  let color;
  if (!active) {
    color = 'default';
  } else if (status === AUTOMATE_ORDER_STATUS_SOLD.key) {
    color = 'error';
  } else if (status === AUTOMATE_ORDER_STATUS_FILLED.key) {
    color = 'success';
  } else {
    color = 'processing';
  }
  return (
    <Tag icon={spin ? <SyncOutlined spin /> : null} color={color}>
      {enumObject.label}
    </Tag>
  );
};

const POLLING_INTERVAL = 5000;

const AutomateOrderTable = (props) => {
  const [polling, setPolling] = useState(undefined);
  const [time, setTime] = useState(new Date());
  const tableRef = useRef();
  const { invest } = props;

  const COLUMNS = [
    {
      title: 'ID',
      dataIndex: ['active'],
      render: (text, item) => <AutomateOrderPopover item={item} />,
    },
    {
      title: 'Status',
      dataIndex: ['status'],
      render: (text, record) => <StatusBar record={record} />,
    },
    {
      title: 'Reason',
      render: (_, { closeReason, openReason }) => (
        <Space direction="vertical" size={0}>
          <Text>{getEnumLabelByKey(TRANSACTION_REASONS, openReason, 'label', '-')}</Text>
          <Text>{getEnumLabelByKey(TRANSACTION_REASONS, closeReason, 'label', '-')}</Text>
        </Space>
      ),
    },
    {
      title: 'Actual Price',
      render: (_, { actualClosePrice, actualOpenPrice }) => (
        <Space direction="vertical" size={0}>
          <Text>${actualOpenPrice ? actualOpenPrice : '-'}</Text>
          <Text>${actualClosePrice ? actualClosePrice : '-'}</Text>
        </Space>
      ),
    },
    // { title: 'Actual Open Price', dataIndex: ['actualOpenPrice'] },
    // {
    //   title: 'Open Reason',
    //   dataIndex: ['openReason'],
    //   renderText: (text) => getEnumLabelByKey(TRANSACTION_REASONS, text, 'label', '-'),
    // },
    // { title: 'Actual Close Price', dataIndex: ['actualClosePrice'] },
    // {
    //   title: 'Close Reason',
    //   dataIndex: ['closeReason'],
    //   renderText: (text) => getEnumLabelByKey(TRANSACTION_REASONS, text, 'label', '-'),
    // },
    { title: 'Actual Size', dataIndex: ['actualOpenSize'] },
    {
      title: 'Target/Difference',
      render: (_, { targetCloseDifference, targetClosePrice }) => (
        <Space direction="vertical" size={0}>
          <Text>${targetClosePrice ? targetClosePrice : '-'}</Text>
          <Text>${targetCloseDifference ? targetCloseDifference : '-'}</Text>
        </Space>
      ),
      tooltip: '1. Target Close Price 2. Difference to Target Close Price',
    },
    // { title: 'Target', dataIndex: ['targetClosePrice'], renderText: (text) => text ?? '-' },
    // {
    //   title: 'Difference',
    //   dataIndex: ['targetCloseDifference'],
    //   renderText: (text) => text ?? '-',
    // },
    {
      title: 'Profit/Total',
      render: (_, { actualOpenSize, profit }) => {
        const totalProfit = profit && actualOpenSize ? (profit * actualOpenSize).toFixed(5) : '-';
        return (
          <Space direction="vertical" size={0}>
            <Text>${profit ? profit : '-'}</Text>
            <Text>${totalProfit}</Text>
          </Space>
        );
      },
      tooltip: '1.Profit Per Share 2. Profit x Size',
    },
    // { title: 'Profit/Total', dataIndex: ['profit'], renderText: (text) => text ?? '-' },
    {
      title: 'Operation',
      valueType: 'option',
      render: (text, record) => {
        return [
          <InactiveableLinkButton
            disabled={!record.active}
            key="close"
            label="Close"
            onClick={() => onClickCloseOrder(record)}
            popConfirm
            popConfirmMessage="Close this order?"
          />,
        ];
      },
    },
  ];

  const onClickOpenOrder = async (invest) => {
    await OPEN_ORDER(invest.id, { actualOpenSize: invest.size });
    tableRef.current.reload();
    return true;
  };

  const onClickCloseOrder = async (record) => {
    await CLOSE_ORDER(record.id, { actualCloseSize: record.invest.size });
    tableRef.current.reload();
    return true;
  };

  const query = async (params, sort, filter) => {
    const result = await GET_INVEST_AUTOMATE_ORDERS(
      {
        ...params,
        investId: invest.id,
      },
      sort,
      filter,
    );
    setTime(new Date());
    return result;
  };

  return (
    <ProTable
      actionRef={tableRef}
      cardBordered
      columns={COLUMNS}
      headerTitle={`Last Updated: ${time.toLocaleTimeString()}`}
      request={query}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
      }}
      polling={polling || undefined}
      toolBarRender={() => [
        <Button
          key="polling"
          onClick={() => {
            if (polling) {
              setPolling(undefined);
              return;
            }
            setPolling(POLLING_INTERVAL);
          }}
        >
          {polling ? <LoadingOutlined /> : <ReloadOutlined />}
          {polling ? 'Stop Polling' : 'Start Polling'}
        </Button>,
        <Button
          key="open"
          type="primary"
          onClick={() => onClickOpenOrder(invest)}
        >{`Open: ${invest.size}`}</Button>,
      ]}
      search={false}
      size="small"
    />
  );
};

export default AutomateOrderTable;

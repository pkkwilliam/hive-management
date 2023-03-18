import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { GET_INVEST_AUTOMATE_ORDERS } from '@/services/hive/automateOrderService';
import { BUY_ORDER, SELL_ORDER } from '@/services/hive/manualOrderService';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { AUTOMATE_ORDER_STATUS } from '@/enum/AutomateOrderStatus';
import { Badge, Button, Popover } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';

const AutomateOrderPopover = ({ item }) => {
  return (
    <Popover
      content={
        <div>
          <p>{`Buy In Time: ${item.buyInTime}`}</p>
          <p>{`Buy In Order ID: ${item.buyInOrderId}`}</p>
          <p>{`Buy In Commission: ${item.buyInCommission}`}</p>
          <p>{`Buy In Price (Expected): ${item.expectedBuyInPrice}`}</p>
          <p>{`Buy In Price (Actual): ${item.actualBuyInPrice}`}</p>
          <p>{`Buy In Size (Expected): ${item.expectedBuyInSize}`}</p>
          <p>{`Buy In Size (Actual): ${item.actualBuyInSize}`}</p>
          <p>{`Sell Out Time: ${item.sellOutTime}`}</p>
          <p>{`Sell Out Order ID: ${item.sellOutOrderId}`}</p>
          <p>{`Sell Out Commission: ${item.sellOutCommission}`}</p>
          <p>{`Sell Out Price (Expected): ${item.expectedSellOutPrice}`}</p>
          <p>{`Sell Out Price (Actual): ${item.actualSellOutPrice}`}</p>
          <p>{`Sell Out Size (Expected): ${item.expectedSellOutSize}`}</p>
          <p>{`Sell Out Size (Actual): ${item.actualSellOutSize}`}</p>
        </div>
      }
      title={`ID: ${item.id}`}
    >
      <Badge status={item.active ? 'processing' : 'default'} text={<a>{item.id}</a>} />
    </Popover>
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
      render: (text, record) => getEnumLabelByKey(AUTOMATE_ORDER_STATUS, record.status),
    },
    { title: 'Actual In Price', dataIndex: ['actualBuyInPrice'] },
    { title: 'Actual Out Price', dataIndex: ['actualSellOutPrice'] },
    { title: 'Actual Size', dataIndex: ['actualBuyInSize'] },
    { title: 'Target', dataIndex: ['targetSellOutPrice'], renderText: (text) => text ?? '-' },
    { title: 'Profit', dataIndex: ['profit'], renderText: (text) => text ?? '-' },
    {
      title: 'Operation',
      valueType: 'option',
      render: (text, record) => {
        return [
          <InactiveableLinkButton
            disabled={!record.active}
            key="sell"
            label="Sell"
            onClick={() => onClickSellOrder(record)}
            popConfirm
            popConfirmMessage="Sell this order?"
          />,
        ];
      },
    },
  ];

  const onClickBuyOrder = async (invest) => {
    await BUY_ORDER(invest.id, { actualBuyInSize: invest.size });
    tableRef.current.reload();
    return true;
  };

  const onClickSellOrder = async (record) => {
    await SELL_ORDER(record.id, { actualSellOutSize: record.invest.size });
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
          key="buy"
          type="primary"
          onClick={() => onClickBuyOrder(invest)}
        >{`Buy: ${invest.size}`}</Button>,
      ]}
      search={false}
      size="small"
    />
  );
};

export default AutomateOrderTable;

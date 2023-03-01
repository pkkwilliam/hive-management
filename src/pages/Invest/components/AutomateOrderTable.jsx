import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { GET_INVEST_AUTOMATE_ORDERS } from '@/services/hive/automateOrderService';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { AUTOMATE_ORDER_STATUS } from '@/enum/AutomateOrderStatus';
import { Badge, Button, Popover } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';

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
];

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
      <Badge status={item.active ? 'processing' : 'default'} text={item.id} />
    </Popover>
  );
};

const POLLING_INTERVAL = 5000;

const AutomateOrderTable = (props) => {
  const [polling, setPolling] = useState(POLLING_INTERVAL);
  const [time, setTime] = useState(new Date());
  const { invest } = props;

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
      cardBordered
      columns={COLUMNS}
      headerTitle={`ID: ${invest.id} | ${
        invest.productName ?? '-'
      } | Last Updated: ${time.toLocaleTimeString()}`}
      request={query}
      options={false}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
      }}
      polling={polling || undefined}
      toolBarRender={() => [
        <Button
          key="polling"
          type="primary"
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
      ]}
      search={false}
      size="small"
    />
  );
};

export default AutomateOrderTable;

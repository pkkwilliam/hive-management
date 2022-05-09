import { CURRENCIES } from '@/enum/currency';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import OrderStatistic from '@/pages/Order/components/OrderStatistic';
import { toDisplayDate } from '@/util/dateUtil';
import { money } from '@/util/numberUtil';
import { Card, Descriptions, Space, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const HEADER_FONT_SIZE = 16;

const CompanyBusinessOrders = (props) => {
  const { orders } = props;
  const COLUMNS = [
    { title: '單號', dataIndex: ['id'] },
    {
      title: '採購單號',
      dataIndex: ['companyBusinessPurchaseOrder'],
      render: (text, record) => (text ? text : '-'),
    },
    {
      title: '創單日期',
      dataIndex: ['createTime'],
      render: (text, record) => toDisplayDate(text, 'YYYY-MM-DD'),
    },
    {
      title: '送貨日期',
      dataIndex: ['deliveryDate'],
      render: (text, record) => (text ? toDisplayDate(text, 'YYYY-MM-DD') : '-'),
    },

    {
      title: '送貨地址',
      render: (text, record) =>
        `${record.deliveryAddress?.street ?? '-'} ${record.deliveryAddress?.unit ?? ''}`,
      search: false,
    },
    { title: '配貨地點', dataIndex: ['distributionShop', 'name'] },
    {
      title: '規格數量',
      render: (text, record) => record.orderItemInfos.length,
      search: false,
    },
    {
      title: '幣種',
      render: (text, record) => getEnumLabelByKey(CURRENCIES, record.currency),
      search: false,
    },
    {
      title: '總價',
      dataIndex: ['cost'],
      render: (text, record) => money(text),
      search: false,
      valueType: 'money',
    },
  ];

  return (
    <Space direction="vertical">
      <Title level={3}>對賬單</Title>
      <Descriptions column={1} size="small">
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="公司名稱"
        >
          {orders[0]?.companyBusiness?.name}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="聯繫人"
        >
          {orders[0]?.companyBusiness?.businessUser?.name}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="聯繫人電話"
        >
          {orders[0]?.companyBusiness?.businessUser?.smsNumber}
        </Descriptions.Item>
      </Descriptions>
      <OrderStatistic orders={orders} />
      <Card size="small" title="訂單">
        <Table
          columns={COLUMNS}
          dataSource={orders}
          options={false}
          pagination={false}
          size="small"
        />
      </Card>
    </Space>
  );
};

export default CompanyBusinessOrders;

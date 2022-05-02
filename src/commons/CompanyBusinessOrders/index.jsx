import { toDisplayDate } from '@/util/dateUtil';
import { StatisticCard } from '@ant-design/pro-card';
import { Card, Descriptions, Space, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const HEADER_FONT_SIZE = 16;

const CompanyBusinessOrders = (props) => {
  const { orders } = props;
  const COLUMNS = [
    { title: '單號', dataIndex: ['id'] },
    {
      title: '創單日期',
      dataIndex: ['createTime'],
      render: (text, record) => toDisplayDate(text, 'YYYY-MM-DD'),
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
      title: '總價',
      dataIndex: ['cost'],
      valueType: 'money',
      search: false,
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
      <BillSummary orders={orders} />
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

const BillSummary = (props) => {
  const { orders } = props;

  return (
    <StatisticCard.Group direction="row">
      <StatisticCard
        statistic={{
          title: '訂單數量',
          value: orders.length,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '總金額',
          value: `$${orders.reduce((previous, current) => previous + current.cost, 0)}`,
        }}
      />
    </StatisticCard.Group>
  );
};

export default CompanyBusinessOrders;

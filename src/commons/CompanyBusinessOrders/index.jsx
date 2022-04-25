import { toDisplayDate } from '@/util/dateUtil';
import ProTable from '@ant-design/pro-table';
import { Descriptions, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const CompanyBusinessOrders = (props) => {
  const { orders } = props;
  const COLUMNS = [
    { title: '單號', dataIndex: ['id'] },
    {
      title: '創單日期',
      dataIndex: ['createTime'],
      renderText: (text, record) => toDisplayDate(text, 'YYYY-MM-DD'),
    },
    {
      title: '送貨地址',
      renderText: (text, record) =>
        `${record.deliveryAddress?.street ?? '-'} ${record.deliveryAddress?.unit ?? ''}`,
      search: false,
    },
    { title: '配貨地點', dataIndex: ['distributionShop', 'name'] },
    {
      title: '規格數量',
      renderText: (text, record) => record.orderItemInfos.length,
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
      <Descriptions column={1}>
        <Descriptions.Item label="公司名稱">{orders[0]?.companyBusiness?.name}</Descriptions.Item>
        <Descriptions.Item label="聯繫人">
          {orders[0]?.companyBusiness?.businessUser?.name}
        </Descriptions.Item>
        <Descriptions.Item label="聯繫人電話">
          {orders[0]?.companyBusiness?.businessUser?.smsNumber}
        </Descriptions.Item>
      </Descriptions>
      <ProTable
        columns={COLUMNS}
        dataSource={orders}
        options={false}
        pagination={false}
        search={false}
      />
    </Space>
  );
};

export default CompanyBusinessOrders;

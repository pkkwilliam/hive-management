import ExportDateRangeButton from '@/commons/ExportDateRangeButton';
import { CURRENCIES } from '@/enum/currency';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ORDER_STATUSES } from '@/enum/orderStatus';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { PAYMENT_STATUSES } from '@/enum/paymentStatus';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { toDisplayDate } from '@/util/dateUtil';
import { Space, Table } from 'antd';
import React from 'react';
import OrderStatistic from './OrderStatistic';

/**
 * @param {formRef, params} props
 */
const OrderExportDateRangeButton = (props) => {
  const COLUMNS = [
    {
      title: '單號',
      dataIndex: ['id'],
    },
    {
      title: '採購單號',
      dataIndex: ['companyBusinessPurchaseOrder'],
      hideInTable: true,
    },
    {
      title: '創單日期',
      dataIndex: ['createTime'],
      render: (text, record) => toDisplayDate(text, 'MM月DD日'),
    },
    {
      title: '狀態',
      dataIndex: ['orderStatus'],
      render: (text, record) => getEnumLabelByKey(ORDER_STATUSES, text),
    },
    {
      title: '支付狀態',
      dataIndex: ['paymentStatus'],
      render: (text, record) => getEnumLabelByKey(PAYMENT_STATUSES, text),
    },
    { title: '客戶', dataIndex: ['companyBusiness', 'name'], search: false },
    {
      title: '送貨地址',
      render: (text, record) =>
        `${record.deliveryAddress?.street ?? '-'} ${record.deliveryAddress?.unit ?? ''}`,
      search: false,
    },
    { title: '配貨地點', dataIndex: ['distributionShop', 'name'], search: false },
    {
      title: '送貨時間',
      dataIndex: ['deliveryDate'],
      render: (text, record) => toDisplayDate(text),
      search: false,
    },
    {
      title: '支付渠道',
      dataIndex: ['paymentChannel'],
      render: (text, record) => getEnumLabelByKey(PAYMENT_CHANNELS, text),
    },
    {
      title: '幣種',
      dataIndex: ['currency'],
      render: (text, record) => getEnumLabelByKey(CURRENCIES, text),
    },

    {
      title: '總價',
      dataIndex: ['cost'],
      valueType: 'money',
      search: false,
    },
    {
      title: '規格數量',
      render: (text, record) => <a>{record.orderItemInfos.length}</a>,
      search: false,
    },
    {
      title: '備註',
      dataIndex: ['remark'],
      search: false,
    },
  ];

  return (
    <ExportDateRangeButton
      columns={COLUMNS}
      formRef={props.formRef}
      params={props.params}
      printContent={(orders) => {
        return (
          <Space direction="vertical">
            <OrderStatistic orders={orders} />
            <Table columns={COLUMNS} dataSource={orders} pagination={false} size="small" />
          </Space>
        );
      }}
      serviceConfig={COMPANY_ORDER_SERVICE_CONFIG}
    />
  );
};

export default OrderExportDateRangeButton;

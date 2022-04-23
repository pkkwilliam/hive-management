import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';

import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import OrderModalForm from './components/OrderModalForm';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { getValueEnum } from '@/enum/enumUtil';
import { ORDER_STATUSES, ORDER_STATUS_ORDER_FINISHED } from '@/enum/orderStatus';
import { PAYMENT_STATUSES, PAYMENT_STATUS_PAID } from '@/enum/paymentStatus';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { toDisplayDate } from '@/util/dateUtil';
import { COMPANY_PRINT_ORDER_BY_ID } from '@/services/hive/printService';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import Text from 'antd/lib/typography/Text';

/**
 * @param {orderPlaceChannel} props
 * @returns
 */
const Order = (props) => {
  const tableRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setShowModalFormVisible] = useState(false);

  const onCreate = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ORDER_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const onDelete = async (record) => {};

  const query = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_ORDER_SERVICE_CONFIG,
      {
        ...params,
        orderPlaceChannel: props.orderPlaceChannel,
        active: true,
      },
      sort,
      filter,
    );
  };

  const onUpdate = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const onChangeModalFormVisible = (visible) => {
    if (!visible) {
      setCurrentRow(undefined);
    }
    setShowModalFormVisible(visible);
  };

  const onClickPrintDistributionList = async (record) => {
    await COMPANY_PRINT_ORDER_BY_ID(record.id);
  };

  const COLUMNS = [
    { title: '單號', dataIndex: ['id'], render: (text, record) => <a>{text}</a> },
    {
      title: '創單日期',
      dataIndex: ['createTime'],
      renderText: (text, record) => toDisplayDate(text),
    },
    { title: '狀態', dataIndex: ['orderStatus'], valueEnum: getValueEnum(ORDER_STATUSES) },
    { title: '支付狀態', dataIndex: ['paymentStatus'], valueEnum: getValueEnum(PAYMENT_STATUSES) },
    { title: '客戶', dataIndex: ['companyBusiness', 'name'] },
    {
      title: '送貨地址',
      renderText: (text, record) =>
        `${record.deliveryAddress?.street ?? '-'} ${record.deliveryAddress?.unit ?? ''}`,
      search: false,
    },
    { title: '配貨地點', dataIndex: ['distributionShop', 'name'] },
    {
      title: '渠道',
      dataIndex: ['orderPlaceChannel'],
      valueEnum: getValueEnum(ORDER_PLACE_CHANNELS),
    },
    {
      title: '支付渠道',
      dataIndex: ['paymentChannel'],
      valueEnum: getValueEnum(PAYMENT_CHANNELS),
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
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="printReceipt" onClick={() => onClickPrintDistributionList(record)}>
          打印配貨單
        </a>,
        record.paymentStatus === PAYMENT_STATUS_PAID.key &&
        record.orderStatus === ORDER_STATUS_ORDER_FINISHED.key ? (
          <Text disabled>修改</Text>
        ) : (
          <a
            key="edit"
            onClick={() => {
              setCurrentRow(record);
              onChangeModalFormVisible(true);
            }}
          >
            修改
          </a>
        ),
        <Popconfirm
          cancelText="取消"
          key="delete"
          onConfirm={() => onDelete(record)}
          okText="確定"
          title="確認刪除?"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        request={query}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="button"
            type="primary"
            onClick={() => onChangeModalFormVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      {props.modalFormComponent({
        onFinish: currentRow ? onUpdate : onCreate,
        onVisibleChange: onChangeModalFormVisible,
        order: currentRow,
        visible: modalFormVisible,
      })}
    </PageContainer>
  );
};

export default Order;

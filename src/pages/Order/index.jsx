import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { getValueEnum } from '@/enum/enumUtil';
import { ORDER_STATUSES, ORDER_STATUS_ORDER_FINISHED } from '@/enum/orderStatus';
import { PAYMENT_STATUSES, PAYMENT_STATUS_PAID } from '@/enum/paymentStatus';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { toDisplayDate } from '@/util/dateUtil';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import OrderDetailModal from './components/OrderDetailModal';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import CreateOrderButton from './components/CreateOrderButton';

/**
 * @param {orderPlaceChannel} props
 * @returns
 */
const Order = (props) => {
  const tableRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [modalFormVisible, setShowModalFormVisible] = useState(false);

  const onCreate = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ORDER_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const onDelete = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, record.id);
    tableRef.current.reload();
    return true;
  };

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

  const onChangeDetailModalVisible = (visible) => {
    if (!visible) {
      console.log('removeeee');
      setCurrentRow(undefined);
    }
    setDetailModalVisible(visible);
  };

  const onChangeModalFormVisible = (visible) => {
    if (!visible) {
      setCurrentRow(undefined);
    }
    setShowModalFormVisible(visible);
  };

  const COLUMNS = [
    {
      title: '單號',
      dataIndex: ['id'],
      render: (text, record) => (
        <a
          onClick={() => {
            setCurrentRow(record);
            onChangeDetailModalVisible(true);
          }}
        >
          {text}
        </a>
      ),
    },
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
        <a
          key="printReceipt"
          onClick={() => {
            setCurrentRow(record);
            onChangeDetailModalVisible(true);
          }}
        >
          打印配貨單
        </a>,
        <InactiveableLinkButton
          disabled={record.orderStatus === ORDER_STATUS_ORDER_FINISHED.key}
          key="edit"
          label="送達"
          onClick={() => {
            onUpdate({ ...record, orderStatus: ORDER_STATUS_ORDER_FINISHED.key });
          }}
          popConfirm
          popConfirmMessage={`${record.id} - 確認送達?`}
        />,
        <InactiveableLinkButton
          disabled={record.paymentStatus === PAYMENT_STATUS_PAID.key}
          key="edit"
          label="收款"
          onClick={() => {
            onUpdate({ ...record, paymentStatus: PAYMENT_STATUS_PAID.key });
          }}
          popConfirm
          popConfirmMessage={`${record.id} - 確認收款成功?`}
        />,
        <InactiveableLinkButton
          disabled={
            record.paymentStatus === PAYMENT_STATUS_PAID.key &&
            record.orderStatus === ORDER_STATUS_ORDER_FINISHED.key
          }
          key="edit"
          label="修改"
          onClick={() => {
            setCurrentRow(record);
            onChangeModalFormVisible(true);
          }}
        />,
        <InactiveableLinkButton
          disabled={
            record.paymentStatus === PAYMENT_STATUS_PAID.key &&
            record.orderStatus === ORDER_STATUS_ORDER_FINISHED.key
          }
          key="delete"
          label="棄單"
          onClick={() => onDelete(record)}
          popConfirm
          popConfirmMessage="確認棄單?"
        />,
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
          <CreatePriorModal
            key="create"
            priorModals={[
              CREATE_PRIOR_MODAL_SHOP,
              CREATE_PRIOR_MODAL_CATEGORY,
              CREATE_PRIOR_MODAL_ITEM,
              CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
            ]}
          >
            <CreateOrderButton />
          </CreatePriorModal>,
        ]}
      />
      {props.modalFormComponent({
        onFinish: currentRow ? onUpdate : onCreate,
        onVisibleChange: onChangeModalFormVisible,
        // doing this because we don't want order to be set when modal is not visible but currentRow is using by others
        order: modalFormVisible ? currentRow : undefined,
        visible: modalFormVisible,
      })}
      <OrderDetailModal
        order={currentRow}
        setModalVisible={onChangeDetailModalVisible}
        visible={detailModalVisible}
      />
    </PageContainer>
  );
};

export default Order;

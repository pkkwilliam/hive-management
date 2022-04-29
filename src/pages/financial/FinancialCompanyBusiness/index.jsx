import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import { COMPANY_BUSINESS_PAYMENT_TYPES } from '@/enum/companyBusinessPaymentType';
import { getValueEnum } from '@/enum/enumUtil';
import { ORDER_STATUS_ORDER_FINISHED } from '@/enum/orderStatus';
import { PAYMENT_STATUS_PENDING } from '@/enum/paymentStatus';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { DatePicker, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import FinancialCompanyBusinessPaymentPendingOrders from './components/FinancialCompanyBusinessPaymentPendingOrders';

const FinancialCompanyBusiness = () => {
  const [createTimeRange, setCreateTimeRange] = useState({
    createDateRangeEnd: undefined,
    createDateRangeStart: undefined,
  });
  const [orders, setOrders] = useState([]);
  const [paymentPendingModalVisible, setPaymentPendingModalVisible] = useState(false);

  const queryCompanyBusiness = async (params, sort, filter) => {
    return await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG,
      params,
      sort,
      filter,
    );
  };

  const orderFinishedPaymentPendingOrders = async (record) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, {
      active: true,
      'companyBusiness.id': record.id,
      orderStatus: ORDER_STATUS_ORDER_FINISHED.key,
      paymentStatus: PAYMENT_STATUS_PENDING.key,
    });
    setOrders(response.data);
  };

  const paymentPendingOrders = async (record) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, {
      active: true,
      'companyBusiness.id': record.id,
      paymentStatus: PAYMENT_STATUS_PENDING.key,
    });
    setOrders(response.data);
  };

  const createTimeBetweenOrders = async (record) => {
    const { createDateRangeEnd, createDateRangeStart } = createTimeRange;
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, {
      active: true,
      'companyBusiness.id': record.id,
      'queryHelperRequest.createTimeRangeEnd': createDateRangeEnd,
      'queryHelperRequest.createTimeRangeStart': createDateRangeStart,
    });
    setOrders(response.data);
  };

  const COLUMNS = [
    { title: '企業名稱', dataIndex: 'name' },
    { title: '外部下單用戶', dataIndex: ['businessUser', 'smsNumber'], search: false },
    { title: '價格模版', dataIndex: ['itemSpecificationPriceTemplate', 'name'] },
    {
      title: '支款方式',
      dataIndex: 'companyBusinessPaymentType',
      valueEnum: getValueEnum(COMPANY_BUSINESS_PAYMENT_TYPES),
    },
    { title: '備註', dataIndex: 'remark', search: false },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => {
        return [
          <a
            key="pending"
            onClick={() => {
              paymentPendingOrders(record);
              setPaymentPendingModalVisible(true);
            }}
          >
            未清賬單
          </a>,
          <a
            key="finishedAndPending"
            onClick={() => {
              orderFinishedPaymentPendingOrders(record);
              setPaymentPendingModalVisible(true);
            }}
          >
            已送達未清賬單
          </a>,
          <InactiveableLinkButton
            disabled={!createTimeRange.createDateRangeEnd || !createTimeRange.createDateRangeStart}
            key="createTimeBetween"
            label="期間賬單"
            onClick={() => {
              createTimeBetweenOrders(record);
              setPaymentPendingModalVisible(true);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={COLUMNS}
        request={queryCompanyBusiness}
        search={false}
        toolBarRender={() => [
          <Space key="dateRange">
            <Text>期間</Text>
            <DatePicker.RangePicker
              onChange={(momments, localDates) =>
                setCreateTimeRange({
                  createDateRangeStart: localDates[0],
                  createDateRangeEnd: localDates[1],
                })
              }
              style={{ margin: 0 }}
            />
          </Space>,
        ]}
      />
      <FinancialCompanyBusinessPaymentPendingOrders
        orders={orders}
        setModalVisible={setPaymentPendingModalVisible}
        visible={paymentPendingModalVisible}
      />
    </PageContainer>
  );
};

export default FinancialCompanyBusiness;

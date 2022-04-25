import { COMPANY_BUSINESS_PAYMENT_TYPES } from '@/enum/companyBusinessPaymentType';
import { getValueEnum } from '@/enum/enumUtil';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useState } from 'react';
import FinancialCompanyBusinessPaymentPendingOrders from './components/FinancialCompanyBusinessPaymentPendingOrders';

const FinancialCompanyBusiness = () => {
  const [currentRow, setCurrentRow] = useState();
  const [paymentPendingModalVisible, setPaymentPendingModalVisible] = useState(false);

  const queryCompanyBusiness = async (params, sort, filter) => {
    return await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG,
      params,
      sort,
      filter,
    );
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
              setCurrentRow(record);
              setPaymentPendingModalVisible(true);
            }}
          >
            未清賬單
          </a>,
          <a key="finishedAndPending">已送貨的未清賬單</a>,
          <a key="betweenDate">期間賬單</a>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable columns={COLUMNS} request={queryCompanyBusiness} search={false} />
      <FinancialCompanyBusinessPaymentPendingOrders
        companyBusiness={currentRow}
        setModalVisible={setPaymentPendingModalVisible}
        visible={paymentPendingModalVisible}
      />
    </PageContainer>
  );
};

export default FinancialCompanyBusiness;

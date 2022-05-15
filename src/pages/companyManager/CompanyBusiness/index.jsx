import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import CompanyBusinessModalForm from './components/CompanyBusinessModalForm';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import CompanyBusinessDeliveryAddressModal from './components/CompanyBusinessDeliveryAddressModal';
import { proTableOnChangeModalVisible } from '@/commons/proTable/proTableUtil';
import CompanyBusinessPriceTemplateModal from './components/CompanyBusinessPriceTemplateModal';
import CreateCompanyBusinessButton from './components/CreateCompanyBusinessButton';
import { queryItemSpecificationPriceTemplate } from '@/commons/proForm/ProFormItemSpecificationPriceTemplate';
import ProTableActiveStatusColumn from '@/commons/proTable/ProTableActiveStatusColumn';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import { getValueEnum } from '@/enum/enumUtil';
import { CURRENCIES } from '@/enum/currency';

const CompanyBusiness = () => {
  const tableRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [deliveryAddresssModalVisible, setDeliveryAddressModalVisible] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [priceTemplateModalVisible, setPriceTemplateModalVisible] = useState(false);

  const createCompanyBusinessService = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const deleteCompanyBusinessService = async (record) => {
    const response = await BEDROCK_DEACTIVATE_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      record.id,
    );
    tableRef.current.reload();
  };

  const queryCompanyBusinessService = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      { ...params },
      sort,
      filter,
    );
  };

  const updateCompanyBusinessService = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    return true;
  };

  const COLUMNS = [
    ProTableActiveStatusColumn(),
    { title: '企業名稱', dataIndex: 'name' },
    { title: '默認幣種', dataIndex: ['defaultCurrency'], valueEnum: getValueEnum(CURRENCIES) },
    { title: '外部下單用戶', dataIndex: ['businessUser', 'smsNumber'], search: false },
    {
      title: '特供價單',
      dataIndex: ['itemSpecificationPriceTemplate', 'name'],
      fieldProps: { showSearch: true },
      key: 'itemSpecificationPriceTemplate.id',
      request: queryItemSpecificationPriceTemplate,
      valueType: 'select',
    },
    // {
    //   title: '支款方式',
    //   dataIndex: 'companyBusinessPaymentType',
    //   search: false,
    //   valueEnum: getValueEnum(COMPANY_BUSINESS_PAYMENT_TYPES),
    // },
    {
      title: '地址數量',
      renderText: (text, record) => record.deliveryAddress.length,
      search: false,
    },
    { title: '備註', dataIndex: 'remark', search: false },
    ProTableOperationColumnButtons(
      (record) => {
        setCurrentRow(record);
        setModalFormVisible(true);
      },
      deleteCompanyBusinessService,
      (text, record) => [
        <InactiveableLinkButton
          disabled={!record.active}
          key="deliveryAddresss"
          label="送貨地址"
          onClick={() => {
            setDeliveryAddressModalVisible(true);
            setCurrentRow(record);
          }}
        />,
        <InactiveableLinkButton
          disabled={!record.active}
          key="priceTemplate"
          label="特供價單"
          onClick={() => {
            setPriceTemplateModalVisible(true);
            setCurrentRow(record);
          }}
        />,
      ],
    ),
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        request={queryCompanyBusinessService}
        toolBarRender={() => [
          <CreateCompanyBusinessButton key="create" onFinish={tableRef.current.reload} />,
        ]}
      />
      <CompanyBusinessModalForm
        compananyBusiness={currentRow}
        onFinish={currentRow ? updateCompanyBusinessService : createCompanyBusinessService}
        onVisibleChange={(visible) =>
          proTableOnChangeModalVisible(visible, setModalFormVisible, setCurrentRow)
        }
        visible={modalFormVisible}
      />
      <CompanyBusinessDeliveryAddressModal
        companyBusiness={currentRow}
        onFinish={updateCompanyBusinessService}
        onVisibleChange={(visible) =>
          proTableOnChangeModalVisible(visible, setDeliveryAddressModalVisible, setCurrentRow)
        }
        visible={deliveryAddresssModalVisible}
      />
      <CompanyBusinessPriceTemplateModal
        companyBusiness={currentRow}
        onFinish={updateCompanyBusinessService}
        setVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setPriceTemplateModalVisible, setCurrentRow)
        }
        visible={priceTemplateModalVisible}
      />
    </PageContainer>
  );
};

export default CompanyBusiness;

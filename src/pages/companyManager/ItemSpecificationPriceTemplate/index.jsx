import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG } from '@/services/hive/itemSpecificationPriceTemplate';
import ItemSpecificationPriceTemplateModalForm from './components/ItemSpecificationPriceTemplateModalForm';
import { Button } from 'antd';
import { LinkOutlined, PlusOutlined } from '@ant-design/icons';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { proTableOnChangeModalVisible } from '@/commons/proTable/proTableUtil';
import PriceTemplateCompanyBusinessModalForm from './components/PriceTemplateCompanyBusinessModalForm';

const ItemSpecificationPriceTemplate = () => {
  const tableRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [priceTemplateLinkModalVisible, setPriceTemplateLinkModalVisible] = useState(false);
  const [itemSpecificationsModalVisible, setItemSpecificationsModalVisible] = useState(false);

  const createItemSpecificationPriceTemplateService = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    return true;
  };

  const deleteItemSpecificationPriceTemplateService = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      record.id,
    );
    tableRef.current.reload();
  };

  const queryItemSpecificationPriceTemplateService = async (param, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      { ...param, active: true },
      sort,
      filter,
    );
  };

  const updateItemSpecificationPriceTemplateService = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    return true;
  };

  const COLUMNS = [
    { title: '名稱', dataIndex: 'name' },
    { title: '備註', dataIndex: 'remark', search: false },
    ProTableOperationColumnButtons(
      (record) => {
        setCurrentRow(record);
        setModalFormVisible(true);
      },
      deleteItemSpecificationPriceTemplateService,
      (text, record) => (
        <a
          onClick={() => {
            setCurrentRow(record);
            setItemSpecificationsModalVisible(true);
          }}
        >
          特供商品
        </a>
      ),
    ),
  ];

  return (
    <PageContainer>
      <ProTable
        columns={COLUMNS}
        actionRef={tableRef}
        request={queryItemSpecificationPriceTemplateService}
        toolBarRender={() => [
          <Button
            icon={<LinkOutlined />}
            key="priceTemplateLink"
            type="primary"
            onClick={() => setPriceTemplateLinkModalVisible(true)}
          >
            關聯客戶
          </Button>,
          <Button
            icon={<PlusOutlined />}
            key="button"
            type="primary"
            onClick={() => setModalFormVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      <PriceTemplateCompanyBusinessModalForm
        itemSpecificationPriceTemplate={currentRow}
        setVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setPriceTemplateLinkModalVisible, setCurrentRow)
        }
        visible={priceTemplateLinkModalVisible}
      />
      <ItemSpecificationPriceTemplateModalForm
        itemSpecificationPriceTemplate={currentRow}
        onFinish={
          currentRow
            ? updateItemSpecificationPriceTemplateService
            : createItemSpecificationPriceTemplateService
        }
        onVisibleChange={(visible) =>
          proTableOnChangeModalVisible(visible, setModalFormVisible, setCurrentRow)
        }
        visible={modalFormVisible}
      />
      <ItemSpecificationPriceTemplateModalForm
        itemSpecificationPriceTemplate={currentRow}
        onFinish={() => {
          proTableOnChangeModalVisible(false, setItemSpecificationsModalVisible, setCurrentRow);
        }}
        onVisibleChange={(visible) =>
          proTableOnChangeModalVisible(visible, setItemSpecificationsModalVisible, setCurrentRow)
        }
        readonly
        visible={itemSpecificationsModalVisible}
      />
    </PageContainer>
  );
};

export default ItemSpecificationPriceTemplate;

import React, { useRef, useState } from 'react';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import { COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { getValueEnum } from '@/enum/enumUtil';
import { ITEM_SPECIFICATION_STATUSES } from '@/enum/itemSpecificationStatus';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ItemSpecificationModalForm from './components/ItemSpecificationModalForm';

const ItemSpecification = () => {
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const tableRef = useRef();

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    return true;
  };

  const deleteItemSpecification = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      record.id,
    );
    tableRef.current.reload();
  };

  const onChangeVisible = (visible) => {
    if (!visible) {
      setCurrentRow();
    }
    setModalFormVisible(visible);
  };

  const queryItemSpecification = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      { ...params, active: true, showStock: true },
      sort,
      filter,
    );
  };

  const update = async (request) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    return true;
  };

  const COLUMNS = [
    { title: '??????', dataIndex: ['imageUrl'], search: false, valueType: 'image' },
    { title: '??????', dataIndex: ['item', 'name'] },
    { title: '????????????', dataIndex: 'name' },
    {
      title: '??????',
      dataIndex: 'itemSpecificationStatus',
      valueEnum: getValueEnum(ITEM_SPECIFICATION_STATUSES),
    },
    { title: 'SKU', dataIndex: 'sku' },
    { title: '??????', dataIndex: 'barcode' },
    { title: '??????', dataIndex: 'price', search: false },
    { title: '????????????', dataIndex: 'discountPrice', search: false },
    ProTableOperationColumnButtons((record) => {
      setCurrentRow(record);
      setModalFormVisible(true);
    }, deleteItemSpecification),
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        request={queryItemSpecification}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="button"
            onClick={() => setModalFormVisible(true)}
            type="primary"
          >
            ??????
          </Button>,
        ]}
      />
      <ItemSpecificationModalForm
        itemSpecification={currentRow}
        onFinish={currentRow ? update : create}
        setModalFormVisible={onChangeVisible}
        visible={modalFormVisible}
      />
    </PageContainer>
  );
};

export default ItemSpecification;

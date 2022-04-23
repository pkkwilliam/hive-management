import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CategoryModalForm from './components/categoryModalForm';
import { COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';

const Category = () => {
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const createCategoryServiceRequest = async (category) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG, category);
    onDataChanged();
    return true;
  };

  const deleteCategoryServiceRequest = async (category) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG, category.id);
    onDataChanged();
  };

  const updateCategoryServiceRequest = async (category) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG, category);
    onDataChanged();
    return true;
  };

  const onChangeModalFormVisible = (visible) => {
    if (!visible) {
      setCurrentRow(undefined);
    }
    setModalFormVisible(visible);
  };

  const onDataChanged = () => {
    actionRef.current.reload();
  };

  const COLUMNS = [
    {
      title: '圖片',
      dataIndex: ['imageUrl'],
      search: false,
      valueType: 'image',
    },
    { title: '標籤/分類', dataIndex: 'name' },
    ProTableOperationColumnButtons((record) => {
      setCurrentRow(record);
      setModalFormVisible(true);
    }, deleteCategoryServiceRequest),
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={COLUMNS}
        request={async (params = {}, sort, filter) => {
          return BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG, {
            ...params,
            active: true,
          });
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
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

      <CategoryModalForm
        category={currentRow}
        onClickSubmit={currentRow ? updateCategoryServiceRequest : createCategoryServiceRequest}
        setModalVisible={onChangeModalFormVisible}
        visible={modalFormVisible}
      />
    </PageContainer>
  );
};

export default Category;

import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CategoryModalForm from './components/categoryModalForm';
import { COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import {
  proTableCrudServiceGenerator,
  proTableOnChangeModalVisible,
} from '@/commons/proTable/proTableUtil';
import ProTableActiveStatusColumn from '@/commons/proTable/ProTableActiveStatusColumn';

const Category = () => {
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const serviceGenerator = proTableCrudServiceGenerator(
    COMPANY_MANAGER_CATEGORY_SERVICE_CONFIG,
    actionRef,
  );

  const COLUMNS = [
    ProTableActiveStatusColumn(),
    {
      title: '圖片',
      dataIndex: ['imageUrl'],
      search: false,
      valueType: 'image',
    },
    { title: '中文名稱', dataIndex: 'name' },
    { title: '英文名稱', dataIndex: 'englishName' },
    ProTableOperationColumnButtons(
      (record) => {
        setCurrentRow(record);
        setModalFormVisible(true);
      },
      serviceGenerator.deactivate,
      undefined,
      { deletePopConfirmMessage: '删除此標籤會把商品的標籤一併刪除，確認刪除?' },
    ),
    ,
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={COLUMNS}
        request={serviceGenerator.queryPagination}
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
        onClickSubmit={currentRow ? serviceGenerator.update : serviceGenerator.create}
        setModalVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setModalFormVisible, setCurrentRow)
        }
        visible={modalFormVisible}
      />
    </PageContainer>
  );
};

export default Category;

import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tag } from 'antd';
import ItemModalForm from './Components/ItemModalForm';
import {
  COMPANY_ITEM_SERVICE_CONFIG,
  COMPANY_MANAGER_ITEM_SERVICE_CONFIG,
} from '@/services/hive/itemService';
import ItemSpecificationDetailModal from '@/pages/companyManager/ItemSpecification/components/ItemSpecificationDetailModal';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import { queryCategory } from '@/commons/proForm/ProFormCategorySelect';
import ItemStockEditableTableModal from '@/commons/itemStock/ItemStockEditableTableModal';
import ItemStepFormV2 from './Components/ItemStepFormV2';
import { proTableOnChangeModalVisible } from '@/commons/proTable/proTableUtil';
import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';

const ItemPage = () => {
  const tableRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [itemStockEditableTableVisible, setItemStockEditiableTableVisible] = useState(false);
  const [showItemSpecification, setShowItemSpecification] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);

  const createItemService = async (item) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_MANAGER_ITEM_SERVICE_CONFIG,
      item,
    );
    tableRef.current.reload();
    setShowModalForm(false);
    return true;
  };

  const deleteItemService = async (record) => {
    const response = await BEDROCK_DEACTIVATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SERVICE_CONFIG,
      record.id,
    );
    tableRef.current.reload();
  };

  const queryItemService = async (params = {}, sort, filter) => {
    // return await COMPANY_MANAGER_QUERY_WITH_STOCK({ ...params, active: true }, sort, filter);
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(COMPANY_ITEM_SERVICE_CONFIG, {
      ...params,
      active: true,
      showPriceRange: true,
      showStock: true,
    });
  };

  const updateItemService = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SERVICE_CONFIG,
      request,
    );
    tableRef.current.reload();
    setCurrentRow();
    return true;
  };

  const COLUMNS = [
    {
      title: '圖片',
      dataIndex: ['imageUrl'],
      search: false,
      valueType: 'image',
    },
    {
      title: '品名',
      dataIndex: 'name',
    },
    { title: '品牌', dataIndex: 'brand' },
    {
      title: '標籤/分類',
      dataIndex: 'categories',
      fieldProps: { showSearch: true },
      key: 'categoryId',
      render: (text, record) => {
        return record.categories.map((category) => <Tag color="success">{category.name}</Tag>);
      },
      request: queryCategory,
      valueType: 'select',
    },
    {
      title: '規格數量',
      dataIndex: ['itemSpecificationPriceRangeResponse', 'count'],
    },
    {
      title: '總庫存',
      dataIndex: ['stockResponse', 'stock'],
    },
    {
      title: '價格範圍',
      renderText: (text, record) => {
        const { count, startFrom, to } = record.itemSpecificationPriceRangeResponse;
        return !to ? `$${startFrom ?? '-'}` : `$${startFrom} - $${to}`;
      },
    },
    { title: '備註', dataIndex: 'remark' },
    ProTableOperationColumnButtons(
      (record) => {
        setCurrentRow(record);
        setShowModalForm(true);
      },
      deleteItemService,
      (text, record) => [
        <a
          key="itemSpecification"
          onClick={() => {
            setCurrentRow(record);
            setShowItemSpecification(true);
          }}
        >
          規格
        </a>,
        <InactiveableLinkButton
          disabled={record.itemSpecificationPriceRangeResponse.count < 1}
          key="itemStock"
          onClick={() => {
            setCurrentRow(record);
            setItemStockEditiableTableVisible(true);
          }}
          label="庫存"
        />,
      ],
      { deletePopConfirmMessage: '删除商品會一併删除所有規格及庫存，確認刪除?' },
    ),
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={tableRef}
          columns={COLUMNS}
          request={queryItemService}
          toolBarRender={() => [
            <CreatePriorModal
              key="item-onboard"
              priorModals={[CREATE_PRIOR_MODAL_SHOP, CREATE_PRIOR_MODAL_CATEGORY]}
            >
              <ItemStepFormV2 onFinish={tableRef.current.reload} />
            </CreatePriorModal>,
          ]}
        />
      </PageContainer>
      <ItemModalForm
        item={currentRow}
        onFinish={currentRow ? updateItemService : createItemService}
        setVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setShowModalForm, setCurrentRow)
        }
        visible={showModalForm}
      />
      <ItemSpecificationDetailModal
        item={currentRow}
        setVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setShowItemSpecification, setCurrentRow)
        }
        visible={showItemSpecification}
      />
      <ItemStockEditableTableModal
        item={currentRow}
        onFinish={tableRef?.current?.reload}
        setVisible={(visible) =>
          proTableOnChangeModalVisible(visible, setItemStockEditiableTableVisible, setCurrentRow)
        }
        visible={itemStockEditableTableVisible}
      />
    </>
  );
};

export default ItemPage;

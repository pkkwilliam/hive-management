import React, { useRef, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG } from '@/services/hive/itemSpecificationStockService';
import { SHOP_TYPES } from '@/enum/shopType';
import { getValueEnum } from '@/enum/enumUtil';
import {
  ITEM_SPECIFICATION_STOCK_TYPES,
  ITEM_SPECIFICATION_STOCK_TYPE_LIMITED,
} from '@/enum/itemSpecificationStockType';

const ShopItemSpecificationList = (props) => {
  const tableActionRef = useRef();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const queryItemSpecificationStock = async (params, sort, filter) => {
    return await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      {
        'itemSpecification.id': props.itemSpecification?.id,
      },
    );
  };

  const update = async (request) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG, request);
    tableActionRef.current.reload();
  };

  const COLUMNS = [
    { title: '地點', dataIndex: ['shop', 'name'], editable: false },
    {
      title: '地點類型',
      dataIndex: ['shop', 'shopType'],
      editable: false,
      search: false,
      valueEnum: getValueEnum(SHOP_TYPES),
    },
    {
      title: '庫存類型',
      dataIndex: ['itemStockType'],
      editable: true,
      search: false,
      valueEnum: getValueEnum(ITEM_SPECIFICATION_STOCK_TYPES),
    },
    {
      title: '地點庫存',
      dataIndex: ['stock'],
      search: false,
      valueType: 'number',
      renderText: (text, record) =>
        record.itemStockType === ITEM_SPECIFICATION_STOCK_TYPE_LIMITED.key ? text : '-',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => action?.startEditable(record?.id)}>
          增減庫存
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable
      actionRef={tableActionRef}
      columns={COLUMNS}
      editable={{
        type: 'multiple',
        editableKeys,
        onChange: setEditableRowKeys,
        onSave: async (rowKey, data, row) => {
          update(data);
        },
      }}
      recordCreatorProps={{
        creatorButtonText: '新增一行',
        disabled: true,
        position: 'bottom',
        style: {
          display: 'none',
        },
      }}
      request={queryItemSpecificationStock}
      rowKey="id"
      search={false}
    />
  );
};

export default ShopItemSpecificationList;

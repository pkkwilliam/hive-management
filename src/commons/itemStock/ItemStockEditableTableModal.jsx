import { Button, Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';
import {
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG } from '@/services/hive/itemSpecificationStockService';
import { ProFormText } from '@ant-design/pro-form';

const ItemStockEditableTableModal = (props) => {
  const { item, setVisible, visible } = props;
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [itemSpecificationStock, setItemSpecificationStock] = useState([]);
  const [shopId, setShopId] = useState();
  const [form] = Form.useForm();

  const COLUMNS = [
    { title: '規格名稱', dataIndex: ['itemSpecification', 'name'], editable: false },
    {
      title: 'SKU',
      dataIndex: ['', 'sku'],
      key: 'itemSpecification.sku',
      editable: false,
    },
    { title: '地點庫存', dataIndex: 'stock', search: false, editable: false },
    {
      title: '增減庫存',
      dataIndex: 'stockIncreaseDecrease',
      dataType: 'number',
      editable: true,
      renderText: (text, record) => '',
      tooltip: '在數字前加‘-’即可減去庫存',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    if (!shopId) {
      return;
    }
    query();
  }, [shopId]);

  const onChangeVisible = (visible) => {
    if (!visible) {
      form.resetFields();
    }
    setVisible(visible);
  };

  const query = async (params, sort, filter) => {
    let response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      {
        ...params,
        active: true,
        itemSpecificationActive: true,
        'itemSpecification.item.id': item.id,
        'shop.id': shopId,
      },
      sort,
      filter,
    );
    setItemSpecificationStock(response.data);
  };

  const update = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      request,
    );
    query();
  };

  return (
    <Modal
      onCancel={() => onChangeVisible(false)}
      destroyOnClose
      footer={null}
      title={`${item?.brand ? item.brand + ' ' : ''}${item?.name}庫存`}
      visible={visible}
      width={1500}
    >
      <ProFormShopSelect label="地點" onChange={(shopId) => setShopId(shopId)} required />
      <EditableProTable
        columns={COLUMNS}
        editable={{
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: (rowKey, data, row) => {
            update(data);
          },
        }}
        form={form}
        recordCreatorProps={false}
        rowKey="id"
        value={itemSpecificationStock}
      />
    </Modal>
  );
};

export default ItemStockEditableTableModal;

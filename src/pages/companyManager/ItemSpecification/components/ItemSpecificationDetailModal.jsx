import React, { useRef, useState } from 'react';
import { COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { Button, Card, Form, Modal, Table, Upload } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import ShopItemSpecificationList from '../../ShopItemSpecificationStock/components/ShopItemSpecificationList';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { ITEM_SPECIFICATION_STATUSES } from '@/enum/itemSpecificationStatus';
import { getValueEnum } from '@/enum/enumUtil';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';
import { getImageUrl } from '@/util/imageUtil';

const ItemSpecificationDetailModal = (props) => {
  const tableRef = useRef();
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const { item, setVisible, visible } = props;

  const createItemSpecification = async (request) => {
    delete request.id;
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      { ...request, item },
    );
    tableRef.current.reload();
  };

  const deleteItemSpecification = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      record.id,
    );
    tableRef.current.reload();
  };

  const queryItemSpecification = async () => {
    return BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG, {
      active: true,
      'item.id': item?.id,
      showStock: true,
    });
  };

  const updateItemSpecification = async (record) => {
    console.log('HERERERE', record);
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      record,
    );
    tableRef.current.reload();
  };

  const COLUMNS = [
    {
      title: '圖片',
      dataIndex: ['imageUrl'],
      renderFormItem: (schema, config, rowForm) => (
        <ProFormMediaUpload form={rowForm} name={['imageUrl']} max={1} />
      ),
      search: {
        transform: (value) => console.log('TTT', value),
      },
      tooltip: "圖片可在左則導航欄'管理' -> '商品規格'中修改或添加",
      valueType: 'image',
    },
    {
      title: '規格名稱',
      copyable: true,
      ellipsis: true,
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '請輸入規格名稱',
          },
        ],
      },
    },
    {
      title: '狀態',
      dataIndex: 'itemSpecificationStatus',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '請選擇狀態',
          },
        ],
      },
      valueEnum: getValueEnum(ITEM_SPECIFICATION_STATUSES),
    },
    { title: '庫存', dataIndex: ['stockResponse', 'stock'], editable: false },
    { title: 'SKU', dataIndex: 'sku', copyable: true, ellipsis: true },
    { title: '條碼', dataIndex: 'barcode', copyable: true, ellipsis: true },
    {
      title: '零售價格',
      dataIndex: 'price',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '請輸入零售價格',
          },
        ],
      },
      search: false,
      valueType: 'money',
      width: 100,
    },
    {
      title: '折扣價格',
      dataIndex: 'discountPrice',
      search: false,
      valueType: 'money',
      width: 100,
    },
    {
      title: '長',
      dataIndex: 'length',
      search: false,
      width: 80,
    },
    {
      title: '寬',
      dataIndex: 'width',
      search: false,
      width: 80,
    },
    {
      title: '高',
      dataIndex: 'height',
      search: false,
      width: 80,
    },
    {
      title: '重量',
      dataIndex: 'weight',
      search: false,
      width: 80,
    },
    {
      title: '備註',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => action?.startEditable(record?.id)}>
          修改
        </a>,
      ],
    },
  ];

  return (
    <Modal
      destroyOnClose
      onCancel={() => setVisible(false)}
      title={item?.name}
      visible={visible}
      width={1800}
    >
      <EditableProTable
        actionRef={tableRef}
        form={form}
        columns={COLUMNS}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onDelete: async (rowKey, data, row) => deleteItemSpecification(data),
          onSave: async (rowKey, data, row) => {
            const imageUrl = getImageUrl(data.imageUrl);
            data.imageUrl = imageUrl;
            data.id === 'temp_id' ? createItemSpecification(data) : updateItemSpecification(data);
          },
        }}
        // expandable={{
        //   expandedRowRender: (record) => {
        //     return (
        //       <Card>
        //         <ShopItemSpecificationList itemSpecification={record} />
        //       </Card>
        //     );
        //   },
        // }}
        recordCreatorProps={{
          position: 'top',
          creatorButtonText: '新增規格',
          record: () => ({
            id: 'temp_id',
            imageUrl:
              item?.imageUrl ??
              'https://cloud-storage-general.bitcode-lab.com/application-general/hive_client_image_missing.png',
          }),
        }}
        request={queryItemSpecification}
        rowKey="id"
        search={false}
      />
    </Modal>
  );
};

export default ItemSpecificationDetailModal;

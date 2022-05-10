import { queryItemSpecificationPriceTemplate } from '@/commons/proForm/ProFormItemSpecificationPriceTemplate';
import {
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const PriceTemplateCompanyBusinessModalForm = (props) => {
  const [form] = Form.useForm();
  const [companyBusinesses, setCompanyBusinesses] = useState([]);
  const [editableKeys, setEditableKeys] = useState([]);
  const { itemSpecificationPriceTemplate, setVisible, visible } = props;

  const COLUMNS = [
    { title: '客戶名稱', dataIndex: ['name'], editable: false },
    {
      title: '特供價單',
      dataIndex: ['itemSpecificationPriceTemplate', 'name'],
      fieldProps: { showSearch: true },
      request: queryItemSpecificationPriceTemplate,
      valueType: 'select',
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

  useEffect(() => {
    queryCompanyBusiness();
  }, [itemSpecificationPriceTemplate]);

  const queryCompanyBusiness = async () => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      {},
    );
    setCompanyBusinesses(response.data);
  };

  const updateCompanyBusiness = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      request,
    );
    queryCompanyBusiness();
  };

  return (
    <Modal
      destroyOnClose
      footer={null}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      title="關聯特供價單"
      visible={visible}
      width={1500}
    >
      <EditableProTable
        columns={COLUMNS}
        recordCreatorProps={false}
        rowKey="id"
        value={companyBusinesses}
        editable={{
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          type: 'single',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            updateCompanyBusiness({
              ...data,
              itemSpecificationPriceTemplate: { id: data.itemSpecificationPriceTemplate.name },
            });
          },
          onChange: setEditableKeys,
        }}
      />
    </Modal>
  );
};

export default PriceTemplateCompanyBusinessModalForm;

import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import { ModalForm } from '@ant-design/pro-form';
import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import React, { useState } from 'react';

const CompanyBusinessDeliveryAddressModal = (props) => {
  const { companyBusiness, onFinish, onVisibleChange, visible } = props;
  const [editableKeys, setEditableRowKeys] = useState([]);

  const [form] = Form.useForm();

  const COLUMNS = [
    { dataIndex: 'index', valueType: 'indexBorder' },
    { title: '街道', dataIndex: ['street'] },
    { title: '單位', dataIndex: ['unit'] },
    { title: '聯繫人', dataIndex: ['contactName'] },
    { title: '聯繫人電話', dataIndex: ['phoneNumber'] },
    { title: '送貨地址備註', dataIndex: ['remark'] },
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

  const onSave = (rowKey, data, row) => {
    const nonModifyAddresses = companyBusiness.deliveryAddress.filter(
      (address) => address.id !== data.id,
    );
    nonModifyAddresses.push(data);
    companyBusiness.deliveryAddress = nonModifyAddresses;
    onFinish(companyBusiness);
  };

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={() => setModalVisible(false)}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      submitter={false}
      title="客戶地址"
      visible={visible}
      width={1500}
    >
      <EditableProTable
        columns={COLUMNS}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: onSave,
        }}
        form={form}
        recordCreatorProps={{
          creatorButtonText: '新增地址',
          record: () => ({
            id: 0,
          }),
        }}
        rowKey="id"
        value={companyBusiness?.deliveryAddress ?? []}
      />
      {/* <ProTable
        columns={COLUMNS}
        dataSource={companyBusiness?.deliveryAddress ?? []}
        pagination={false}
        search={false}
      /> */}
    </ModalForm>
  );
};

export default CompanyBusinessDeliveryAddressModal;

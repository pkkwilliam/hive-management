import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import { ModalForm } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { Form } from 'antd';
import React from 'react';

const CompanyBusinessDeliveryAddressModal = (props) => {
  const { companyBusiness, onVisibleChange, visible } = props;

  const [form] = Form.useForm();

  const COLUMNS = [
    { dataIndex: 'index', valueType: 'indexBorder' },
    { title: '街道', dataIndex: ['street'] },
    { title: '單位', dataIndex: ['unit'] },
    { title: '送貨地址備註', dataIndex: ['remark'] },
  ];

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={() => setModalVisible(false)}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      submitter={false}
      title="客戶地址"
      visible={visible}
    >
      <ProTable
        columns={COLUMNS}
        dataSource={companyBusiness?.deliveryAddress ?? []}
        pagination={false}
        search={false}
      />
    </ModalForm>
  );
};

export default CompanyBusinessDeliveryAddressModal;

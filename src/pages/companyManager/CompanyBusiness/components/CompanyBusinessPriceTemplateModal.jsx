import ProFormItemSpecificationPriceTemplate from '@/commons/proForm/ProFormItemSpecificationPriceTemplate';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import { ModalForm } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const CompanyBusinessPriceTemplateModal = (props) => {
  const [form] = Form.useForm();
  const { companyBusiness, onFinish, setVisible, visible } = props;

  form.setFieldsValue(companyBusiness);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={(request) => onFinish({ ...companyBusiness, ...request })}
      onVisibleChange={(visible) => onModalFormVisibleChange(setVisible, form, visible)}
      title={`${companyBusiness?.name}特供價單`}
      visible={visible}
    >
      <ProFormItemSpecificationPriceTemplate
        labe="特供價單"
        name={['itemSpecificationPriceTemplate', 'id']}
      />
    </ModalForm>
  );
};

export default CompanyBusinessPriceTemplateModal;

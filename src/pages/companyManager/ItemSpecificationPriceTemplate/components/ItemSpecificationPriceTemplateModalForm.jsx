import React from 'react';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import ProFormPriceTemplateList from './ProFormTemplatePriceList';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';

const ItemSpecificationPriceTemplateModalForm = (props) => {
  const { itemSpecificationPriceTemplate, onFinish, onVisibleChange, visible } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(itemSpecificationPriceTemplate);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={itemSpecificationPriceTemplate ? '修改特供價單' : '創建特供價單'}
      visible={visible}
      width={1500}
    >
      <ProFormDigit disabled hidden lable="ID" name="id" />
      <ProFormText
        label="特供價單名稱"
        name="name"
        placeholder="超市專用 / XX超市專用"
        rules={[{ required: true, message: '請輸入特供價單名稱' }]}
      />
      <ProFormPriceTemplateList label="價格" name="priceTemplates" />
      <ProFormText label="備註" name="remark" />
    </ModalForm>
  );
};

export default ItemSpecificationPriceTemplateModalForm;

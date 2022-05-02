import React from 'react';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import ProFormPriceTemplateList from './ProFormTemplatePriceList';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';

const ItemSpecificationPriceTemplateModalForm = (props) => {
  const {
    itemSpecificationPriceTemplate,
    onFinish,
    onVisibleChange,
    readonly = false,
    visible,
  } = props;
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
      <ProFormDigit hidden lable="ID" name="id" readonly />
      <ProFormText
        label="特供價單名稱"
        name="name"
        placeholder="超市專用 / XX超市專用"
        readonly={readonly}
        rules={[{ required: true, message: '請輸入特供價單名稱' }]}
      />
      <ProFormPriceTemplateList label="特供價單商品" name="priceTemplates" readonly={readonly} />
      <ProFormText label="備註" name="remark" readonly={readonly} />
    </ModalForm>
  );
};

export default ItemSpecificationPriceTemplateModalForm;

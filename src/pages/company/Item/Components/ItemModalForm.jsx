import React, { useState } from 'react';
import {
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProFormCategoryListSelect from '@/commons/proForm/ProFormCategoryListSelect';
import { Form, Space } from 'antd';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';

const ItemModalForm = (props) => {
  const { item, onFinish, onVisibleChange, visible } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(item);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={item ? '修改商品' : '新增商品'}
      visible={visible}
      width={1200}
    >
      <ProFormDigit hidden title="ID" name={['id']} />
      <Space direction="vertical">
        <ProFormMediaUpload label="圖片" form={form} max={1} name={['imageUrl']} />
        <Space>
          <ProFormText
            label="品名"
            name="name"
            placeholder="品名 如: 巧克力餅乾"
            rules={[{ required: true, message: '請輸入品名 如: 巧克力餅乾' }]}
          />
          <ProFormText label="品牌" name="brand" placeholder="品牌 如: 維他" />
        </Space>
      </Space>

      <ProFormCategoryListSelect label="標籤/分類" mode="multiple" name={['categories']} />
      <Space>
        <ProFormTextArea label="內容" name="content" placeholder="5分包裝 每包25塊" />
        <ProFormTextArea
          label="描述"
          name="description"
          placeholder="非常可口的維他巧克力餅乾..."
        />
      </Space>
      <ProFormText label="備註" name="remark" />
    </ModalForm>
  );
};

export default ItemModalForm;

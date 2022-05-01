import React from 'react';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';

const CategoryModalForm = (props) => {
  const [form] = Form.useForm();
  const { category, onClickSubmit, setModalVisible, visible } = props;
  form.setFieldsValue(category);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={(values) => onClickSubmit({ ...values, id: category?.id })}
      onVisibleChange={(visible) => onModalFormVisibleChange(setModalVisible, form, visible)}
      title={category ? '修改標籤/分類' : '新增標籤/分類'}
      visible={visible}
    >
      <ProFormDigit disabled hidden label="ID" name="id" />
      <ProFormMediaUpload
        label="標籤/分類圖片"
        form={form}
        max={1}
        name={['imageUrl']}
        tooltip="此圖片將會顯示在微信小程序的商品分類列表提升用戶體驗"
        {...props}
      />
      <ProFormText
        label="標籤/分類名稱"
        placeholder="新品 / 熱賣 / 化妝品..."
        required
        name="name"
      />
    </ModalForm>
  );
};

export default CategoryModalForm;

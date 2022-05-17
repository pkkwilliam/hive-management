import React from 'react';
import {
  ModalForm,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Form } from 'antd';
import { COMPANY_ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

const ItemSpecificationModalForm = (props) => {
  const { item, onFinish, setVisible, visible } = props;
  const [form] = Form.useForm();

  const getItemSpecificationByItem = async () => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_SERVICE_CONFIG,
      { active: true, itemId: item?.id },
    );
    form.setFieldsValue({ itemSpecifications: response });
  };

  getItemSpecificationByItem();

  return (
    <ModalForm
      form={form}
      onFinish={(values) => {
        const request = values.itemSpecifications.map((specification) => ({
          ...specification,
          item,
        }));
        onFinish(request);
      }}
      onVisibleChange={setVisible}
      visible={visible}
      title="商品規格"
    >
      <ProFormList
        itemRender={({ listDom, action }, { index, record, field, fields }) => {
          return (
            <ProCard
              bordered
              title={`${index + 1}. ${record?.name ?? ''}`}
              style={{
                marginBottom: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
        name="itemSpecifications"
        {...props}
      >
        <ProFormGroup>
          <ProFormDigit disabled label="商品編號" value={item?.id ?? 0} />
          <ProFormText
            label="規格名稱"
            name="name"
            rules={[{ required: true, message: '請輸入規格名稱' }]}
          />
          <ProFormText label="條碼" name="barcode" />
          <ProFormText label="SKU" name="sku" />
        </ProFormGroup>
        <ProFormGroup title="價格">
          <ProFormMoney
            label="對外基本價錢"
            name="price"
            rules={[{ required: true, message: '請輸入品名' }]}
          />
          <ProFormMoney label="對外折扣價錢" name="discountPrice" />
        </ProFormGroup>
        <ProFormGroup title="尺吋/重量">
          <ProFormDigit label="長" name="length" />
          <ProFormDigit label="寬" name="width" />
          <ProFormDigit label="高" name="height" />
          <ProFormDigit label="重量" name="weight" />
        </ProFormGroup>
        <ProFormGroup title="其他">
          <ProFormText label="備註" name="remark" />
        </ProFormGroup>
      </ProFormList>
    </ModalForm>
  );
};

export default ItemSpecificationModalForm;

import React from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { ADDRESS_TYPE_SHOP } from '@/enum/addressType';
import ProFormShopTypeSelect from '@/commons/proForm/ProFormShopTypeSelect';
import ProFormCountryCodeSelect from '@/commons/proForm/ProFormCountryCodeSelect';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import ProFormCompanyPrinterSelect from '@/commons/proForm/ProFormCompanyPrinterSelect';

const ShopModalForm = (props) => {
  const [form] = Form.useForm();
  const { onClickSubmit, setModalVisible, shop, visible } = props;
  form.setFieldsValue(shop);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={(values) =>
        onClickSubmit({
          ...values,
          address: {
            ...values?.address,
            addressType: ADDRESS_TYPE_SHOP.key,
            id: shop?.address?.id,
          },
        })
      }
      onVisibleChange={(visible) => onModalFormVisibleChange(setModalVisible, form, visible)}
      title={shop ? '修改門店/倉庫' : '新增門店/倉庫'}
      visible={visible}
    >
      <ProFormDigit disabled hidden label="ID" name="id" />
      <ProFormText
        label="商店名稱/倉庫名稱"
        placeholder="請輸入名稱"
        rules={[{ required: true, message: '請輸入名稱' }]}
        name="name"
      />
      <ProFormShopTypeSelect
        label="類型"
        name="shopType"
        rules={[{ required: true, message: '請選擇類型' }]}
      />
      <ProFormText label="聯絡人" placeholder="請輸入聯絡人" name={['address', 'contactName']} />
      <ProFormCountryCodeSelect
        label="區號"
        placeholder="請輸入區號"
        name={['address', 'countryCode']}
      />
      <ProFormText label="電話" placeholder="請輸入電話" name={['address', 'phoneNumber']} />
      <ProFormText label="街道" placeholder="請輸入街道" name={['address', 'street']} />
      <ProFormText label="單位" placeholder="請輸入單位" name={['address', 'unit']} />
      <ProFormCompanyPrinterSelect label="默認打印機" name={['defaultPrinter', 'id']} />
    </ModalForm>
  );
};

export default ShopModalForm;

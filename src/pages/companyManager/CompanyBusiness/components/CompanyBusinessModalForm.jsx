import React from 'react';
import { ModalForm, ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-form';
import ProFormCountryCodeSelect from '@/commons/proForm/ProFormCountryCodeSelect';
import { Form } from 'antd';
import ProFormItemSpecificationPriceTemplate from '@/commons/proForm/ProFormItemSpecificationPriceTemplate';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import CompanyBusinessDeliveryAddressList from './CompanyBusinessDeliveryAddressList';
import ProFormCurrencyRadio from '@/commons/proForm/ProFormCurrencyRadio';

const CompanyBusinessModalForm = (props) => {
  const [form] = Form.useForm();
  const { compananyBusiness, onFinish, onVisibleChange, visible } = props;
  form.setFieldsValue(compananyBusiness);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      modalProps={{
        maskClosable: false,
      }}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={compananyBusiness ? '修改客戶' : '創建客戶'}
      visible={visible}
    >
      <ProFormDigit disabled hidden label="ID" name="id" />
      <ProFormText
        label="企業名稱"
        name="name"
        rules={[{ required: true, message: '請輸入企業名稱' }]}
      />
      <ProFormCurrencyRadio label="默認幣種" name={['defaultCurrency']} />
      <ProFormItemSpecificationPriceTemplate
        label="特供價單"
        name={['itemSpecificationPriceTemplate', 'id']}
        placeholder="客戶特供價單"
        tooltip="此為進階功能，此功能可為客戶設定客戶専有價格，如列表中没有選項，請先到'管理 -> 客戶特供價單'中創建。"
      />
      {/* <ProFormCompanyBusinessPaymentTypeSelect label="支付方式" name="companyBusinessPaymentType" /> */}
      <ProFormGroup title="外部下單企業用戶登入 (企業客戶可由網站直接下單至後台)">
        <ProFormCountryCodeSelect label="區號" name={['businessUser', 'countryCode']} />
        <ProFormDigit label="電話" name={['businessUser', 'smsNumber']} />
      </ProFormGroup>
      <ProFormGroup title="送貨地址">
        <CompanyBusinessDeliveryAddressList name="deliveryAddress" />
      </ProFormGroup>
      <ProFormText label="備註" name="remark" />
    </ModalForm>
  );
};

export default CompanyBusinessModalForm;

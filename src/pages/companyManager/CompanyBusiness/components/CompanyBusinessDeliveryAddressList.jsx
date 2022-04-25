import React from 'react';
import { ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-form';

const CompanyBusinessDeliveryAddressList = (props) => {
  return (
    <ProFormList {...props}>
      <ProFormGroup>
        <ProFormText
          label="街道"
          name="street"
          rules={[{ required: true, message: '請輸入街道' }]}
        />
        <ProFormText label="單位" name="unit" />
        <ProFormText label="送貨地址備註" name="remark" />
      </ProFormGroup>
    </ProFormList>
  );
};

export default CompanyBusinessDeliveryAddressList;

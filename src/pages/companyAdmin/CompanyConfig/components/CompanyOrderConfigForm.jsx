import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG } from '@/services/hive/companyConfigService';
import ProForm, { ProFormDigit, ProFormGroup, ProFormSwitch } from '@ant-design/pro-form';
import { Form } from 'antd';
import { useModel } from 'umi';
import React from 'react';

const CompanyOrderConfigForm = (props) => {
  const [form] = Form.useForm();
  const { initialState, refresh } = useModel('@@initialState');

  form.setFieldsValue(initialState.companyConfig.companyInternalOrderConfig);

  const onUpdate = async (request) => {
    BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG, {
      ...initialState.companyConfig,
      companyInternalOrderConfig: request,
    });
    refresh();
    return true;
  };

  return (
    <ProForm form={form} onFinish={onUpdate}>
      <ProFormSwitch
        label="允許制作超過庫存的訂單"
        name={['allowOverStockOrder']}
        tooltip="當訂單商品大於庫存時，允許制單(庫存會變會負數)"
      />
    </ProForm>
  );
};

export default CompanyOrderConfigForm;

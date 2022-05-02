import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG } from '@/services/hive/companyConfigService';
import ProForm, { ProFormDigit, ProFormGroup, ProFormSwitch } from '@ant-design/pro-form';
import { Form } from 'antd';
import { useModel } from 'umi';
import React from 'react';

const CompanyWechatMiniProgramConfigForm = (props) => {
  const [form] = Form.useForm();
  const { initialState, refresh } = useModel('@@initialState');

  form.setFieldsValue(initialState.companyConfig.companyWechatConfig);

  const onUpdate = async (request) => {
    BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG, {
      ...initialState.companyConfig,
      companyWechatConfig: request,
    });
    refresh();
    return true;
  };
  return (
    <ProForm form={form} onFinish={onUpdate}>
      <ProFormSwitch label="允許客戶端小程序被搜索" name={['enabled']} />
    </ProForm>
  );
};

export default CompanyWechatMiniProgramConfigForm;

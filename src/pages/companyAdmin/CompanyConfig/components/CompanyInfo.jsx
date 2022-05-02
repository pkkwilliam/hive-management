import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG } from '@/services/hive/companyConfigService';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import { useModel } from 'umi';
import React from 'react';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';

const CompanyInfo = () => {
  const [form] = Form.useForm();
  const { initialState, refresh } = useModel('@@initialState');

  form.setFieldsValue(initialState.companyConfig?.companyInfo);

  const onUpdate = async (request) => {
    BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG, {
      ...initialState.companyConfig,
      companyInfo: request,
    });
    refresh();
    return true;
  };

  return (
    <ProForm form={form} onFinish={onUpdate}>
      <ProFormText
        label="公司中文名稱"
        readonly
        value={initialState.companyConfig?.company?.chineseName}
      />
      <ProFormText
        label="公司英文名稱"
        readonly
        value={initialState.companyConfig?.company?.englishName}
      />
      <ProFormMediaUpload label="企業標誌" form={form} max={1} name={['logoImageUrl']} />
    </ProForm>
  );
};

export default CompanyInfo;

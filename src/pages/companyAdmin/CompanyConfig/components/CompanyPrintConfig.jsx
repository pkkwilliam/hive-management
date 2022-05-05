import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG } from '@/services/hive/companyConfigService';
import ProForm, { ProFormDigit, ProFormGroup, ProFormSwitch } from '@ant-design/pro-form';
import { Form, Space } from 'antd';
import { useModel } from 'umi';
import React from 'react';
import CompanyHeader from '@/commons/print/CompanyHeader';
import ProCard from '@ant-design/pro-card';

const CompanyPrintConfig = () => {
  const [form] = Form.useForm();
  const { initialState, refresh } = useModel('@@initialState');
  const { logoImageUrl } = initialState?.companyConfig?.companyInfo ?? {};

  form.setFieldsValue(initialState.companyConfig?.companyPrintHeaderConfig);

  const onUpdate = async (request) => {
    BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG, {
      ...initialState.companyConfig,
      companyPrintHeaderConfig: request,
    });
    refresh();
    return true;
  };

  return (
    <Space direction="vertical">
      <ProCard bordered headerBordered title="列印抬頭樣式">
        <CompanyHeader />
      </ProCard>
      <ProFormGroup>
        <ProForm form={form} onFinish={onUpdate} title="列印抬頭">
          <ProFormDigit label="標誌寬度" name="logoWidth" min={0} />
          <ProFormSwitch disabled={!logoImageUrl} label="顯示企業圖片標誌" name="showCompanyLogo" />
          <ProFormSwitch label="顯示企業中文名稱" name="showCompanyChineseName" />
          <ProFormSwitch label="顯示企業英文名稱" name="showCompanyEnglishName" />
          <ProFormSwitch label="使用下劃線" name="useDivider" />
        </ProForm>
      </ProFormGroup>
    </Space>
  );
};

export default CompanyPrintConfig;

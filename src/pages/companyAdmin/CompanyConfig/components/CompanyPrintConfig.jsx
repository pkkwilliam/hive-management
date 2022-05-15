import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ADMIN_COMPANY_CONFIG_SERVICE_CONFIG } from '@/services/hive/companyConfigService';
import ProForm, {
  ProFormDigit,
  ProFormGroup,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, Space } from 'antd';
import { useModel } from 'umi';
import React from 'react';
import CompanyHeader from '@/commons/print/CompanyHeader';
import CompanyInvoiceTail from '@/commons/print/CompanyInvoiceTail';
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
    <ProCard
      tabs={{
        type: 'line',
      }}
    >
      <ProCard.TabPane key="header" tab="頁頭">
        <Space direction="vertical">
          <ProCard bordered headerBordered title="列印頁頭樣式">
            <CompanyHeader />
          </ProCard>
          <ProFormGroup>
            <ProForm form={form} onFinish={onUpdate} title="列印頁頭">
              <ProFormDigit label="標誌寬度" name="logoWidth" min={0} />
              <ProFormSwitch
                disabled={!logoImageUrl}
                label="顯示企業圖片標誌"
                name="showCompanyLogo"
              />
              <ProFormSwitch label="顯示企業中文名稱" name="showCompanyChineseName" />
              <ProFormSwitch label="顯示企業英文名稱" name="showCompanyEnglishName" />
              <ProFormSwitch label="使用下劃線" name="useDivider" />
            </ProForm>
          </ProFormGroup>
        </Space>
      </ProCard.TabPane>
      <ProCard.TabPane key="footer" tab="頁尾" disabled></ProCard.TabPane>
      <ProCard.TabPane key="bankAccountInfo" tab="發票支付方式">
        <Space direction="vertical">
          <ProCard bordered headerBordered title="列印發票支付方式之樣式">
            <CompanyInvoiceTail />
          </ProCard>
          <ProFormGroup>
            <ProForm form={form} onFinish={onUpdate} title="列印轉賬">
              <ProFormSwitch
                disabled={!logoImageUrl}
                label="顯示發票尾部支付方式"
                name={['showInvoiceTailText']}
              />
              <ProFormTextArea
                label="支付方式文字"
                name={['invoiceTailText']}
                placeholder={`支付方式\n- 現金支付\n- 銀行轉賬 - 中國銀行澳門分行\n源代碼科技一人有限公司\n  澳門元戶口: 185XXX128862582\n  香港元戶口: 185XXX378864345`}
                width="lg"
              />
            </ProForm>
          </ProFormGroup>
        </Space>
      </ProCard.TabPane>
    </ProCard>
  );
};

export default CompanyPrintConfig;

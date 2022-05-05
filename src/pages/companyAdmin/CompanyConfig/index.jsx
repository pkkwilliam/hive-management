import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useModel } from 'umi';
import CompanyOrderConfigForm from './components/CompanyOrderConfigForm';
import CompanyWechatMiniProgramConfigForm from './components/CompanyWechatMiniProgramConfigForm';
import CompanyInfo from './components/CompanyInfo';
import CompanyPrintConfig from './components/CompanyPrintConfig';

const CompanyConfig = (props) => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
        }}
      >
        <ProCard.TabPane key="tab1" tab="企業">
          <CompanyInfo />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="列印">
          <CompanyPrintConfig />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="訂單">
          <CompanyOrderConfigForm />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="微信小程序">
          <CompanyWechatMiniProgramConfigForm />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  );
};

export default CompanyConfig;

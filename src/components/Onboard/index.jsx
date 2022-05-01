import { GET_COMPANY_ONBOARD } from '@/services/hive/companyOnboardService';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CategoryOnboard from './components/CategoryOnboard';
import CompanyBusinessOnboard from './components/CompanyBusinessOnboard';
import ItemOnboard from './components/ItemOnboard';
import OrderOnobard from './components/OrderOnboard';
import PriceTemplateOnboard from './components/PriceTemplateOnboard';
import ShopOnboard from './components/ShopOnboard';
import { Alert } from 'antd';
import Title from 'antd/lib/typography/Title';

export const Onboard = () => {
  const [companyOnboard, setCompanyOnboard] = useState({});

  let showOnboard = true;

  useEffect(() => {
    getCompanyOnboard();
  }, []);

  const getCompanyOnboard = async () => {
    const response = await GET_COMPANY_ONBOARD();
    setCompanyOnboard(response);

    // showOnboard
    let showOnboard = false;
    for (let key in response) {
      if (response[key]) {
        showOnboard = true;
        break;
      }
    }
  };

  return (
    <>
      <Title level={4}>使用嚮導</Title>
      <Alert message="使用嚮導助您快速熟悉系統及添加必需要的組件" type="success" showIcon banner />
      <Space direction="vertical" style={{ display: 'flex' }}>
        <ShopOnboard />
        <CategoryOnboard />
        <ItemOnboard />
        <CompanyBusinessOnboard />
        <OrderOnobard />
        <PriceTemplateOnboard />
      </Space>
    </>
  );

  return (
    <>
      {showOnboard ? (
        <>
          <Title level={4}>使用嚮導</Title>
          <Alert
            message="使用嚮導助您快速熟悉系統及添加必需要的組件"
            type="success"
            showIcon
            banner
          />
          <Space direction="vertical" style={{ display: 'flex' }}>
            {companyOnboard.showCreateShop ? <ShopOnboard /> : null}
            {companyOnboard.showCreateCategory ? <CategoryOnboard /> : null}
            {companyOnboard.showCreateItem ? <ItemOnboard /> : null}
            {companyOnboard.showCreateCompanyBusiness ? <CompanyBusinessOnboard /> : null}
            {companyOnboard.showCreatePriceTemplate ? <PriceTemplateOnboard /> : null}
          </Space>
        </>
      ) : null}
    </>
  );
};

export default Onboard;

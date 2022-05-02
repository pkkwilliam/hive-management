import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

const ProFormShopSelect = (props) => {
  const query = async (params) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_SHOP_SERVICE_CONFIG, {
      active: true,
    });
    return response.data.map((shop) => ({ value: shop.id, label: shop.name }));
  };
  return <ProFormSelect request={query} {...props} />;
};

export default ProFormShopSelect;

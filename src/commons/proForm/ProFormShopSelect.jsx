import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const queryShop = async (params) => {
  const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_SHOP_SERVICE_CONFIG, {
    active: true,
    name: params.keyWords,
  });
  return response.data.map((shop) => ({ value: shop.id, label: shop.name }));
};

const ProFormShopSelect = (props) => {
  return <ProFormSelect request={queryShop} {...props} />;
};

export default ProFormShopSelect;

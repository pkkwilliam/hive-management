import React from 'react';
import { COMPANY_MANAGER_GET_DISTINCT_ITEM_BRAND_LIST } from '@/services/hive/itemService';
import { ProFormSelect } from '@ant-design/pro-form';

export const queryItemBrand = async (params) => {
  const response = await COMPANY_MANAGER_GET_DISTINCT_ITEM_BRAND_LIST({
    active: true,
    brand: params.keyWords,
  });
  return response.map((brand) => ({ value: brand }));
};

const ProFormItemBrandSelect = (props) => {
  return <ProFormSelect request={queryItemBrand} showSearch {...props} />;
};

export default ProFormItemBrandSelect;

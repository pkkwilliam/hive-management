import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const queryCategory = async (params) => {
  const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(COMPANY_CATEGORY_SERVICE_CONFIG, {
    ...params,
    active: true,
    current: 1,
    name: params.keyWords,
    pageSize: 50,
  });
  return response.data.map((category) => ({ value: category.id, label: category.name }));
};

const ProFormCategorySelect = (props) => {
  return <ProFormSelect request={queryCategory} {...props} />;
};

export default ProFormCategorySelect;

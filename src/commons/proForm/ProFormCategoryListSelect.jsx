import React from 'react';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { ProFormList, ProFormSelect } from '@ant-design/pro-form';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

const ProFormCategoryListSelect = (props) => {
  const queryCateory = async (params) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_CATEGORY_SERVICE_CONFIG,
      {
        active: true,
        current: 1,
        name: params.keyWords,
        pageSize: 20,
      },
    );
    return response.content.map((category) => ({ value: category.id, label: category.name }));
  };

  return (
    <ProFormList {...props}>
      <ProFormSelect request={queryCateory} name={['id']} showSearch />
    </ProFormList>
  );
};

export default ProFormCategoryListSelect;

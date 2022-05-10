import React from 'react';
import { COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG } from '@/services/hive/itemSpecificationPriceTemplate';
import { ProFormSelect } from '@ant-design/pro-form';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

export const queryItemSpecificationPriceTemplate = async (params) => {
  const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
    COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
    {
      active: true,
      current: 1,
      pageSize: 50,
      name: params.keyWords,
    },
  );
  return response.content.map((priceTemplate) => ({
    label: priceTemplate.name,
    value: priceTemplate.id,
  }));
};

const ProFormItemSpecificationPriceTemplate = (props) => {
  return <ProFormSelect request={queryItemSpecificationPriceTemplate} showSearch {...props} />;
};

export default ProFormItemSpecificationPriceTemplate;

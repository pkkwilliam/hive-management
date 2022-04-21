import React from 'react';
import { COMPANY_MANAGER_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ProFormSelect } from '@ant-design/pro-form';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

const ProFormItemSelect = (props) => {
  const queryItem = async (param) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SERVICE_CONFIG,
      {
        active: true,
        current: 1,
        pageSize: 500,
        name: param.keyWords,
      },
    );
    const transformedResponse = response.content.map((item) => ({
      label: item.name,
      value: item.id,
      data: item,
    }));
    return transformedResponse;
  };

  return <ProFormSelect request={queryItem} {...props} />;
};

export default ProFormItemSelect;

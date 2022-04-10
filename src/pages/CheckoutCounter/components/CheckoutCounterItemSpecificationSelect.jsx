import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import {
  COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
  COMPANY_SPECIFICATION_FUZZY_SEARCH,
} from '@/services/hive/itemSpecificationService';
import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';

const CheckoutCounterItemSpecificationSelect = (props) => {
  const query = async (params) => {
    const response = await COMPANY_SPECIFICATION_FUZZY_SEARCH({ fuzzyString: props.keyWords });
    const options = response.map((itemSpecification) => ({
      value: itemSpecification.id,
      label: `${itemSpecification?.item?.name} | ${itemSpecification?.name} | ${itemSpecification?.sku} | $${itemSpecification?.price}`,
      data: itemSpecification,
    }));
    return options;
  };
  return (
    <ProFormSelect
      debounceTime={3000}
      request={query}
      fieldProps={{ onSelect: props.onSelect }}
      {...props}
    />
  );
};

export default CheckoutCounterItemSpecificationSelect;

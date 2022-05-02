import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { getEnumOjbectsWithValueAsKey } from '@/enum/enumUtil';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';

const ProFormItemSpecificationSelect = (props) => {
  const queryItemSpecification = async (param) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_MANAGER_ITEM_SPECIFICATION_SERVICE_CONFIG,
      {
        active: true,
        current: 1,
        pageSize: 500,
        'item.id': props.item.id,
        name: param.keyWords,
      },
    );
    const transformedResponse = getEnumOjbectsWithValueAsKey(response.content).map(
      (itemSpecification) => ({
        label: `${itemSpecification.name} 基本價格: $${itemSpecification.price} 折扣價格: $${
          itemSpecification?.discountPrice ?? '-'
        }`,
        value: itemSpecification.id,
      }),
    );
    return transformedResponse;
  };

  return <ProFormSelect request={queryItemSpecification} {...props} />;
};

export default ProFormItemSpecificationSelect;

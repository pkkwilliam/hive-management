import React from 'react';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { ProFormSelect } from '@ant-design/pro-form';

const ProFormCompanyBusinessAddressSelect = (props) => {
  const query = async (params) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      { active: true, current: 1, pageSize: 10, id: params.companyBusiness.id },
    );
    return response.data[0].deliveryAddress.map((address) => ({
      value: address.id,
      label: `${address.street} ${address.unit}`,
    }));
  };
  return <ProFormSelect request={query} {...props} />;
};

export default ProFormCompanyBusinessAddressSelect;

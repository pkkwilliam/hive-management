import React, { useState } from 'react';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { ProFormSelect } from '@ant-design/pro-form';

const ProFormCompanyBusinessSelect = (props) => {
  const query = async (params) => {
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      { active: true, current: 1, name: params.keyWords, pageSize: 20 },
    );
    return response.data.map((business) => ({
      value: business.id,
      label: business.name,
      data: business,
    }));
  };

  return <ProFormSelect request={query} {...props} />;
};

export default ProFormCompanyBusinessSelect;

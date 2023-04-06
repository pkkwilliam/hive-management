import { getValueEnum } from '@/enum/enumUtil';
import { INVEST_TYPES } from '@/enum/investType';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const ProFormInvestTypeSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(INVEST_TYPES)} {...props} />;
};

export default ProFormInvestTypeSelect;

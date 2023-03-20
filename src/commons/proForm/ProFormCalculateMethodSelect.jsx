import { CALCULATE_METHODS } from '@/enum/CalculateMethod';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const ProFormCalculateMerhodSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(CALCULATE_METHODS)} {...props} />;
};

export default ProFormCalculateMerhodSelect;

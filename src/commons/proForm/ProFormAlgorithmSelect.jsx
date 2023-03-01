import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const ProFormAlgorithmSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(ALGORITHM_TYPES)} {...props} />;
};

export default ProFormAlgorithmSelect;

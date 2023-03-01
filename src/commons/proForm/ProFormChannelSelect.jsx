import { CHANNEL_TYPES } from '@/enum/Channel';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';

export const ProFormInvestChannelSelect = (props) => {
  return <ProFormSelect valueEnum={getValueEnum(CHANNEL_TYPES)} {...props} />;
};

export default ProFormInvestChannelSelect;

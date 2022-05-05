import { CURRENCIES } from '@/enum/currency';
import { getValueEnum } from '@/enum/enumUtil';
import { ProFormRadio } from '@ant-design/pro-form';
import React from 'react';

const ProFormCurrencyRadio = (props) => {
  return <ProFormRadio.Group valueEnum={getValueEnum(CURRENCIES)} {...props} />;
};

export default ProFormCurrencyRadio;

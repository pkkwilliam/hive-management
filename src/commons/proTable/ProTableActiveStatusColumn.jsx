import { ACTIVES } from '@/enum/active';
import { getValueEnum } from '@/enum/enumUtil';
import React from 'react';

const ProTableActiveStatusColumn = (props = { key: 'active', hideInTable: true, order: -1 }) => {
  const { key, hideInTable, order } = props;
  return {
    title: '狀態',
    dataIndex: 'active',
    hideInTable,
    key,
    order,
    valueEnum: getValueEnum(ACTIVES),
  };
};

export default ProTableActiveStatusColumn;

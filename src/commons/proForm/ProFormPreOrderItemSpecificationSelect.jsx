import React, { useState } from 'react';
import { PUBLIC_PRE_ORDER_ITEM_SPECIFICATION } from '@/services/hive/preOrderService';
import { ProFormSelect } from '@ant-design/pro-form';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ITEM_SPECIFICATION_STATUS_SUSPEND } from '@/enum/itemSpecificationStatus';

const ProFormPreOrderItemSpecificationSelection = (props) => {
  const queryPreOrderItemSpecification = async (params) => {
    console.log(params);
    const { companyBusiness, distributionShop, item, showStock } = params;
    const response = await PUBLIC_PRE_ORDER_ITEM_SPECIFICATION(
      companyBusiness,
      distributionShop,
      item,
      showStock,
    );
    return response.map((preOrderItemSpecification) => {
      const { priceTemplate, itemSpecification, price } = preOrderItemSpecification;
      const { itemSpecificationStatus, name, stockResponse } = itemSpecification;
      return {
        data: preOrderItemSpecification,
        value: itemSpecification.id,
        label: (
          <Space direction="horizontal">
            {itemSpecificationStatus === ITEM_SPECIFICATION_STATUS_SUSPEND.key ? (
              <Text type="danger">暫停銷售</Text>
            ) : null}
            <Text>{name}</Text>
            <Text type={priceTemplate ? 'success' : 'warning'}>
              {priceTemplate ? '特供價' : '基本價'}
            </Text>
            <Text bold type={priceTemplate ? 'success' : 'warning'}>
              ${price}
            </Text>
            <Text>庫存: {stockResponse.stock}件</Text>
          </Space>
        ),
      };
    });
  };

  return (
    <ProFormSelect
      request={(params) => queryPreOrderItemSpecification({ ...params, ...props })}
      {...props}
    />
  );
};

export default ProFormPreOrderItemSpecificationSelection;

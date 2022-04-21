import { calculateTotalCost, calculateTotalCount } from '@/util/itemSpecificationCostUtil';
import { StatisticCard } from '@ant-design/pro-card';
import React from 'react';

const CheckoutCounterItemSpecificationSelectedStatistic = (props) => {
  const calculateTotalCost = () => {
    return props.selectedItemSpecifications.reduce((previous, current) => {
      return (
        previous +
        (current.itemSpecification.discountPrice
          ? current.itemSpecification.discountPrice
          : current.itemSpecification.price) *
          current.quantity
      );
    }, 0);
  };

  const calculateTotalCount = () => {
    return props.selectedItemSpecifications.reduce(
      (previous, current) => previous + current.quantity,
      0,
    );
  };

  return (
    <StatisticCard.Group direction={'row'}>
      <StatisticCard
        statistic={{
          title: '件數',
          value: calculateTotalCount(props.selectedItemSpecifications),
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '($)金額',
          value: `$${calculateTotalCost(props.selectedItemSpecifications)}`,
        }}
      />
    </StatisticCard.Group>
  );
};

export default CheckoutCounterItemSpecificationSelectedStatistic;

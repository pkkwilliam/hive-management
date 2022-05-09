import { money } from '@/util/numberUtil';
import { calculateTotalCostByCurrency } from '@/util/orderUtil';
import { StatisticCard } from '@ant-design/pro-card';
import React from 'react';

const OrderStatistic = (props) => {
  const { orders } = props;
  const costByCurrency = calculateTotalCostByCurrency(orders);
  return (
    <StatisticCard.Group direction="row">
      <StatisticCard
        statistic={{
          title: '訂單數量',
          value: orders.length,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '香港元總金額',
          value: money(costByCurrency.HKD),
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '澳門元總金額',
          value: money(costByCurrency.MOP),
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '人民幣總金額',
          value: money(costByCurrency.CNY),
        }}
      />
    </StatisticCard.Group>
  );
};

export default OrderStatistic;

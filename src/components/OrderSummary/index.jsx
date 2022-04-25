import { GET_ORDER_SUMMAERY } from '@/services/hive/orderService';
import { StatisticCard } from '@ant-design/pro-card';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';

const OrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState({});

  const getOrderSummary = async () => {
    const response = await GET_ORDER_SUMMAERY();
    setOrderSummary(response);
  };

  useEffect(() => {
    getOrderSummary();
  }, []);

  return (
    <StatisticCard.Group title="核心指標" direction={'row'}>
      <StatisticCard
        statistic={{
          title: '未完成訂單',
          tip: '訂單金額未收齊或訂單未送達',
          value: orderSummary.orderNotFinished,
          precision: 0,
        }}
      />
      <Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '未收金額',
          value: orderSummary.paymentStatusPendingTotalValue,
          precision: 2,
          suffix: '元',
        }}
      />
    </StatisticCard.Group>
  );
};

export default OrderSummary;

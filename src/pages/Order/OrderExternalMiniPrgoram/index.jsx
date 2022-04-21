import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WECHAT } from '@/enum/orderPlaceChannel';

const OrderExternalMiniProgram = () => {
  return <Order orderPlaceChannel={ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WECHAT.key} />;
};

export default OrderExternalMiniProgram;

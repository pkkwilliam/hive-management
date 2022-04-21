import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_INTERNAL_ORDER } from '@/enum/orderPlaceChannel';

const OrderInternal = () => {
  return <Order orderPlaceChannel={ORDER_PLACE_CHANNEL_INTERNAL_ORDER.key} />;
};

export default OrderInternal;

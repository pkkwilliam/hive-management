import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_INTERNAL_ORDER } from '@/enum/orderPlaceChannel';
import OrderInternalModalForm from './components/OrderInternalModalForm';

const OrderInternal = () => {
  return (
    <Order
      modalFormComponent={(props) => <OrderInternalModalForm {...props} />}
      orderPlaceChannel={ORDER_PLACE_CHANNEL_INTERNAL_ORDER.key}
    />
  );
};

export default OrderInternal;

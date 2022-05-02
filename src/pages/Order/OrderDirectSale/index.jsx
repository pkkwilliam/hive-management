import { ORDER_PLACE_CHANNEL_DIRECT_SALES_IN_SHOP } from '@/enum/orderPlaceChannel';
import React from 'react';
import Order from '..';
import OrderDirectSaleModalForm from './components/OrderDirectSaleModalForm';

const OrderDirectSale = () => {
  return (
    <Order
      modalFormComponent={(props) => <OrderDirectSaleModalForm {...props} />}
      orderPlaceChannel={ORDER_PLACE_CHANNEL_DIRECT_SALES_IN_SHOP.key}
    />
  );
};

export default OrderDirectSale;

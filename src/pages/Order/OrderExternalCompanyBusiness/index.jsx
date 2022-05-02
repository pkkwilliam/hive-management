import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_EXTERNAL_BUSINESS } from '@/enum/orderPlaceChannel';
import OrderExternalCompanyBusinessModalForm from './components/OrderExternalCompanyBusinessModalForm';

const OrderExternalCompanyBusiness = () => {
  return (
    <Order
      modalFormComponent={(props) => <OrderExternalCompanyBusinessModalForm {...props} />}
      orderPlaceChannel={ORDER_PLACE_CHANNEL_EXTERNAL_BUSINESS.key}
    />
  );
};

export default OrderExternalCompanyBusiness;

import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WECHAT } from '@/enum/orderPlaceChannel';
import OrderExternalMiniProgramModalForm from './components/OrderExternalMiniProgramModalForm';

const OrderExternalMiniProgram = () => {
  return (
    <Order
      modalFormComponent={(props) => <OrderExternalMiniProgramModalForm {...props} />}
      orderPlaceChannel={ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WECHAT.key}
      showCreateButton={false}
    />
  );
};

export default OrderExternalMiniProgram;

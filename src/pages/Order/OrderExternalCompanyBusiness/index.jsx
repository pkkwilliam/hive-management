import React from 'react';
import Order from '@/pages/Order/index';
import { ORDER_PLACE_CHANNEL_EXTERNAL_BUSINESS } from '@/enum/orderPlaceChannel';

const OrderExternalCompanyBusiness = () => {
  return <Order orderPlaceChannel={ORDER_PLACE_CHANNEL_EXTERNAL_BUSINESS.key} />;
};

export default OrderExternalCompanyBusiness;

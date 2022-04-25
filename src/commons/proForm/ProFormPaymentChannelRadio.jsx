import { getValueEnum } from '@/enum/enumUtil';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { ProFormRadio } from '@ant-design/pro-form';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const ProFormPaymentChannelRadio = (props) => {
  const paymentChannels = props.paymentChannels ? props.paymentChannels : PAYMENT_CHANNELS;
  return (
    <>
      <Text type="secondary">電子支付功能需要提前開通</Text>
      <ProFormRadio.Group valueEnum={getValueEnum(paymentChannels)} {...props} />
    </>
  );
};

export default ProFormPaymentChannelRadio;

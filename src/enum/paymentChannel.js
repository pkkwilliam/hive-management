export const PAYMENT_CHANNEL_ALIPAY = { key: 'ALIPAY', label: '支付寶', disabled: true };
export const PAYMENT_CHANNEL_BOC_PAY = { key: 'BOC_PAY', label: '中國銀行', disabled: true };
export const PAYMENT_CHANNEL_CASH = { key: 'CASH', label: '現金支付', disabled: false };
export const PAYMENT_CHANNEL_MONTHLY = { key: 'MONTHLY', label: '月結' };
export const PAYMENT_CHANNEL_M_PAY = { key: 'M_PAY', label: '澳門通(Mpay)', disabled: false };
export const PAYMENT_CHANNEL_WECHAT_PAY = { key: 'WECHAT_PAY', label: '微信支付', disabled: true };

export const PAYMENT_CHANNELS = [
  PAYMENT_CHANNEL_CASH,
  PAYMENT_CHANNEL_M_PAY,
  PAYMENT_CHANNEL_ALIPAY,
  PAYMENT_CHANNEL_WECHAT_PAY,
  PAYMENT_CHANNEL_BOC_PAY,
  PAYMENT_CHANNEL_MONTHLY,
];

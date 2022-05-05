export const ORDER_STATUS_ORDER_RECEIVED = {
  key: 'ORDER_RECEIVED',
  label: '接收',
  status: 'processing',
};
export const ORDER_STATUS_ORDER_PENDING_APPROVAL = {
  key: 'ORDER_PENDING_APPROVAL',
  label: '等待審批',
  status: 'processing',
};
export const ORDER_STATUS_ORDER_PENDING = {
  key: 'ORDER_PENDING',
  label: '處理中',
  status: 'processing',
};
export const ORDER_STATUS_ORDER_READY_TO_PICK_UP = {
  key: 'ORDER_READY_TO_PICK_UP',
  label: '配貨完成',
  status: 'success',
};
export const ORDER_STATUS_ORDER_FINISHED = {
  key: 'ORDER_FINISHED',
  label: '完成',
  status: 'default',
};
export const ORDER_STATUS_PAYMENT_PENDING = {
  key: 'PAYMENT_PENDING',
  label: '等待支付',
  status: 'warning',
};

export const ORDER_REFUND = {
  key: 'ORDER_REFUND',
  label: '退單',
  status: 'default',
};

export const ORDER_STATUSES = [
  ORDER_STATUS_ORDER_RECEIVED,
  ORDER_STATUS_ORDER_PENDING_APPROVAL,
  ORDER_STATUS_ORDER_PENDING,
  ORDER_STATUS_ORDER_READY_TO_PICK_UP,
  ORDER_STATUS_ORDER_FINISHED,
];

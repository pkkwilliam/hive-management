import { constructBasicRequest } from './config';

const USER_MANUAL_ORDER_SERVICE_URL = '/user/manual_order/v1';

export const USER_MANUAL_ORDER_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_MANUAL_ORDER_SERVICE_URL,
};

export const BUY_ORDER = (investId, params) => {
  const request = {
    authenticated: USER_MANUAL_ORDER_SERVICE_CONFIG.requireAuth,
    body: params,
    method: 'POST',
    requestUrl: USER_MANUAL_ORDER_SERVICE_CONFIG.serviceUrl + `/${investId}/buy`,
  };
  return constructBasicRequest(request);
};

export const SELL_ORDER = (orderId, params) => {
  const request = {
    authenticated: USER_MANUAL_ORDER_SERVICE_CONFIG.requireAuth,
    body: params,
    method: 'POST',
    requestUrl: USER_MANUAL_ORDER_SERVICE_CONFIG.serviceUrl + `/${orderId}/sell`,
  };
  return constructBasicRequest(request);
};

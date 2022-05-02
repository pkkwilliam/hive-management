import { constructBasicRequest } from './config';

export const COMPANY_ORDER_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: '/company_staff/order/v1',
};

export const USER_ORDER_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: '/user/order/v1',
};

export async function GET_ORDER_SUMMAERY() {
  const request = {
    authenticated: COMPANY_ORDER_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: COMPANY_ORDER_SERVICE_CONFIG.serviceUrl + '/summary',
  };
  return constructBasicRequest(request);
}

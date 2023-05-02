import { constructBasicRequest } from './config';

const USER_INVEST_SERVICE_URL = '/user/invest/v1';

export const USER_INVEST_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_INVEST_SERVICE_URL,
};

export async function getOrderBook(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/orderBook`,
  };
  return constructBasicRequest(request);
}

import { constructBasicRequest } from './config';

const USER_INVEST_SERVICE_URL = '/user/invest/v1';

export const USER_INVEST_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_INVEST_SERVICE_URL,
};

export async function GET_INVEST_ORDER_BOOK(investId) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + `/${investId}/orderBook`,
  };
  return constructBasicRequest(request);
}

export async function GET_INVEST_SUMMARY(investId, startDate, endDate) {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl:
      USER_INVEST_SERVICE_CONFIG.serviceUrl +
      `/${investId}/summary?startDate=${startDate}&endDate=${endDate}`,
  };
  return constructBasicRequest(request);
}

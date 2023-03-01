import { contructPaginationRequest } from './config';

const USER_AUTOMATE_ORDER_SERVUCE_URL = '/user/automate_order/v1';

export const USER_INVEST_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_AUTOMATE_ORDER_SERVUCE_URL,
};

export const GET_INVEST_AUTOMATE_ORDERS = (params, sort, filter) => {
  const request = {
    authenticated: USER_INVEST_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    params,
    requestUrl: USER_INVEST_SERVICE_CONFIG.serviceUrl + '/get_by_invest_id',
  };
  return contructPaginationRequest(request);
};

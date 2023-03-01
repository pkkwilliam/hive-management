import { constructBasicRequest } from './config';

const USER_INVEST_SYNC_SERVICE_URL = '/user/invest_sync/v1';

export const USER_INVEST_SYNC_SERVICE_URL_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_INVEST_SYNC_SERVICE_URL,
};

export const INVEST_SYNC = async () => {
  const request = {
    authenticated: true,
    method: 'POST',
    requestUrl: USER_INVEST_SYNC_SERVICE_URL_CONFIG.serviceUrl,
  };
  return constructBasicRequest(request);
};

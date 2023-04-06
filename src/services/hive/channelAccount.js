import { constructBasicRequest } from './config';

const USER_CHANNEL_ACCOUNT_SERVICE_URL = '/user/channel_account/v1';

export const USER_CHANNEL_ACCOUNT_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: USER_CHANNEL_ACCOUNT_SERVICE_URL,
};

export async function GET_CHANNEL_ACCOUNTS(params) {
  const request = {
    authenticated: USER_CHANNEL_ACCOUNT_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: USER_CHANNEL_ACCOUNT_SERVICE_CONFIG.serviceUrl,
  };
  return constructBasicRequest(request);
}

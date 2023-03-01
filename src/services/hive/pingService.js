import { constructBasicRequest } from './config';

const PUBLIC_PING_SERVICE = '/public/ping/v1';

export const PUBLIC_PING_SERVICE_CONFIG = {
  requireAuth: false,
  serviceUrl: PUBLIC_PING_SERVICE,
};

export const GET_PING = async () => {
  const request = {
    authenticated: PUBLIC_PING_SERVICE_CONFIG.requireAuth,
    method: 'GET',
    requestUrl: PUBLIC_PING_SERVICE_CONFIG.serviceUrl,
  };
  return constructBasicRequest(request);
};

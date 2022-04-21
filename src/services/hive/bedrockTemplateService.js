import { constructBasicRequest, contructPaginationRequest } from './config';

export async function BEDROCK_CREATE_SERVICE_REQEUST(serviceConfig, requestBody) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    body: requestBody,
    method: 'POST',
    requestUrl: serviceConfig.serviceUrl,
  };
  return constructBasicRequest(request);
}

export async function BEDROCK_DEACTIVATE_SERVICE_REQUEST(serviceConfig, entityId) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'DELETE',
    requestUrl: serviceConfig.serviceUrl + `/${entityId}/deactivate`,
  };
  return constructBasicRequest(request);
}

export async function BEDROCK_GET_BY_ID_SERVICE_REQUEST(serviceConfig, id) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'GET',
    requestUrl: serviceConfig.serviceUrl + `/${id}`,
  };
  return constructBasicRequest(request);
}

export async function BEDROCK_QUERY_FIRST_SERVICE_REQUEST(serviceConfig, params, sort, filter) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'GET',
    params: {
      active: true,
      ...params,
    },
    requestUrl: serviceConfig.serviceUrl + '/query_first',
  };
  const response = await constructBasicRequest(request);
  return { data: response, success: true, total: response.length };
}

export async function BEDROCK_QUERY_LIST_SERVICE_REQUEST(serviceConfig, params, sort, filter) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'GET',
    params: {
      active: true,
      ...params,
    },
    requestUrl: serviceConfig.serviceUrl + '/query_list',
  };
  const response = await constructBasicRequest(request);
  return { data: response, success: true, total: response.length };
}

export async function BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
  serviceConfig,
  params,
  sort,
  filter,
) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    method: 'GET',
    params: {
      active: true,
      ...params,
      pageRequest: params.current - 1,
    },
    requestUrl: serviceConfig.serviceUrl + '/query_pagination',
  };
  return contructPaginationRequest(request);
}

export async function BEDROCK_UPDATE_SERVICE_REQUEST(serviceConfig, requestBody) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    body: requestBody,
    method: 'PUT',
    requestUrl: serviceConfig.serviceUrl,
  };
  return constructBasicRequest(request);
}

export async function BEDROCK_UPDATE_BATCH_SERVICE_REQUEST(serviceConfig, requestBody) {
  const request = {
    authenticated: serviceConfig.requireAuth,
    body: requestBody,
    method: 'PUT',
    requestUrl: serviceConfig.serviceUrl + '/batch',
  };
  return constructBasicRequest(request);
}

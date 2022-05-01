import { constructBasicRequest } from './config';

const COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_URL =
  '/company/item_specification_price_template/v1';

const COMPANY_STAFF_ITEM_SPECIFICATION_STOCK_SERVICE_URL =
  '/company_staff/item_specification_price_template/v1';

export const COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_URL,
};

export const COMPANY_STAFF_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG = {
  requireAuth: true,
  serviceUrl: COMPANY_STAFF_ITEM_SPECIFICATION_STOCK_SERVICE_URL,
};

export async function COMPANY_STAFF_GET_TEMPLATE_PRICE(companyBusinessId, itemSpecificationId) {
  const request = {
    authenticated: COMPANY_STAFF_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG.requireAuth,
    params: {
      companyBusinessId,
      itemSpecificationId,
    },
    method: 'GET',
    requestUrl: COMPANY_STAFF_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG.serviceUrl + '/price',
  };
  return constructBasicRequest(request);
}

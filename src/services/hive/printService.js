import { constructBasicRequest } from './config';

const COMPANY_PRINT_SERVICE_URL = '/company/print/v1';

export async function COMPANY_PRINT_ORDER_BY_ID(orderId, printerId = undefined) {
  const request = {
    authenticated: true,
    method: 'POST',
    params: {
      printerId,
    },
    requestUrl: COMPANY_PRINT_SERVICE_URL + `/order/${orderId}`,
  };
  return constructBasicRequest(request);
}

export async function COMPANY_TEST_SHOP_PRINTER(shopId) {
  const request = {
    authenticated: true,
    method: 'POST',
    requestUrl: COMPANY_PRINT_SERVICE_URL + `/test_printer/shop/${shopId}`,
  };
  return constructBasicRequest(request);
}

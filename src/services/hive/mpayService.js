import { constructBasicRequest } from './config';

export const COMPANY_MPAY_SERVICE_URL = '/company/mpay/v1';
export const PUBLIC_MPAY_SERVICE_URL = '/public/mpay_order/v1';
export const PUBLIC_MPAY_TEST_SERVICE_URL = '/public/mpay_test/v1';

// TEST ONLY
export async function PUBLIC_TEST_GET_MPAY_H5_REQUEST(transactionId) {
  const request = {
    authenticated: true,
    method: 'POST',
    params: { transactionId },
    requestUrl: PUBLIC_MPAY_TEST_SERVICE_URL + '/h5',
  };
  return constructBasicRequest(request);
}

export async function PUBLIC_GET_MPAY_H5_ORDER_REQUEST(orderId, returnUrl) {
  const request = {
    authenticated: false,
    method: 'POST',
    params: { orderId, returnUrl },
    requestUrl: PUBLIC_MPAY_SERVICE_URL + '/h5',
  };
  return constructBasicRequest(request);
}

export async function COMPANY_ORDER_MPAY_BARDCODE(barcode, orderId) {
  const request = {
    authenticated: true,
    method: 'POST',
    params: { barcode, orderId },
    requestUrl: COMPANY_MPAY_SERVICE_URL + '/order/barcode',
  };
  return constructBasicRequest(request);
}

export async function COMPANY_ORDER_MPAY_QR_CODE(orderId) {
  const request = {
    authenticated: true,
    method: 'POST',
    params: { orderId },
    requestUrl: COMPANY_MPAY_SERVICE_URL + '/order/qrcode',
  };
  return constructBasicRequest(request);
}

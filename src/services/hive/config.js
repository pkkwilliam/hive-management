import { getUserToken } from '@/storage/applicationStorage';
import { request } from 'umi';
import serviceErrorCode from './serviceErrorCode.json';
import { message } from 'antd';

export function getServiceUrl() {
  return API_URL;
}

export async function constructBasicRequest(requestInfo, options) {
  const { body, method, params, requestUrl, responseType = 'json', successMessage } = requestInfo;
  return request(getServiceUrl() + requestUrl, {
    body: JSON.stringify(body),
    headers: {
      Authorization: 'Bearer ' + getUserToken(),
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method,
    params,
    responseType,
    ...(options || {}),
    errorHandler: (error) => {
      console.log('error', error);
      const { data } = error;
      message.error(getErrorMessage(data));
      return data;
    },
  }).then((response) => {
    if (responseType === 'blob') {
      const blob = new Blob([response]); //注意拿到的是数据流！！
      const objectURL = URL.createObjectURL(blob);
      let btn = document.createElement('a');
      btn.download = 'qrcode.png'; //文件类型
      btn.href = objectURL;
      btn.click();
      URL.revokeObjectURL(objectURL);
    } else if (response.error) {
      return Promise.reject(response);
    }
    if (response && successMessage) {
      message.success(successMessage);
    }
    return response;
  });
}

export async function contructPaginationRequest(requestInfo, options) {
  return constructBasicRequest(
    {
      ...requestInfo,
      params: {
        ...requestInfo.params,
        pageRequest: requestInfo.params.current - 1,
      },
    },
    options,
  ).then((response) => ({
    ...response,
    success: true,
    data: response.content,
    total: response.totalElements,
  }));
}

function getErrorMessage(data) {
  if (data.errorCode && serviceErrorCode[data.errorCode]) {
    return serviceErrorCode[data.errorCode];
  } else if (data.message) {
    return data.message;
  } else {
    return '出錯';
  }
}

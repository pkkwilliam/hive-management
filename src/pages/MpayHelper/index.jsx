import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useParams } from 'umi';
import { PUBLIC_GET_MPAY_H5_ORDER_REQUEST } from '@/services/hive/mpayService';

const MpayHelper = () => {
  const { orderId } = useParams();
  const [h5PaymentRequest, setH5PaymentRequest] = useState();

  const getH5PaymentRequest = async () => {
    const response = await PUBLIC_GET_MPAY_H5_ORDER_REQUEST(
      orderId,
      MPAY_RETURN_URL + `/${orderId}`,
    );
    setH5PaymentRequest(response);
  };

  useEffect(() => {
    if (h5PaymentRequest) {
      document.forms['payment_auto_submit_form'].submit();
    }
  }, [h5PaymentRequest]);

  useEffect(() => {
    getH5PaymentRequest();
  }, [orderId]);

  return (
    <div className={styles.container}>
      <form id="payment_auto_submit_form" action={h5PaymentRequest?.requestUrl ?? ''} method="get">
        {Object.keys(h5PaymentRequest?.paymentRequest ?? []).map((key) => (
          <input hidden name={key} value={h5PaymentRequest.paymentRequest[key]} key="formPay" />
        ))}
      </form>
    </div>
  );
};

export default MpayHelper;

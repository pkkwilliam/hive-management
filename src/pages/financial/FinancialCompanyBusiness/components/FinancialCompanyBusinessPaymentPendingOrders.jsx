import CompanyBusinessOrders from '@/commons/CompanyBusinessOrders';
import PrintableHiddenComponentWrapper from '@/commons/print/PrintableHiddenComponentWrapper';
import { PAYMENT_STATUS_PENDING } from '@/enum/paymentStatus';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const FinancialCompanyBusinessPaymentPendingOrders = (props) => {
  const companyBusinessOrdersRef = useRef();
  const { companyBusiness, setModalVisible, visible } = props;
  const [orders, setOrders] = useState([]);

  const query = async () => {
    if (!companyBusiness?.id) {
      return;
    }
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ORDER_SERVICE_CONFIG, {
      active: true,
      'companyBusiness.id': companyBusiness.id,
      paymentStatus: PAYMENT_STATUS_PENDING.key,
    });
    setOrders(response.data);
  };

  useEffect(() => {
    query();
  }, [companyBusiness]);

  return (
    <Modal
      footer={[
        <Button key="customClose" onClick={() => setModalVisible(false)}>
          關閉
        </Button>,
        <ReactToPrint
          key="printButoon"
          trigger={() => (
            <Button key="print" type="primary">
              列印
            </Button>
          )}
          content={() => companyBusinessOrdersRef.current}
          pageStyle={`{ size: 2.5in 4in }`}
        />,
      ]}
      onCancel={() => setModalVisible(false)}
      visible={visible}
      width={1500}
    >
      <CompanyBusinessOrders orders={orders} />
      <PrintableHiddenComponentWrapper ref={companyBusinessOrdersRef} zoom={0.7}>
        <CompanyBusinessOrders orders={orders} />
      </PrintableHiddenComponentWrapper>
    </Modal>
  );
};

export default FinancialCompanyBusinessPaymentPendingOrders;

import CompanyBusinessOrders from '@/commons/CompanyBusinessOrders';
import CompanyHeader from '@/commons/print/CompanyHeader';
import PrintableHiddenComponentWrapper from '@/commons/print/PrintableHiddenComponentWrapper';
import { Button, Divider, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const FinancialCompanyBusinessPaymentPendingOrders = (props) => {
  const companyBusinessOrdersRef = useRef();
  const { orders, setModalVisible, visible } = props;

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
        <Space direction="vertical">
          <CompanyHeader />
          <Divider />
          <CompanyBusinessOrders orders={orders} />
        </Space>
      </PrintableHiddenComponentWrapper>
    </Modal>
  );
};

export default FinancialCompanyBusinessPaymentPendingOrders;

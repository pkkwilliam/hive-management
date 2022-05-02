import OrderDetail from '@/commons/order/OrderDetail';
import CompanyHeader from '@/commons/print/CompanyHeader';
import PrintableHiddenComponentWrapper from '@/commons/print/PrintableHiddenComponentWrapper';
import { COMPANY_PRINT_ORDER_BY_ID } from '@/services/hive/printService';
import { Button, Divider, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useModel } from 'umi';

const OrderDetailModal = (props) => {
  const orderDetailRef = useRef();
  const { order, setModalVisible, visible } = props;

  const { printers } = useModel('printer');

  const onClickPrintDistributionList = async (printerId) => {
    await COMPANY_PRINT_ORDER_BY_ID(order.id, printerId);
  };

  return (
    <Modal
      footer={[
        <Button key="customClose" onClick={() => setModalVisible(false)}>
          關閉
        </Button>,
        [
          ...printers.map((printer) => (
            <Button key="printReceipt" onClick={() => onClickPrintDistributionList(printer.id)}>
              {`列印收據-${printer.name}`}
            </Button>
          )),
        ],
        // <Button key="printReceipt" onClick={onClickPrintDistributionList}>
        //   列印收據
        // </Button>,
        <ReactToPrint
          key="printButoon"
          trigger={() => (
            <Button key="print" type="primary">
              列印
            </Button>
          )}
          content={() => orderDetailRef.current}
          pageStyle={`{ size: 2.5in 4in }`}
        />,
      ]}
      onCancel={() => setModalVisible(false)}
      visible={visible}
      width={1500}
    >
      <OrderDetail order={order} />
      <PrintableHiddenComponentWrapper ref={orderDetailRef} zoom={0.7}>
        <Space direction="vertical">
          <CompanyHeader />
          <Divider />
          <OrderDetail order={order} />
        </Space>
      </PrintableHiddenComponentWrapper>
    </Modal>
  );
};

export default OrderDetailModal;

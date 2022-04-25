import OrderDetail from '@/commons/order/OrderDetail';
import PrintableHiddenComponentWrapper, {
  AutoLineBreakWrapper,
} from '@/commons/print/PrintableHiddenComponentWrapper';
import { Button, Modal } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderDetailModal = (props) => {
  const orderDetailRef = useRef();
  const { order, setModalVisible, visible } = props;
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
        <OrderDetail order={order} />
      </PrintableHiddenComponentWrapper>
    </Modal>
  );
};

export default OrderDetailModal;

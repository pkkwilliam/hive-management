import { Button, Modal, Result } from 'antd';
import React from 'react';

const OnboardResultModal = (props) => {
  const { createButtonText, onClickCreate, onClickClose, successTitle, visible } = props;

  return (
    <Modal footer={null} onCancel={onClickClose} visible={visible} width={1500}>
      <Result
        status="success"
        title={successTitle}
        extra={[
          <Button key="close" onClick={onClickClose}>
            關閉
          </Button>,
          <Button
            key="create"
            onClick={() => {
              onClickClose();
              onClickCreate();
            }}
            type="primary"
          >
            {createButtonText}
          </Button>,
        ]}
      />
    </Modal>
  );
};

export default OnboardResultModal;

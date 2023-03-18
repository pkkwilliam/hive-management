import { Popconfirm } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const InactiveableLinkButton = (props) => {
  const { disabled, key = 'delete', label, onClick, popConfirm, popConfirmMessage } = props;
  let button;
  if (popConfirm) {
    button = (
      <Popconfirm
        cancelText="Cancel"
        key={key}
        onConfirm={onClick}
        okText="OK"
        title={popConfirmMessage ? popConfirmMessage : '確定執行?'}
      >
        <a>{label}</a>
      </Popconfirm>
    );
  } else {
    button = <a onClick={onClick}>{label}</a>;
  }
  return disabled ? <Text disabled>{label}</Text> : button;
};

export default InactiveableLinkButton;

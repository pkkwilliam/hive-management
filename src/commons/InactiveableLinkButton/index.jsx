import { Popconfirm } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const InactiveableLinkButton = (props) => {
  const { disabled, label, onClick, popConfirm, popConfirmMessage } = props;
  let button;
  if (popConfirm) {
    button = (
      <Popconfirm
        cancelText="取消"
        key="delete"
        onConfirm={onClick}
        okText="確定"
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

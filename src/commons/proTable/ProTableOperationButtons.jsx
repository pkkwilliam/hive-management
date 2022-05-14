import { Popconfirm } from 'antd';
import React from 'react';

// const ProTableOperationColumnButtons = (onClickEdit, onClickDelete) => {
//   return ;
// };

const ProTableOperationColumnButtons = (
  onClickEdit,
  onClickDelete,
  inFront = (text, record) => null,
  { deletePopConfirmMessage = '確認刪除?' } = {},
) => {
  return {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      inFront(text, record),
      <a key="edit" onClick={() => onClickEdit(record, _, action)}>
        修改
      </a>,
      <Popconfirm
        cancelText="取消"
        key="delete"
        onConfirm={() => onClickDelete(record, _, action)}
        okText="確定"
        title={deletePopConfirmMessage}
      >
        <a>删除</a>
      </Popconfirm>,
    ],
  };
};

export default ProTableOperationColumnButtons;

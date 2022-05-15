import React from 'react';
import InactiveableLinkButton from '../InactiveableLinkButton';

// const ProTableOperationColumnButtons = (onClickEdit, onClickDelete) => {
//   return ;
// };

const ProTableOperationColumnButtons = (
  onClickEdit,
  onClickDelete,
  inFront = (text, record) => null,
  {
    allowActivate = false,
    activatePopConformMessage = '確認恢復?',
    deletePopConfirmMessage = '確認刪除?',
    activateServiceRequest,
  } = {},
) => {
  return {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => {
      return [
        inFront(text, record),
        <InactiveableLinkButton
          disabled={!record.active}
          key="edit"
          label="修改"
          onClick={() => onClickEdit(record, _, action)}
        />,
        record.active || !allowActivate ? (
          <InactiveableLinkButton
            disabled={!record.active}
            key="delete"
            label="删除"
            onClick={() => onClickDelete(record, _, action)}
            popConfirm
            popConfirmMessage={deletePopConfirmMessage}
          />
        ) : (
          <InactiveableLinkButton
            key="active"
            label="恢復"
            onClick={() => activateServiceRequest(record, _, action)}
            popConfirm
            popConfirmMessage={activatePopConformMessage}
          />
        ),
      ];
    },
  };
};

export default ProTableOperationColumnButtons;

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import CreateCompanyBusinessButton from '@/pages/companyManager/CompanyBusiness/components/CreateCompanyBusinessButton';
import CreateCategoryButton from '@/pages/company/Category/components/CreateCategoryButton';
import ItemStepFormV2 from '@/pages/company/Item/Components/ItemStepFormV2';
import CreateShopButton from '@/pages/companyManager/Shop/components/CreateShopButton';
import { useModel } from 'umi';
import { Alert } from 'antd';

export const CREATE_PRIOR_MODAL_SHOP = {
  action: <CreateShopButton buttonProps={{ size: 'small', type: 'ghost' }} />,
  key: 'CREATE_PRIOR_MODAL_SHOP',
  message: '請先添加門店/倉庫',
  onboardKey: 'showCreateShop',
};

export const CREATE_PRIOR_MODAL_CATEGORY = {
  action: <CreateCategoryButton buttonProps={{ size: 'small', type: 'ghost' }} />,
  key: 'CREATE_PRIOR_MODAL_CATEGORY',
  message: '請先添加標籤/分類',
  onboardKey: 'showCreateCategory',
};

export const CREATE_PRIOR_MODAL_ITEM = {
  action: <ItemStepFormV2 buttonProps={{ size: 'small', type: 'ghost' }} />,
  key: 'CREATE_PRIOR_MODAL_ITEM',
  message: '請先添加商品',
  onboardKey: 'showCreateItem',
};

export const CREATE_PRIOR_MODAL_COMPANY_BUSINESS = {
  action: <CreateCompanyBusinessButton buttonProps={{ size: 'small', type: 'ghost' }} />,
  key: 'CREATE_PRIOR_MODAL_COMPANY_BUSINESS',
  message: '請先添加商戶',
  onboardKey: 'showCreateCompanyBusiness',
};

const CreatePriorModal = (props) => {
  const { onboard } = useModel('onboard');
  const { priorModals } = props;

  let priorModalComponent;

  for (let index = 0; index < priorModals.length; index++) {
    const modal = priorModals[index];
    if (onboard[modal.onboardKey]) {
      priorModalComponent = modal;
      break;
    }
  }

  console.log('yolo', priorModalComponent);

  return (
    <>
      {priorModalComponent ? (
        <Alert
          message={priorModalComponent.message}
          showIcon
          type="warning"
          action={priorModalComponent.action}
        />
      ) : (
        props.children
      )}
    </>
  );
};

export default CreatePriorModal;

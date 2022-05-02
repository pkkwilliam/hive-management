import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import CreateItemSpecificationPriceTemplateButton from '@/pages/companyManager/ItemSpecificationPriceTemplate/components/CreateItemSpecificationPriceTemplateButton';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const PriceTemplateOnboard = () => {
  return (
    <>
      <ProCard
        extra={
          <CreatePriorModal
            key="create"
            priorModals={[
              CREATE_PRIOR_MODAL_SHOP,
              CREATE_PRIOR_MODAL_CATEGORY,
              CREATE_PRIOR_MODAL_ITEM,
              CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
            ]}
          >
            <CreateItemSpecificationPriceTemplateButton />
          </CreatePriorModal>
        }
        bordered
        headerBordered
        size="small"
        title="進階功能 客戶特供價單 (非必要)"
        type="inner"
      >
        <Space>
          <Text>創建特供價單，可對固定客戶提供特供的商品價格</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default PriceTemplateOnboard;

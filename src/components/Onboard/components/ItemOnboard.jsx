import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import ItemStepFormV2 from '@/pages/company/Item/Components/ItemStepFormV2';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const ItemOnboard = () => {
  return (
    <>
      <ProCard
        extra={
          <CreatePriorModal priorModals={[CREATE_PRIOR_MODAL_SHOP, CREATE_PRIOR_MODAL_CATEGORY]}>
            <ItemStepFormV2 />
          </CreatePriorModal>
        }
        bordered
        headerBordered
        size="small"
        title="商品"
        type="inner"
      >
        <Space>
          <Text>創建首個商品</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default ItemOnboard;

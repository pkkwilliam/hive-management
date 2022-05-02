import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import CreateOrderButton from '@/pages/Order/components/CreateOrderButton';
import OrderModalForm from '@/pages/Order/components/OrderModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';

const PriceTemplateOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ORDER_SERVICE_CONFIG, request);
    return true;
  };

  return (
    <>
      <ProCard
        extra={
          <CreatePriorModal
            priorModals={[
              CREATE_PRIOR_MODAL_SHOP,
              CREATE_PRIOR_MODAL_CATEGORY,
              CREATE_PRIOR_MODAL_ITEM,
              CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
            ]}
          >
            <CreateOrderButton />
          </CreatePriorModal>
        }
        bordered
        headerBordered
        size="small"
        title="企業訂單"
        type="inner"
      >
        <Space>
          <Text>創建首個可追蹤，列印，收款的企業訂單。</Text>
        </Space>
      </ProCard>
      <OrderModalForm
        onFinish={create}
        onVisibleChange={setModalFormVisible}
        visible={modalFormVisible}
      />
    </>
  );
};

export default PriceTemplateOnboard;

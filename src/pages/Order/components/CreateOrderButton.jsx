import OnboardResultModal from '@/components/Onboard/components/OnboardResultModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import OrderModalForm from './OrderModalForm';
import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';

const CreateOrderButton = (props) => {
  const { getOnboard } = useModel('onboard');

  const { onFinish = () => {} } = props;

  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [order, setOrder] = useState();
  const [resultVisible, setResultVisible] = useState(false);

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ORDER_SERVICE_CONFIG, request);
    setOrder(response);
    setResultVisible(true);
    getOnboard();
    onFinish();
    return true;
  };

  return (
    <>
      <CreatePriorModal
        priorModals={[
          CREATE_PRIOR_MODAL_SHOP,
          CREATE_PRIOR_MODAL_CATEGORY,
          CREATE_PRIOR_MODAL_ITEM,
          CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
        ]}
      >
        <Button icon={<PlusOutlined />} onClick={() => setModalFormVisible(true)} type="primary">
          創建企業訂單
        </Button>
      </CreatePriorModal>
      <OrderModalForm
        onFinish={create}
        onVisibleChange={setModalFormVisible}
        visible={modalFormVisible}
      />
      <OnboardResultModal
        createButtonText={'創建新訂單'}
        onClickCreate={() => setModalFormVisible(true)}
        onClickClose={() => {
          setOrder(undefined);
          setResultVisible(false);
        }}
        successTitle={`${order?.id}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CreateOrderButton;

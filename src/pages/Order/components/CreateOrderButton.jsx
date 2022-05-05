import OnboardResultModal from '@/components/Onboard/components/OnboardResultModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import OrderModalForm from './OrderModalForm';
import { toApplicationOffsetDateTime } from '@/util/dateUtil';

const CreateOrderButton = (props) => {
  const { getOnboard } = useModel('onboard');

  const { buttonProps, onFinish = () => {} } = props;

  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [order, setOrder] = useState();
  const [resultVisible, setResultVisible] = useState(false);

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ORDER_SERVICE_CONFIG, {
      ...request,
      deliveryDate: toApplicationOffsetDateTime(request.deliveryDate),
    });
    setOrder(response);
    setResultVisible(true);
    onFinish();
    return true;
  };

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setModalFormVisible(true)}
        type="primary"
        {...buttonProps}
      >
        創建企業訂單
      </Button>
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
          getOnboard();
        }}
        successTitle={`${order?.id}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CreateOrderButton;

import OnboardResultModal from '@/components/Onboard/components/OnboardResultModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import ShopModalForm from './shopModalForm';
import { useModel } from 'umi';

const CreateShopButton = (props) => {
  const { getOnboard } = useModel('onboard');

  const { buttonProps, onFinish = () => {} } = props;

  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [shop, setShop] = useState();

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_SHOP_SERVICE_CONFIG, request);
    setShop(response);
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
        創建門店/倉庫
      </Button>
      <ShopModalForm
        onClickSubmit={create}
        setModalVisible={setModalFormVisible}
        visible={modalFormVisible}
      />
      <OnboardResultModal
        createButtonText={'創建新門店'}
        onClickCreate={() => setModalFormVisible(true)}
        onClickClose={() => {
          setShop(undefined);
          setResultVisible(false);
          getOnboard();
        }}
        successTitle={`${shop?.name}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CreateShopButton;

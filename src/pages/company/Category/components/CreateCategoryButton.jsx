import OnboardResultModal from '@/components/Onboard/components/OnboardResultModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import CategoryModalForm from './categoryModalForm';
import { useModel } from 'umi';

const CreateCategoryButton = (props) => {
  const { getOnboard } = useModel('onboard');

  const { buttonProps, onFinish = () => {} } = props;

  const [category, setCategory] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_CATEGORY_SERVICE_CONFIG, request);
    setCategory(response);
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
        創建標籤/分類
      </Button>
      <CategoryModalForm
        onClickSubmit={create}
        setModalVisible={setModalFormVisible}
        visible={modalFormVisible}
      />
      <OnboardResultModal
        createButtonText={'創建新分類'}
        onClickCreate={() => setModalFormVisible(true)}
        onClickClose={() => {
          setCategory(undefined);
          setResultVisible(false);
          getOnboard();
        }}
        successTitle={`${category?.name}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CreateCategoryButton;

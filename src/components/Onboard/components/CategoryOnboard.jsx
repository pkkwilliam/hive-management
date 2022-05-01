import CategoryModalForm from '@/pages/company/Category/components/categoryModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import OnboardResultModal from './OnboardResultModal';

const CategoryOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [category, setCategory] = useState();

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_CATEGORY_SERVICE_CONFIG, request);
    setCategory(response);
    setResultVisible(true);
    return true;
  };

  return (
    <>
      <ProCard
        extra={
          <Button onClick={() => setModalFormVisible(true)} type="primary">
            創建標籤/分類
          </Button>
        }
        headerBordered
        title="標籤/分類"
      >
        <Space>
          <Text>創建首個標籤/分類，方便您以後對所有商品的集成管理</Text>
        </Space>
      </ProCard>
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
        }}
        successTitle={`${category?.name}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CategoryOnboard;

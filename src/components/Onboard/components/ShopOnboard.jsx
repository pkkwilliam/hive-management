import ShopModalForm from '@/pages/companyManager/Shop/components/shopModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import { useModel } from 'umi';

const ShopOnboard = () => {
  const { initialState } = useModel('@@initialState');

  const [modalFormVisible, setModalFormVisible] = useState(false);

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_SHOP_SERVICE_CONFIG, request);
    return true;
  };

  if (initialState.showCreateShop) {
    return null;
  } else {
    return (
      <>
        <ProCard
          extra={
            <Button onClick={() => setModalFormVisible(true)} type="primary">
              創建門店/倉庫
            </Button>
          }
          headerBordered
          title="門店/倉庫"
        >
          <Space>
            <Text>馬上創建首個門店/倉庫，方便您進行地點的管理</Text>
          </Space>
        </ProCard>
        <ShopModalForm
          onClickSubmit={create}
          setModalVisible={setModalFormVisible}
          visible={modalFormVisible}
        />
      </>
    );
  }
};

export default ShopOnboard;

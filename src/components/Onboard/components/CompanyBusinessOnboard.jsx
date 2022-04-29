import CompanyBusinessModalForm from '@/pages/companyManager/CompanyBusiness/components/CompanyBusinessModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';

const CompanyBusinessOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_CATEGORY_SERVICE_CONFIG, request);
    return true;
  };

  return (
    <>
      <ProCard
        extra={
          <Button onClick={() => setModalFormVisible(true)} type="primary">
            創建客戶
          </Button>
        }
        headerBordered
        title="企業客戶"
      >
        <Space>
          <Text>創建首個企業客戶，方便您追蹤客戶的訂單以及為客戶提專屬定的商品價格</Text>
        </Space>
      </ProCard>
      <CompanyBusinessModalForm
        onFinish={create}
        onVisibleChange={setModalFormVisible}
        visible={modalFormVisible}
      />
    </>
  );
};

export default CompanyBusinessOnboard;

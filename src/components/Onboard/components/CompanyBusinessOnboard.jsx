import CompanyBusinessModalForm from '@/pages/companyManager/CompanyBusiness/components/CompanyBusinessModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import OnboardResultModal from './OnboardResultModal';

const CompanyBusinessOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [companyBusiness, setCompanyBusiness] = useState();

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      request,
    );
    setCompanyBusiness(response);
    setResultVisible(true);
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
          <Text>創建首個企業客戶，方便您追蹤客戶的訂單以及為客戶設定商品的特供價單。</Text>
        </Space>
      </ProCard>
      <CompanyBusinessModalForm
        onFinish={create}
        onVisibleChange={setModalFormVisible}
        visible={modalFormVisible}
      />
      <OnboardResultModal
        createButtonText={'創建新客戶'}
        onClickCreate={() => setModalFormVisible(true)}
        onClickClose={() => {
          setCompanyBusiness(undefined);
          setResultVisible(false);
        }}
        successTitle={`${companyBusiness?.name}創建成功`}
        visible={resultVisible}
      />
    </>
  );
};

export default CompanyBusinessOnboard;

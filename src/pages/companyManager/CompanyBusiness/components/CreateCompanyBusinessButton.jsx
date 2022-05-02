import OnboardResultModal from '@/components/Onboard/components/OnboardResultModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import CompanyBusinessModalForm from './CompanyBusinessModalForm';
import { useModel } from 'umi';

const CreateCompanyBusinessButton = (props) => {
  const { getOnboard } = useModel('onboard');

  const { buttonProps, onFinish = () => {} } = props;

  const [companyBusiness, setCompanyBusiness] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
      request,
    );
    setCompanyBusiness(response);
    setResultVisible(true);
    getOnboard();
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
        創建客戶
      </Button>
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

export default CreateCompanyBusinessButton;

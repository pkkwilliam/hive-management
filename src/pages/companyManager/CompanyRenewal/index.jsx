import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Result } from 'antd';
import React from 'react';
import { useModel } from 'umi';

const CompanyRenewal = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card>
        <Result
          title={`企業賬號於${initialState.company?.expiryDate}過期，請聯繫源代碼科技運維人員協助續期。`}
          extra={[
            <Button href="mailto:info@bitcode.mo" key="email">
              電郵
            </Button>,
            <Button href="tel:+85328719871" key="tel" type="primary">
              電話(853) 2871981
            </Button>,
          ]}
          subTitle={'微信小程序會在2星期後自動下線'}
        />
      </Card>
    </PageContainer>
  );
};

export default CompanyRenewal;

import { Image, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useModel } from 'umi';

const CompanyHeader = () => {
  const { companyConfig } = useModel('@@initialState').initialState;
  return (
    <Space>
      <CompanyLogoImage />
      <Space direction="vertical">
        <Title style={{ margin: 0 }}>{companyConfig?.company?.chineseName}</Title>
        <Title level={3} style={{ margin: 0 }}>
          {companyConfig?.company?.englishName}
        </Title>
      </Space>
    </Space>
  );
};

const CompanyLogoImage = () => {
  const { companyConfig } = useModel('@@initialState').initialState;
  const image = companyConfig?.companyInfo?.logoImageUrl ?? undefined;
  if (!image) {
    return null;
  } else {
    return <Image src={image} width={80} />;
  }
};

export default CompanyHeader;

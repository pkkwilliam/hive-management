import { Divider, Image, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useModel } from 'umi';

const CompanyHeader = () => {
  const { companyConfig } = useModel('@@initialState').initialState;
  const { logoWidth, showCompanyChineseName, showCompanyEnglishName, showCompanyLogo, useDivider } =
    companyConfig?.companyPrintHeaderConfig;
  return (
    <>
      <Space>
        {showCompanyLogo ? <CompanyLogoImage /> : null}
        <Space direction="vertical">
          {showCompanyChineseName ? (
            <Title style={{ margin: 0 }}>{companyConfig?.company?.chineseName}</Title>
          ) : null}
          {showCompanyEnglishName ? (
            <Title level={3} style={{ margin: 0 }}>
              {companyConfig?.company?.englishName}
            </Title>
          ) : null}
        </Space>
      </Space>
      {useDivider ? <Divider /> : null}
    </>
  );
};

const CompanyLogoImage = () => {
  const { companyConfig } = useModel('@@initialState').initialState;
  const image = companyConfig?.companyInfo?.logoImageUrl ?? undefined;
  const { logoWidth } = companyConfig?.companyPrintHeaderConfig;
  if (!image) {
    return null;
  } else {
    return <Image src={image} width={logoWidth === 0 ? 80 : logoWidth} />;
  }
};

export default CompanyHeader;

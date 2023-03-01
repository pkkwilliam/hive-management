import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Typography } from 'antd';
import { useIntl } from 'umi';
import styles from './Welcome.less';
import Onboard from '@/components/Onboard';
import OrderSummary from '@/components/OrderSummary';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome = () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* <OrderSummary /> */}
        {/* <Onboard /> */}
      </Space>
    </PageContainer>
  );
};

export default Welcome;

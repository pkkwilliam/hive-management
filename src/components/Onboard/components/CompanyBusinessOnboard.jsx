import CreateCompanyBusinessButton from '@/pages/companyManager/CompanyBusiness/components/CreateCompanyBusinessButton';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';

const CompanyBusinessOnboard = () => {
  return (
    <>
      <ProCard
        extra={<CreateCompanyBusinessButton />}
        bordered
        headerBordered
        size="small"
        title="企業客戶"
        type="inner"
      >
        <Space>
          <Text>創建首個企業客戶，方便您追蹤客戶的訂單以及為客戶設定商品的特供價單。</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default CompanyBusinessOnboard;

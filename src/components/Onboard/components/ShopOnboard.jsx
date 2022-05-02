import CreateShopButton from '@/pages/companyManager/Shop/components/CreateShopButton';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';

const ShopOnboard = () => {
  return (
    <>
      <ProCard
        extra={<CreateShopButton />}
        bordered
        headerBordered
        size="small"
        title="門店/倉庫"
        type="inner"
      >
        <Space>
          <Text>馬上創建首個門店/倉庫，方便您進行地點的管理</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default ShopOnboard;

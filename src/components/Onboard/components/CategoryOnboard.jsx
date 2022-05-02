import CreateCategoryButton from '@/pages/company/Category/components/CreateCategoryButton';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const CategoryOnboard = () => {
  return (
    <>
      <ProCard
        extra={<CreateCategoryButton />}
        bordered
        headerBordered
        size="small"
        title="標籤/分類"
        type="inner"
      >
        <Space>
          <Text>創建首個標籤/分類，方便您以後對所有商品的集成管理</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default CategoryOnboard;

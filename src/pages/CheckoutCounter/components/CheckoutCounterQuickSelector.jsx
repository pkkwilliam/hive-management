import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { getItemPriceRange } from '@/util/priceUtil';
import ProCard from '@ant-design/pro-card';
import { Menu, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';

const getHeight = () => {
  const shopContentHeight = document.getElementsByClassName('ant-card-body')[0].clientHeight;
  const headerHeight = document.getElementsByClassName('ant-pro-global-header')[0].clientHeight;
  return `calc(100vh - ${shopContentHeight + headerHeight + 20}px)`;
};

const CheckoutCounterQuickSelector = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  useEffect(() => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_CATEGORY_SERVICE_CONFIG).then((response) =>
      setCategories(response.data),
    );
  }, []);

  useEffect(() => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ITEM_SERVICE_CONFIG, {
      categoryId: selectedCategoryId,
      showPriceRange: true,
    }).then((response) => setItems(response.data));
  }, [selectedCategoryId]);

  return (
    <ProCard ghost>
      <ProCard ghost colSpan={18} style={{ height: getHeight(), overflowY: 'scroll' }}>
        <ProCard ghost style={{ marginTop: 8 }} gutter={[16, 16]} wrap>
          {items.map((item) => (
            <ProCard
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
              key={item.id}
              bordered
              size="small"
              direction="vertical"
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text>{item.name}</Text>
                <Text type="secondary">{`${getItemPriceRange(item)}`}</Text>
              </Space>
            </ProCard>
          ))}
        </ProCard>
      </ProCard>
      <ProCard ghost style={{ height: getHeight(), overflowY: 'scroll' }}>
        <Menu
          mode="inline"
          onSelect={({ key }) => setSelectedCategoryId(key)}
          overflowedIndicator
          style={{ backgroundColor: 'transparent' }}
        >
          {categories.map((category) => (
            <Menu.Item ghost key={category.id} layout="center">
              {category.name}
            </Menu.Item>
          ))}
        </Menu>
      </ProCard>
    </ProCard>
  );
};

export default CheckoutCounterQuickSelector;

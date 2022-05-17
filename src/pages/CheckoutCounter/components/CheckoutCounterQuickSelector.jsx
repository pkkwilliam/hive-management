import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { getItemPriceRange } from '@/util/priceUtil';
import ProCard from '@ant-design/pro-card';
import { Menu, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import ItemSpecificationSelectModal from './ItemSpecificationsSelectModal';
import React, { useEffect, useState } from 'react';

const getHeight = () => {
  const shopContentHeight = document.getElementsByClassName('ant-card-body')[0].clientHeight;
  const headerHeight = document.getElementsByClassName('ant-pro-global-header')[0].clientHeight;
  return `calc(100vh - ${shopContentHeight + headerHeight + 20}px)`;
};

const CheckoutCounterQuickSelector = (props) => {
  const { onSelect = (itemSpecification) => {} } = props;
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [itemSpecifications, setItemSpecifications] = useState([]);
  const [showItemSpecificationsModal, setShowItemSpecificationsModal] = useState(false);

  useEffect(() => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_CATEGORY_SERVICE_CONFIG).then((response) =>
      setCategories(response.data),
    );
  }, []);

  useEffect(() => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_ITEM_SERVICE_CONFIG, {
      categoryId: selectedCategoryId,
      showPriceRange: true,
      showStock: true,
    }).then((response) => setItems(response.data));
  }, [selectedCategoryId]);

  const onChangeModalVisible = (visible) => {
    if (!visible) {
      setItemSpecifications([]);
    }
    setShowItemSpecificationsModal(visible);
  };

  const onClickItem = async (item) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(ITEM_SPECIFICATION_SERVICE_CONFIG, {
      'item.id': item.id,
    });
    const itemSpecifications = response.data;
    if (itemSpecifications.length === 1) {
      onSelect(itemSpecifications[0]);
    } else {
      setItemSpecifications(itemSpecifications);
      setShowItemSpecificationsModal(true);
    }
  };

  return (
    <>
      <ProCard ghost>
        <ProCard ghost colSpan={18} style={{ height: getHeight(), overflowY: 'scroll' }}>
          <ProCard ghost style={{ marginTop: 8 }} gutter={[16, 16]} wrap>
            {items.map((item) => (
              <ProCard
                colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
                key={item.id}
                bordered
                onClick={() => onClickItem(item)}
                size="small"
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
      <ItemSpecificationSelectModal
        itemSpecifications={itemSpecifications}
        onSelect={(itemSpecification) => {
          onSelect(itemSpecification);
          onChangeModalVisible(false);
        }}
        setModalVisible={onChangeModalVisible}
        title="選擇規格"
        visible={showItemSpecificationsModal}
      />
    </>
  );
};

export default CheckoutCounterQuickSelector;

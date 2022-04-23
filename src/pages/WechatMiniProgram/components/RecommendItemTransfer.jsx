import React, { useEffect, useState } from 'react';
import { Button, Space, Transfer } from 'antd';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import Text from 'antd/lib/typography/Text';

const RecommendItemTransfer = (props) => {
  const { onUpdate, wechatMiniProgramConfig } = props;
  const [recommendItems, setRecommendItems] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setTargetKeys(
      wechatMiniProgramConfig?.recommendItems?.map((recommendItem) => recommendItem.id),
    );
  }, wechatMiniProgramConfig.recommendItems);

  useEffect(() => {
    const query = async () => {
      const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(ITEM_SPECIFICATION_SERVICE_CONFIG, {
        active: true,
      });
      setRecommendItems(
        response.data.map((recommendItem) => ({
          ...recommendItem,
          title: recommendItem,
        })),
      );
    };
    query();
  }, []);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    onUpdate({
      ...wechatMiniProgramConfig,
      recommendItems: nextTargetKeys.map((recommendItemId) => ({
        id: recommendItemId,
      })),
    });
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    <Transfer
      dataSource={recommendItems}
      listStyle={{
        height: 600,
        width: 300,
      }}
      titles={['後台標籤/分類', '小程序顯示標籤/分類']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      showSearch
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(recommendItem) => (
        <Space>
          <Text type="primary">{`${recommendItem.item?.name} ${recommendItem?.name}`}</Text>
          <Text type="warning">${recommendItem?.price}</Text>
        </Space>
      )}
      rowKey={(record) => record.id}
    />
  );
};

export default RecommendItemTransfer;

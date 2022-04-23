import React, { useEffect, useState } from 'react';
import { Button, Space, Transfer } from 'antd';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import Text from 'antd/lib/typography/Text';

const ItemSpecificationTransfer = (props) => {
  const { onUpdate, wechatMiniProgramConfig } = props;
  const [itemSpecifications, setItemSpecifications] = useState([]);
  const [targetKeys, setTargetKeys] = useState(
    wechatMiniProgramConfig.itemSpecifications.map((itemSpecification) => itemSpecification.id),
  );
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    const query = async () => {
      const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(ITEM_SPECIFICATION_SERVICE_CONFIG, {
        active: true,
      });
      setItemSpecifications(
        response.data.map((itemSpecification) => ({
          ...itemSpecification,
          title: itemSpecification,
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
      itemSpecifications: nextTargetKeys.map((itemSpecificationId) => ({
        id: itemSpecificationId,
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
      dataSource={itemSpecifications}
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
      render={(itemSpecification) => (
        <Space>
          <Text type="primary">{`${itemSpecification?.item?.name} ${itemSpecification?.name}`}</Text>
          <Text type="warning">${itemSpecification?.price}</Text>
        </Space>
      )}
      rowKey={(record) => record.id}
    />
  );
};

export default ItemSpecificationTransfer;

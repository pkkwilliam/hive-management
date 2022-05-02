import React, { useEffect, useState } from 'react';
import { Button, Space, Transfer } from 'antd';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_CATEGORY_SERVICE_CONFIG } from '@/services/hive/categoryService';

const CategoryTransfer = (props) => {
  const { onUpdate, wechatMiniProgramConfig } = props;
  console.log(wechatMiniProgramConfig.categories);
  const [categories, setCategories] = useState([]);
  const [targetKeys, setTargetKeys] = useState(
    wechatMiniProgramConfig.categories.map((category) => category.id),
  );
  const [selectedKeys, setSelectedKeys] = useState([]);
  console.log(targetKeys);
  useEffect(() => {
    const queryCategory = async () => {
      const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_CATEGORY_SERVICE_CONFIG, {
        active: true,
      });
      setCategories(response.data.map((category) => ({ ...category, title: category.name })));
    };
    queryCategory();
  }, []);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    onUpdate({
      ...wechatMiniProgramConfig,
      categories: nextTargetKeys.map((categoryId) => ({ id: categoryId })),
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
      dataSource={categories}
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
      render={(item) => item.title}
      rowKey={(record) => record.id}
    />
  );
};

export default CategoryTransfer;

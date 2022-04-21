import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { PUBLIC_ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { Button, Image, InputNumber, Layout, Modal, Row, Space, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';

const CompanyMallItemModal = (props) => {
  const { item, onClickAdd, visible, setVisible } = props;
  const [itemSpecifications, setItemSpecifications] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedTagIndex, setSelectedTagIndex] = useState(-1);

  useEffect(() => {
    queryItemSpecification(item);
  }, [item]);

  const queryItemSpecification = async (item) => {
    if (!item) {
      return;
    }
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      PUBLIC_ITEM_SPECIFICATION_SERVICE_CONFIG,
      { 'item.id': item.id },
    );
    setSelectedTagIndex(-1);
    setItemSpecifications(response.data);
  };

  return (
    <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
      <Space direction="vertical">
        <Image width={200} src={item?.imageUrl} />
        <Title level={4}>規格</Title>
        <Space direction="vertical">
          {itemSpecifications.map((itemSpecification, index) => (
            <Tag
              color={selectedTagIndex === index ? 'success' : 'default'}
              key={`item_specification_tag`}
              onClick={() => setSelectedTagIndex(index)}
            >{`${itemSpecification.name} $${
              itemSpecification.discountPrice
                ? itemSpecification.discountPrice
                : itemSpecification.price
            }`}</Tag>
          ))}
        </Space>
        <Row align="center" justify="space-betwen">
          <Text>數量</Text>
          <InputNumber min={1} onChange={setQuantity} value={quantity} />
        </Row>

        <Button
          block
          disabled={selectedTagIndex < 0}
          onClick={() =>
            onClickAdd({ itemSpecification: itemSpecifications[selectedTagIndex], quantity })
          }
          shape="round"
          type="primary"
        >
          加入購物車
        </Button>
      </Space>
    </Modal>
  );
};

export default CompanyMallItemModal;

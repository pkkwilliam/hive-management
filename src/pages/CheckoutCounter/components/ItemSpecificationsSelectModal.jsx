import { getPrice } from '@/util/priceUtil';
import ProCard from '@ant-design/pro-card';
import { Modal, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const ItemSpecificationSelectModal = (props) => {
  const { itemSpecifications, onSelect, setModalVisible, title, visible } = props;
  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={() => setModalVisible(false)}
      title={title}
      visible={visible}
    >
      <Space>
        {itemSpecifications.map((itemSpecification) => (
          <ProCard bordered key={itemSpecification.id} onClick={() => onSelect(itemSpecification)}>
            <Space direction="vertical" size="small">
              <Text>{itemSpecification.name}</Text>
              <Text type="secondary">{getPrice(itemSpecification.price)}</Text>
            </Space>
          </ProCard>
        ))}
      </Space>
    </Modal>
  );
};

export default ItemSpecificationSelectModal;

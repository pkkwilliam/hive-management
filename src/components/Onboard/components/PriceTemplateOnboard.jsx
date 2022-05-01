import ItemSpecificationPriceTemplateModalForm from '@/pages/companyManager/ItemSpecificationPriceTemplate/components/ItemSpecificationPriceTemplateModalForm';
import PriceTemplateCompanyBusinessModalForm from '@/pages/companyManager/ItemSpecificationPriceTemplate/components/PriceTemplateCompanyBusinessModalForm';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG } from '@/services/hive/itemSpecificationPriceTemplate';
import ProCard from '@ant-design/pro-card';
import { Button, Modal, Result, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';

const PriceTemplateOnboard = () => {
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [priceTemplate, setPriceTemplate] = useState();
  const [priceTemplateLinkModalVisible, setPriceTemplateLinkModalVisible] = useState(false);

  const create = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG,
      request,
    );
    setPriceTemplate(response);
    setResultVisible(true);
    return true;
  };

  return (
    <>
      <ProCard
        extra={
          <Button onClick={() => setModalFormVisible(true)} type="primary">
            創建特供價單
          </Button>
        }
        headerBordered
        title="進階功能 客戶特供價單 (非必要)"
      >
        <Space>
          <Text>創建特供價單，可對固定客戶提供特供的商品價格</Text>
        </Space>
      </ProCard>
      <ItemSpecificationPriceTemplateModalForm
        onFinish={create}
        onVisibleChange={setModalFormVisible}
        visible={modalFormVisible}
      />
      <Modal
        footer={null}
        onCancel={() => {
          setPriceTemplate(undefined);
          setResultVisible(false);
        }}
        visible={resultVisible}
        width={1500}
      >
        <Result
          status="success"
          title={`${priceTemplate?.name}創建成功`}
          extra={[
            <Button
              key="close"
              onClick={() => {
                setPriceTemplate(undefined);
                setResultVisible(false);
                setModalFormVisible(true);
              }}
            >
              創建新特供價單
            </Button>,
            <Button
              key="create"
              onClick={() => {
                setPriceTemplateLinkModalVisible(true);
              }}
              type="primary"
            >
              關聯客戶
            </Button>,
          ]}
        />
      </Modal>
      <PriceTemplateCompanyBusinessModalForm
        itemSpecificationPriceTemplate={priceTemplate}
        setVisible={setPriceTemplateLinkModalVisible}
        visible={priceTemplateLinkModalVisible}
      />
    </>
  );
};

export default PriceTemplateOnboard;

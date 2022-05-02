import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SPECIFICATION_PRICE_TEMPLATE_SERVICE_CONFIG } from '@/services/hive/itemSpecificationPriceTemplate';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Result } from 'antd';
import React, { useState } from 'react';
import ItemSpecificationPriceTemplateModalForm from './ItemSpecificationPriceTemplateModalForm';
import PriceTemplateCompanyBusinessModalForm from './PriceTemplateCompanyBusinessModalForm';

const CreateItemSpecificationPriceTemplateButton = (props) => {
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
      <CreatePriorModal
        priorModals={[
          CREATE_PRIOR_MODAL_SHOP,
          CREATE_PRIOR_MODAL_CATEGORY,
          CREATE_PRIOR_MODAL_ITEM,
          CREATE_PRIOR_MODAL_COMPANY_BUSINESS,
        ]}
      >
        <Button icon={<PlusOutlined />} onClick={() => setModalFormVisible(true)} type="primary">
          創建特供價單
        </Button>
      </CreatePriorModal>
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

export default CreateItemSpecificationPriceTemplateButton;

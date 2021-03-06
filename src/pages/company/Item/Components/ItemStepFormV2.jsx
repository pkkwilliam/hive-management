import React, { useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
  ProFormDigit,
  ProFormList,
} from '@ant-design/pro-form';
import { Alert, Button, Form, Modal, Result, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProFormCategoryListSelect from '@/commons/proForm/ProFormCategoryListSelect';
import ProFormItemSpecificationStatusSelect from '@/commons/proForm/ProFormItemSpecificationStatusSelect';
import {
  BEDROCK_CREATE_BATCH_SERVICE_REQEUST,
  BEDROCK_CREATE_SERVICE_REQEUST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';
import ProCard from '@ant-design/pro-card';
import Text from 'antd/lib/typography/Text';
import ItemStockEditableTableModal from '@/commons/itemStock/ItemStockEditableTableModal';
import { useModel } from 'umi';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';

const MODAL_WIDTH = 1500;

const ItemStepFormV2 = (props) => {
  // model
  const { getOnboard } = useModel('onboard');

  const { buttonProps, onFinish = () => {} } = props;

  const [itemForm] = Form.useForm();
  const [itemSpecificationForm] = Form.useForm();
  const [item, setItem] = useState();
  const [itemSpecifications, setItemSpecifications] = useState([]);
  const [itemStockEditableTableVisible, setItemStockEditableTableVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const createItem = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ITEM_SERVICE_CONFIG, request);
    setItem(response);
  };

  const createItemSpecification = async (request) => {
    const response = await BEDROCK_CREATE_BATCH_SERVICE_REQEUST(
      ITEM_SPECIFICATION_SERVICE_CONFIG,
      request.itemSpecifications.map((itemSpecificationRequest) => ({
        ...itemSpecificationRequest,
        item: {
          id: item.id,
        },
      })),
    );
    setItemSpecifications(response);
  };

  const onChangeVisible = (visible) => {
    onModalFormVisibleChange(setVisible, itemForm, visible);
    onModalFormVisibleChange(setVisible, itemSpecificationForm, visible);
  };

  return (
    <>
      <Button type="primary" onClick={() => onChangeVisible(true)} {...buttonProps}>
        <PlusOutlined />
        ????????????
      </Button>
      <Modal
        title=""
        onCancel={() => {
          setResultVisible(false);
          getOnboard();
        }}
        visible={resultVisible}
        width={MODAL_WIDTH}
        footer={null}
        destroyOnClose
      >
        <Text type="secondary">ID:{item?.id}</Text>
        <Result
          status="success"
          title={`${item?.name}???${itemSpecifications.length}?????????????????????`}
          subTitle="???????????????????????????????????????"
          extra={[
            <Button
              key="createNew"
              onClick={() => {
                // setItem(undefined);
                // setItemSpecifications([]);
                setResultVisible(false);

                onChangeVisible(true);
              }}
            >
              ???????????????
            </Button>,
            <Button
              key="itemStock"
              onClick={() => {
                setItemStockEditableTableVisible(true);
              }}
              type="primary"
            >
              ????????????
            </Button>,
          ]}
        />
      </Modal>
      <StepsForm
        onFinish={async (request) => {
          await createItemSpecification(request);
          setVisible(false);
          setResultVisible(true);
          onFinish();
          return true;
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="????????????"
              width={MODAL_WIDTH}
              maskClosable={false}
              onCancel={() => onChangeVisible(false)}
              visible={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          form={itemForm}
          onFinish={async (request) => {
            await createItem(request);
            // calling parent onFinish so that if the user quit in the middle and the table will still refresh
            onFinish();
            return true;
          }}
          name="base"
          stepProps={{
            description: '??????????????????: ???????????????',
          }}
          title="????????????"
        >
          <Space direction="vertical">
            <Alert
              message="???????????????????????????????????????????????????????????????????????????"
              type="warning"
              showIcon
              banner
              style={{
                margin: -12,
                marginBottom: 24,
              }}
            />
            <Space>
              <ProFormText
                label="??????"
                name="name"
                placeholder="?????? ???: ???????????????"
                rules={[{ required: true, message: '??????????????? ???: ???????????????' }]}
              />
              <ProFormText label="??????" name="brand" placeholder="?????? ???: ??????" />
            </Space>
            <ProFormMediaUpload form={itemForm} label="??????" max={1} name={['imageUrl']} />
          </Space>
          <ProFormCategoryListSelect
            label="??????/??????"
            mode="multiple"
            name={['categories']}
            tooltip="?????????????????????????????? ??????/??????"
          />
          <Space>
            <ProFormTextArea
              label="??????"
              name="content"
              placeholder="????????????????????????????????????????????????????????????????????????????????????????????????????????????"
            />
            <ProFormTextArea
              label="??????"
              name="description"
              placeholder="????????????????????????????????????..."
            />
          </Space>
          <ProFormText label="??????" name="remark" />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          form={itemSpecificationForm}
          name="checkbox"
          stepProps={{
            description: '??????????????????: 250?????????',
          }}
          title="????????????"
        >
          <Alert
            message="??????????????????????????????????????????????????? '????????????' -> '????????????' ?????????"
            type="warning"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />

          <ProFormList
            creatorButtonProps={{
              position: 'bottom',
              creatorButtonText: '??????????????????',
            }}
            itemRender={({ listDom, action }, { record, index }) => {
              return (
                <ProCard
                  bordered
                  title={`??????${index + 1}.`}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  {listDom}
                  {action}
                </ProCard>
              );
            }}
            initialValue={[
              {
                name: '',
              },
            ]}
            min={1}
            name="itemSpecifications"
          >
            <ProFormGroup title="????????????">
              {/* <ProFormItemSelect label="??????" name={['item', 'id']} /> */}

              <ProFormText
                disabled
                hidden
                label="??????ID"
                fieldProps={{ value: item?.id }}
                name={['item', 'id']}
              />
              <ProFormText
                disabled
                label="??????"
                fieldProps={{ value: item?.name }}
                name={['item', 'name']}
              />
              <ProFormText
                label="??????"
                name="name"
                placeholder="300???"
                rules={[{ required: true, message: '?????????????????????' }]}
              />
              <ProFormItemSpecificationStatusSelect
                defaultActiveFirstOption
                label="??????"
                name={['itemSpecificationStatus']}
                rules={[{ required: true, message: '???????????????' }]}
              />
            </ProFormGroup>
            <ProFormGroup>
              <ProFormMediaUpload
                form={itemSpecificationForm}
                label="??????"
                max={1}
                name={['imageUrl']}
                tooltip="????????????????????????????????????????????????????????????"
              />
            </ProFormGroup>
            <ProFormGroup title="????????????">
              <ProFormText label="SKU" name={['sku']} />
              <ProFormText label="??????" name={['barcode']} />
            </ProFormGroup>
            <ProFormGroup title="??????">
              <ProFormMoney
                label="????????????"
                name={['price']}
                rules={[{ required: true, message: '?????????????????????' }]}
                placeholder="30"
              />
              <ProFormMoney label="????????????" name={['discountPrice']} />
            </ProFormGroup>
            <ProFormGroup title="??????/??????">
              <ProFormDigit label="???" name={['length']} />
              <ProFormDigit label="???" name={['width']} />
              <ProFormDigit label="???" name={['height']} />
              <ProFormDigit label="??????" name={['weight']} />
            </ProFormGroup>
            <ProFormText label="??????" name={['remark']} />
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>
      <ItemStockEditableTableModal
        item={item}
        key="stock"
        setVisible={setItemStockEditableTableVisible}
        visible={itemStockEditableTableVisible}
      />
    </>
  );
};

export default ItemStepFormV2;

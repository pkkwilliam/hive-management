import React, { useEffect, useRef, useState } from 'react';
import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
  ProFormDigit,
} from '@ant-design/pro-form';
import { Alert, Button, Form, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProFormCategoryListSelect from '@/commons/proForm/ProFormCategoryListSelect';
import ProFormItemSpecificationStatusSelect from '@/commons/proForm/ProFormItemSpecificationStatusSelect';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_UPDATE_BATCH_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import { COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG } from '@/services/hive/itemSpecificationStockService';
import { EditableProTable } from '@ant-design/pro-table';
import { getValueEnum } from '@/enum/enumUtil';
import { SHOP_TYPES } from '@/enum/shopType';
import {
  ITEM_SPECIFICATION_STOCK_TYPES,
  ITEM_SPECIFICATION_STOCK_TYPE_LIMITED,
} from '@/enum/itemSpecificationStockType';
import ProFormMediaUpload from '@/commons/proForm/ProFormMediaUpload';

const ItemStepForm = (props) => {
  const [itemForm] = Form.useForm();
  const [itemSpecificationForm] = Form.useForm();
  const [editableKeys, setEditableKeys] = useState();
  const [item, setItem] = useState();
  const [itemSpecification, setItemSpecification] = useState();
  const [itemSpecificationsStock, setItemSpecificationsStock] = useState();
  const [visible, setVisible] = useState(false);

  const SHOP_ITEM_SPECIFICATION_COLUMNS = [
    { title: '地點', dataIndex: ['shop', 'name'], editable: false },
    {
      title: '地點類型',
      dataIndex: ['shop', 'shopType'],
      editable: false,
      search: false,
      valueEnum: getValueEnum(SHOP_TYPES),
    },
    {
      title: '庫存類型',
      dataIndex: ['itemStockType'],
      editable: true,
      search: false,
      valueEnum: getValueEnum(ITEM_SPECIFICATION_STOCK_TYPES),
    },
    {
      title: '地點庫存',
      dataIndex: 'stock',
      editable: true,
      search: false,
      valueType: 'number',
      renderText: (text, record) =>
        record.itemStockType === ITEM_SPECIFICATION_STOCK_TYPE_LIMITED.key ? text : '-',
    },
  ];

  const createItem = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_ITEM_SERVICE_CONFIG, request);
    setItem(response);
    return true;
  };

  const createItemSpecification = async (request) => {
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(ITEM_SPECIFICATION_SERVICE_CONFIG, {
      item: item,
      ...request,
    });
    setItemSpecification(response);
    queryItemSpecificationStock(response);
    return true;
  };

  const queryItemSpecificationStock = async (itemSpecificationResponse) => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      {
        'itemSpecification.id': itemSpecificationResponse.id,
        active: true,
        itemSpecificationActive: true,
      },
    );
    // get item specification stock by each shop
    setItemSpecificationsStock(response.data);
    // set item is being edit for EditiableTable
    setEditableKeys(response.data.map((itemSpecificationStock) => itemSpecificationStock.id));
  };

  const updateBatchItemSpecificationStock = async (request) => {
    console.log(request);
    await BEDROCK_UPDATE_BATCH_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      request,
    );
    setVisible(false);
    return true;
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        快速創建商品
      </Button>
      <StepsForm
        onFinish={props?.onFinish}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="分步表单"
              width={1500}
              onCancel={() => setVisible(false)}
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
          onFinish={createItem}
          name="base"
          stepProps={{
            description: '添加商品，如: 巧克力餅乾',
          }}
          title="創建商品"
        >
          <Space direction="vertical">
            <Alert
              message="基本商品的資料，商品中的不同規格會在下一步中設置。"
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
                label="品名"
                name="name"
                placeholder="品名 如: 巧克力餅乾"
                rules={[{ required: true, message: '請輸入品名 如: 巧克力餅乾' }]}
              />
              <ProFormText label="品牌" name="brand" placeholder="品牌 如: 維他" />
            </Space>
            <ProFormMediaUpload form={itemForm} label="圖片" max={1} name={['imageUrl']} />
          </Space>
          <ProFormCategoryListSelect
            label="標籤/分類"
            mode="multiple"
            name={['categories']}
            tooltip="如分類為空，請先添加 標籤/分類"
          />
          <Space>
            <ProFormTextArea
              label="內容"
              name="content"
              placeholder="（一）主要成分或材料。（二）淨重、容量、數量或度量等；其淨重、容量或度量應標示法定度量衡單位，必要時，得加註其他單位。"
            />
            <ProFormTextArea
              label="描述"
              name="description"
              placeholder="非常可口的維他巧克力餅乾..."
            />
          </Space>
          <ProFormText label="備註" name="remark" />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          form={itemSpecificationForm}
          name="checkbox"
          stepProps={{
            description: '添加規格，如: 250克包裝',
          }}
          title="創建規格"
          onFinish={createItemSpecification}
        >
          <Alert
            message="此為快速創建商品通道，更多規格可在 '商品管理' -> '商品規格' 中添加"
            type="warning"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />

          <ProFormGroup title="基本資料">
            {/* <ProFormItemSelect label="商品" name={['item', 'id']} /> */}

            <ProFormText
              disabled
              hidden
              label="商品ID"
              fieldProps={{ value: item?.id }}
              name={['item', 'id']}
            />
            <ProFormText
              disabled
              label="商品"
              fieldProps={{ value: item?.name }}
              name={['item', 'name']}
            />
            <ProFormText
              label="規格"
              name={['name']}
              placeholder="300克"
              rules={[{ required: true, message: '請輸入規格名稱' }]}
            />
            <ProFormItemSpecificationStatusSelect label="狀態" name={['itemSpecificationStatus']} />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormMediaUpload
              form={itemSpecificationForm}
              label="圖片"
              max={1}
              name={['imageUrl']}
              tooltip="如不上傳圖片，則會使用上一步商品的圖片。"
            />
          </ProFormGroup>
          <ProFormGroup title="庫存管理">
            <ProFormText label="SKU" name={['sku']} />
            <ProFormText label="條碼" name={['barcode']} />
          </ProFormGroup>
          <ProFormGroup title="價錢">
            <ProFormMoney
              label="零售原價"
              name={['price']}
              rules={[{ required: true, message: '請輸入零售原價' }]}
              placeholder="30"
            />
            <ProFormMoney label="零售折扣" name={['discountPrice']} />
          </ProFormGroup>
          <ProFormGroup title="尺吋/重量">
            <ProFormDigit label="長" name={['length']} />
            <ProFormDigit label="寬" name={['width']} />
            <ProFormDigit label="高" name={['height']} />
            <ProFormDigit label="重量" name={['weight']} />
          </ProFormGroup>
          <ProFormText label="備註" name={['remark']} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          onFinish={() => updateBatchItemSpecificationStock(itemSpecificationsStock)}
          stepProps={{
            description: '設置倉庫/門店或貨架之庫存',
          }}
          title="庫存設置"
        >
          <EditableProTable
            columns={SHOP_ITEM_SPECIFICATION_COLUMNS}
            rowKey="id"
            value={itemSpecificationsStock}
            editable={{
              type: 'multiple',
              editableKeys,
              onValuesChange: (record, recordList) => {
                setItemSpecificationsStock(recordList);
              },
              onChange: setEditableKeys,
            }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default ItemStepForm;

import React, { useState } from 'react';
import { ProFormDependency, ProFormDigit, ProFormGroup, ProFormList } from '@ant-design/pro-form';
import ProFormItemSelect from '@/commons/proForm/ProFormItemSelect';
import ProFormPreOrderItemSpecificationSelection from '@/commons/proForm/ProFormPreOrderItemSpecificationSelect';
import { BEDROCK_GET_BY_ID_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { ITEM_SPECIFICATION_SERVICE_CONFIG } from '@/services/hive/itemSpecificationService';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';

const OrderItemInfoList = (props) => {
  const { disabled = false, readonly = false } = props;
  return (
    <ProFormDependency name={['companyBusiness', 'distributionShop']} ignoreFormListField>
      {({ companyBusiness, distributionShop }) => {
        return (
          <ProFormList
            tooltip="請先選擇配貨中心與客戶"
            itemRender={({ listDom, action }, { record, index }) => {
              return (
                <ProCard
                  bordered
                  title={`貨品${index + 1}.`}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <Space align="end">
                    {listDom}
                    {disabled || readonly ? null : action}
                  </Space>
                </ProCard>
              );
            }}
            creatorButtonProps={
              readonly
                ? false
                : {
                    disabled: !companyBusiness?.id || !distributionShop?.id || disabled,
                  }
            }
            {...props}
          >
            {({ key, name }) => {
              return (
                <ProFormGroup>
                  <ProFormItemSelect
                    disabled={disabled}
                    label="商品"
                    name={['item', 'id']}
                    readonly={readonly}
                    rules={[{ required: true, message: '請選擇商品' }]}
                    showSearch
                    width="sm"
                  />
                  <ProFormPreOrderItemSpecificationSelection
                    disabled={disabled}
                    companyBusiness={companyBusiness}
                    distributionShop={distributionShop}
                    dependencies={['item']}
                    readonly={readonly}
                    showStock
                    label="規格"
                    name={['itemSpecification', 'id']}
                    rules={[
                      { required: true, message: '請選擇規格' },
                      ({ getFieldValue }) => ({
                        async validator(_, value) {
                          const response = await BEDROCK_GET_BY_ID_SERVICE_REQUEST(
                            ITEM_SPECIFICATION_SERVICE_CONFIG,
                            value,
                          );
                          return getFieldValue('orderItemInfos')[key]?.item?.id === response.item.id
                            ? Promise.resolve()
                            : Promise.reject(new Error('規格與商品不符'));
                        },
                      }),
                    ]}
                    showSearch
                    width="lg"
                  />
                  <ProFormDigit
                    disabled={disabled}
                    label="數量"
                    name="quantity"
                    readonly={readonly}
                    width="xs"
                    rules={[{ required: true, message: '請輸入數量' }]}
                  />
                </ProFormGroup>
              );
            }}
          </ProFormList>
        );
      }}
    </ProFormDependency>
  );
};

export default OrderItemInfoList;

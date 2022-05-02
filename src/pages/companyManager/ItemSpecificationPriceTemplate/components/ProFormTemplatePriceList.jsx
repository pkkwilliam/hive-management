import React from 'react';
import { ProFormDependency, ProFormGroup, ProFormList, ProFormMoney } from '@ant-design/pro-form';
import ProFormItemSpecificationSelect from '@/commons/proForm/ProFormItemSpecificationSelect';
import ProFormItemSelect from '@/commons/proForm/ProFormItemSelect';
import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';

const ProFormPriceTemplateList = (props) => {
  const { readonly } = props;
  return (
    <ProFormList
      creatorButtonProps={readonly ? false : true}
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
              {readonly ? null : action}
            </Space>
          </ProCard>
        );
      }}
      {...props}
    >
      <ProFormGroup>
        <ProFormItemSelect
          label="商品"
          name={['itemSpecification', 'item', 'id']}
          readonly={readonly}
        />
        <ProFormDependency name={['itemSpecification']}>
          {(fieldsValue) => {
            return (
              <ProFormItemSpecificationSelect
                dependencies={['itemSpecification', 'item', 'id']}
                item={fieldsValue.itemSpecification?.item}
                label="規格"
                name={['itemSpecification', 'id']}
                readonly={readonly}
              />
            );
          }}
        </ProFormDependency>

        <ProFormMoney label="特供價單" name="price" readonly={readonly} />
      </ProFormGroup>
    </ProFormList>
  );
};

export default ProFormPriceTemplateList;

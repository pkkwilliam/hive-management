import React from 'react';
import { ProFormDependency, ProFormGroup, ProFormList, ProFormMoney } from '@ant-design/pro-form';
import ProFormItemSpecificationSelect from '@/commons/proForm/ProFormItemSpecificationSelect';
import ProFormItemSelect from '@/commons/proForm/ProFormItemSelect';

const ProFormPriceTemplateList = (props) => {
  return (
    <ProFormList {...props}>
      <ProFormGroup>
        <ProFormItemSelect label="商品" name={['itemSpecification', 'item', 'id']} />
        <ProFormDependency name={['itemSpecification']}>
          {(fieldsValue) => {
            return (
              <ProFormItemSpecificationSelect
                dependencies={['itemSpecification', 'item', 'id']}
                item={fieldsValue.itemSpecification?.item}
                label="規格"
                name={['itemSpecification', 'id']}
              />
            );
          }}
        </ProFormDependency>

        <ProFormMoney label="特供價單" name="price" />
      </ProFormGroup>
    </ProFormList>
  );
};

export default ProFormPriceTemplateList;

import { COMPANY_SPECIFICATION_FUZZY_SEARCH } from '@/services/hive/itemSpecificationService';
import React, { useEffect, useRef } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';

const CheckoutCounterItemSpecificationSelect = (props) => {
  const selectRef = useRef();

  const { onSelect = (itemSpecificationId, quantity) => {}, setRef, shopId } = props;

  useEffect(() => {
    setRef(selectRef);
  }, [selectRef]);

  const getLabel = (value) => {
    return value && value !== null ? `${value} | ` : '';
  };

  const query = async (params) => {
    const response = await COMPANY_SPECIFICATION_FUZZY_SEARCH({
      active: true,
      fuzzyString: params.keyWords,
      'shop.id': shopId,
      showStock: true,
    });
    const options = response.map((itemSpecification) => ({
      value: itemSpecification.id,
      label: `
      ${getLabel(itemSpecification?.item?.name)}
      ${getLabel(itemSpecification?.name)}
      ${getLabel(itemSpecification?.sku)}
      ${getLabel(itemSpecification?.barcode)}
      ${'庫存:' + itemSpecification?.stockResponse?.stock + ' | '}
      $${itemSpecification?.price}`,
      data: itemSpecification,
      disabled: itemSpecification?.stockResponse?.stock < 1,
    }));
    return options;
  };
  return (
    <ProFormSelect
      debounceTime={500}
      request={query}
      fieldProps={{
        autoFocus: true,
        onSelect: (value, option) => onSelect(option.data, 1),
        ref: selectRef,
      }}
      {...props}
    />
  );
};

export default CheckoutCounterItemSpecificationSelect;

import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG } from '@/services/hive/itemSpecificationStockService';
import ProFormShopSelect, { queryShop } from '@/commons/proForm/ProFormShopSelect';
import { getValueEnum } from '@/enum/enumUtil';
import { SHOP_TYPES } from '@/enum/shopType';
import { queryItemBrand } from '@/commons/proForm/ProFormItemBrandSelect';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

const ItemSpecificationStock = () => {
  const [shopId, setShopId] = useState();

  const query = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_ITEM_SPECIFICATION_STOCK_SERVICE_CONFIG,
      { ...params, active: true, itemSpecificationActive: true, 'shop.id': shopId },
      sort,
      filter,
    );
  };

  const COLUMNS = [
    {
      title: '品牌',
      dataIndex: ['itemSpecification', 'item', 'brand'],
      key: 'itemSpecification.item.brand',
      fieldProps: { showSearch: true },
      request: queryItemBrand,
      valueType: 'select',
    },
    {
      title: '品名',
      dataIndex: ['itemSpecification', 'item', 'name'],
      key: ['itemSpecification', 'item', 'id'],
    },
    {
      title: '規格',
      dataIndex: ['itemSpecification', 'name'],
      key: ['itemSpecification', 'id'],
      search: false,
    },
    {
      title: 'SKU',
      dataIndex: ['itemSpecification', 'sku'],
      key: 'itemSpecification.sku',
      order: 1,
    },
    {
      title: '地點',
      dataIndex: ['shop', 'name'],
      key: 'shop.id',
      fieldProps: { showSearch: true },
      request: queryShop,
      valueType: 'select',
    },
    {
      title: '地點類型',
      dataIndex: ['shop', 'shopType'],
      search: false,
      valueEnum: getValueEnum(SHOP_TYPES),
    },
    { title: '地點庫存', dataIndex: 'stock', search: false },
  ];

  return (
    <PageContainer>
      <Card>
        <ProFormShopSelect
          allowClear={false}
          label="地點"
          onChange={(shopId) => setShopId(shopId)}
        />
      </Card>
      {!shopId ? null : <ProTable columns={COLUMNS} request={query} />}
    </PageContainer>
  );
};

export default ItemSpecificationStock;

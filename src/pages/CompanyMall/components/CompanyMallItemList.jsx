import ProFormCategorySelect from '@/commons/proForm/ProFormCategorySelect';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { PUBLIC_ITEM_SERVICE_CONFIG } from '@/services/hive/itemService';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { Col, Row, Tag } from 'antd';
import React, { useState } from 'react';

const CompanyMallItemList = (props) => {
  const { onClickItem } = props;
  const queryItem = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(PUBLIC_ITEM_SERVICE_CONFIG, params);
  };

  const COLUMNS = [
    {
      title: '圖片',
      dataIndex: ['imageUrl'],
      search: false,
      valueType: 'image',
    },
    {
      title: '品名',
      dataIndex: 'name',
      render: (text, record) => <a onClick={() => onClickItem(record)}>{text}</a>,
    },
    { title: '品牌', dataIndex: 'brand' },
    {
      title: '標簽',
      dataIndex: 'categories',
      key: 'categoryId',
      render: (text, record) => {
        return record.categories.map((category) => <Tag color="success">{category.name}</Tag>);
      },
      renderFormItem: (text, record) => <ProFormCategorySelect />,
    },
    {
      title: '規格數量',
      dataIndex: ['itemSpecificationPriceRangeResponse', 'count'],
    },
    {
      title: '價格範圍',
      renderText: (text, record) => {
        const { count, startFrom, to } = record.itemSpecificationPriceRangeResponse;
        return count < 2 ? `$${startFrom}` : `$${startFrom} - $${to}`;
      },
    },
  ];

  return (
    <ProTable
      columns={COLUMNS}
      params={{
        'company.id': props?.company?.id,
        active: true,
        showPriceRange: true,
        showStock: false,
      }}
      request={queryItem}
      size="large"
    />
    // <ProCard ghost>
    //   <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{cols}</Row>
    // </ProCard>
  );
};

export default CompanyMallItemList;

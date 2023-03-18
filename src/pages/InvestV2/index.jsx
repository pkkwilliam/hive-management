import React, { useState } from 'react';
import ProList from '@ant-design/pro-list';
import { Button, Space, Statistic, Tag } from 'antd';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { USER_INVEST_SERVICE_CONFIG } from '@/services/hive/investService';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import { CHANNEL_TYPES } from '@/enum/Channel';
import ProCard, { StatisticCard } from '@ant-design/pro-card';

const POLLING_INTERVAL = 10000;

const InvestV2 = () => {
  const [polling, setPolling] = useState(POLLING_INTERVAL);
  const [time, setTime] = useState(new Date());

  const query = async (params, sort, filter) => {
    const result = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      USER_INVEST_SERVICE_CONFIG,
      { ...params, active: false },
      sort,
      filter,
    );
    setTime(new Date());
    return result;
  };

  return (
    <ProList
      bordered
      itemLayout="vertical"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      search={{}}
      rowKey="id"
      headerTitle="基础列表"
      request={query}
      pagination={{
        pageSize: 10,
      }}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'productName',
          title: '用户',
        },
        description: {
          dataIndex: 'title',
          search: false,
          render: (text, record) => {
            return `ID: ${record.id}`;
          },
        },
        subTitle: {
          dataIndex: 'algorithmType',
          render: (text, record) => (
            <Tag>{getEnumLabelByKey(ALGORITHM_TYPES, record.algorithmType)}</Tag>
          ),
        },
        actions: {
          render: (text, row) => [
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
              Active/Inactive
            </a>,
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
              Edit
            </a>,
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
              Remove
            </a>,
          ],
          search: false,
        },
        status: {
          // 自己扩展的字段，主要用于筛选，不在列表中显示
          title: 'Active',
          valueType: 'select',
          valueEnum: {
            true: { text: 'active', status: 'Success' },
            false: { text: 'Inactive', status: 'Processing' },
          },
        },
        content: {
          render: (
            _,
            {
              algorithmType,
              channel,
              channelProductId,
              gainSellRate,
              id,
              gridInterval,
              lossSellRate,
              maxBuyInPrice,
              maxConcurrent,
              maxOpenPerGrid,
              minBuyInPrice,
              price,
              size,
            },
          ) => {
            return (
              <>
                <div>{`Channel: ${getEnumLabelByKey(CHANNEL_TYPES, channel)}`}</div>
                <div>{`Channel Product Code: ${channelProductId}`}</div>
              </>
            );
          },
        },
        extra: {
          dataIndex: 'price',
          render: (_, record) => <InvestPurchaseInfoStatisticCard record={record} />,
        },
      }}
    />
  );
};

const InvestPurchaseInfoStatisticCard = (props) => {
  const {
    activeOrderAverageCost,
    activeOrderCount,
    gainSellRate,
    id,
    gridInterval,
    lossSellRate,
    maxBuyInPrice,
    maxConcurrent,
    maxOpenPerGrid,
    minBuyInPrice,
    price,
    size,
  } = props.record;

  return (
    <ProCard>
      <StatisticCard
        statistic={{
          title: 'Active',
          value: `${activeOrderCount ?? 0}`,
        }}
        footer={
          <>
            <Statistic
              value={`${activeOrderAverageCost ?? 0}`}
              title="Avg Price"
              layout="horizontal"
            />
          </>
        }
      />
      <StatisticCard
        statistic={{
          title: 'Size',
          value: size,
        }}
        footer={
          <>
            <Statistic value={`${maxConcurrent ?? 0}`} title="Concurrent" layout="horizontal" />
          </>
        }
      />
      <StatisticCard
        statistic={{
          title: 'Gain',
          value: `${gainSellRate}%`,
        }}
        footer={
          <>
            <Statistic value={`${lossSellRate ?? 0}%`} title="Loss" layout="horizontal" />
          </>
        }
      />
      <StatisticCard
        statistic={{
          title: 'Max Buy',
          value: maxBuyInPrice,
        }}
        footer={
          <>
            <Statistic value={`${minBuyInPrice ?? 0}`} title="Min Buy" layout="horizontal" />
          </>
        }
      />
      <StatisticCard
        statistic={{
          title: 'Price',
          value: price ?? 0,
        }}
      />
    </ProCard>
  );
};

export default InvestV2;

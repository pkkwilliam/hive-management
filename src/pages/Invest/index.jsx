import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import PingChecker from '@/components/PingChecker';
import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import {
  CALCULATE_METHODS,
  CALCULATE_METHOD_FIXED,
  CALCULATE_METHOD_PERCENTAGE,
} from '@/enum/CalculateMethod';
import { CHANNEL_TYPES } from '@/enum/Channel';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { INVEST_TYPES } from '@/enum/investType';
import {
  BEDROCK_ACTIVATE_SERVICE_REQEUST,
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { INVEST_SYNC } from '@/services/hive/investSyncService';
import { LoadingOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Badge, Button, Space, Switch } from 'antd';
import { useRef, useState } from 'react';
import { USER_INVEST_SERVICE_CONFIG } from '../../services/hive/investService';
import AutomateOrderTable from './components/AutomateOrderTable';
import InvestDetailModal from './components/InvestDetailModal';
import Text from 'antd/lib/typography/Text';

const POLLING_INTERVAL = 5000;

function getGetSellRateLabel(gainSellCalculateMethod, gainSellRate) {
  switch (gainSellCalculateMethod) {
    case CALCULATE_METHOD_FIXED.key:
      return '$' + gainSellRate;
    case CALCULATE_METHOD_PERCENTAGE.key:
      return gainSellRate + '%';
    default:
      return gainSellRate;
  }
}

const Invest = () => {
  const [polling, setPolling] = useState(undefined);
  const [time, setTime] = useState(new Date());
  const tableRef = useRef();

  const [currentRow, setCurrentRow] = useState();
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const onCreate = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(USER_INVEST_SERVICE_CONFIG, request);
    tableRef.current.reload();
    return true;
  };

  const onActivateToggled = async (record) => {
    if (record.active) {
      await BEDROCK_DEACTIVATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, record.id);
    } else {
      await BEDROCK_ACTIVATE_SERVICE_REQEUST(USER_INVEST_SERVICE_CONFIG, record.id);
    }
    tableRef.current.reload();
    return true;
  };

  const onDelete = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, record.id);
    tableRef.current.reload();
    return true;
  };

  const onInvestSync = async () => {
    await INVEST_SYNC();
    tableRef.current.reload();
    return true;
  };

  const onUpdate = async (record) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(USER_INVEST_SERVICE_CONFIG, {
      ...record,
    });
    tableRef.current.reload();
    return true;
  };

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

  const setDetailModalVisibleWithPolling = (modalVisible) => {
    setDetailModalVisible(modalVisible);
    setPolling(!modalVisible);
  };

  const COLUMNS = [
    {
      title: 'Product',
      render: (_, { active, channel, productName }) => (
        <Space>
          <Badge status={active ? 'success' : 'error'} />
          <Space direction="vertical" size={0}>
            <Text>{getEnumLabelByKey(CHANNEL_TYPES, channel, 'shortLabel')}</Text>
            <Text>{productName}</Text>
          </Space>
        </Space>
      ),
    },
    // {
    //   title: 'Product',
    //   dataIndex: ['active'],
    //   render: (_, record) => (
    //     <Badge status={record.active ? 'success' : 'error'} text={record.productName} />
    //   ),
    // },
    // {
    //   title: 'Ch',
    //   dataIndex: ['channel'],
    //   render: (text, record) => getEnumLabelByKey(CHANNEL_TYPES, record.channel, 'shortLabel'),
    //   tooltip: 'Channel',
    // },
    // {
    //   title: 'Name',
    //   dataIndex: ['productName'],
    //   tooltip: 'Product Name',
    // },
    // { title: 'PID', dataIndex: ['channelProductId'], tooltip: 'Channel Product ID' },
    {
      title: 'Type/Algo',

      render: (_, { algorithmType, investType }) => (
        <Space direction="vertical" size={0}>
          <Text>{getEnumLabelByKey(INVEST_TYPES, investType)}</Text>
          <Text>{getEnumLabelByKey(ALGORITHM_TYPES, algorithmType)}</Text>
        </Space>
      ),
      tooltip: '1. Invest Type (Position Type) 2. Algoirthm Type',
    },
    // {
    //   title: 'Type',
    //   dataIndex: ['investType'],
    //   render: (text, record) => getEnumLabelByKey(INVEST_TYPES, record.investType),
    //   tooltip: 'Invest Type (Position Type)',
    // },
    // {
    //   title: 'Algo',
    //   dataIndex: ['algorithmType'],
    //   render: (text, record) => getEnumLabelByKey(ALGORITHM_TYPES, record.algorithmType),
    //   tooltip: 'Algoirthm Type',
    // },
    {
      title: 'Price',
      render: (_, { ticking }) => {
        const { bidPrice, offerPrice } = ticking ?? { bidPrice: 0, offerPrice: 0 };
        const spread = (offerPrice - bidPrice).toFixed(5);
        return (
          <Space direction="vertical" size={0}>
            <Text type="success">{offerPrice}</Text>
            <Text type="secondary">{spread}</Text>
            <Text type="danger">{bidPrice}</Text>
          </Space>
        );
      },
      tooltip: '1. Offer Price 2. Bid Price',
    },
    // { title: 'Offer', dataIndex: ['ticking', 'offerPrice'] },
    // { title: 'Bid', dataIndex: ['ticking', 'bidPrice'] },
    // {
    //   title: 'Spread',
    //   renderText: (_, record) => {
    //     const { offerPrice, bidPrice } = record?.ticking ?? {};
    //     if (!offerPrice || !bidPrice) {
    //       return null;
    //     }
    //     const result = (offerPrice - bidPrice).toFixed(5);
    //     return result === 0 ? null : result;
    //   },
    // },
    // { title: 'Con', dataIndex: ['maxConcurrent'], tooltip: 'Max Concurrent' },
    {
      title: 'Con/Size',
      render: (_, { maxConcurrent, size }) => (
        <Space direction="vertical" size={0}>
          <Text>{maxConcurrent}</Text>
          <Text>{size}</Text>
        </Space>
      ),
      tooltip: '1. Maximum Concurrent 2. Size',
    },
    // {
    //   title: 'GS-CM',
    //   dataIndex: ['gainSellCalculateMethod'],
    //   render: (text) => getEnumLabelByKey(CALCULATE_METHODS, text),
    //   tooltip: 'Gain Sell Calculate Method',
    // },
    {
      title: 'Gain/Loss',
      render: (_, { gainSellCalculateMethod, gainSellRate, lossSellRate }) => (
        <Space direction="vertical" size={0}>
          <Text>
            {` ${getGetSellRateLabel(gainSellCalculateMethod, gainSellRate)} (${getEnumLabelByKey(
              CALCULATE_METHODS,
              gainSellCalculateMethod,
            )})`}
          </Text>
          <Text>{`${lossSellRate}% (Percentage)`}</Text>
        </Space>
      ),
      tooltip: '1. Gain Rate 2. Loss Rate',
    },
    // {
    //   title: 'Gain',
    //   dataIndex: ['gainSellRate'],
    //   render: (text, record) => getGetSellRateLabel(record.gainSellCalculateMethod, text),
    //   tooltip: 'Gain Sell Rate',
    // },
    // {
    //   title: 'Loss',
    //   dataIndex: ['lossSellRate'],
    //   render: (text) => `${text}%`,
    //   tooltip: 'Loss Sell Rate',
    // },
    // { title: 'Max', dataIndex: ['maxPrice'], tooltip: 'Max Open Price' },
    // { title: 'Min', dataIndex: ['minPrice'], tooltip: 'Min Open Price' },
    {
      title: 'Max/Min',
      render: (_, { maxPrice, minPrice }) => (
        <Space direction="vertical" size={0}>
          <Text>${maxPrice}</Text>
          <Text>${minPrice}</Text>
        </Space>
      ),
      tooltip: '1. Max Open Price 2. Min Open Price',
    },
    // { title: 'Size', dataIndex: ['size'] },
    {
      title: 'Operation',
      valueType: 'option',
      render: (text, record) => {
        return [
          <InactiveableLinkButton
            key="edit"
            label="Edit"
            onClick={() => {
              setCurrentRow(record);
              setDetailModalVisibleWithPolling(true);
            }}
          />,
          <Switch
            key="switch"
            checked={record.active}
            onChange={() => onActivateToggled(record)}
            size="small"
          />,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={COLUMNS}
        columnEmptyText={'-'}
        expandable={{ expandedRowRender: (record) => <AutomateOrderTable invest={record} /> }}
        polling={polling || undefined}
        request={(params, sort, filters) => query(params, sort, filters)}
        rowKey="id"
        search={false}
        toolbar={{
          title: `Last Updated: ${time.toLocaleTimeString()}`,
          subTitle: <PingChecker />,
        }}
        toolBarRender={() => [
          <Space key="dateRange">
            <Button icon={<ReloadOutlined />} key="button" type="secondary" onClick={onInvestSync}>
              Sync
            </Button>
            <Button
              key="polling"
              type="secondary"
              onClick={() => {
                if (polling) {
                  setPolling(undefined);
                  return;
                }
                setPolling(POLLING_INTERVAL);
              }}
            >
              {polling ? <LoadingOutlined /> : <ReloadOutlined />}
              {polling ? 'Stop Polling' : 'Start Polling'}
            </Button>
            <Button
              icon={<PlusOutlined />}
              key="polling"
              type="primary"
              onClick={() => setDetailModalVisibleWithPolling(true)}
            >
              Add
            </Button>
          </Space>,
        ]}
      />
      <InvestDetailModal
        invest={currentRow}
        onFinish={currentRow ? onUpdate : onCreate}
        setVisible={setDetailModalVisibleWithPolling}
        visible={detailModalVisible}
      />
    </PageContainer>
  );
};

export default Invest;

import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import PingChecker from '@/components/PingChecker';
import { ALGORITHM_TYPES } from '@/enum/Algorithm';
import { CHANNEL_TYPES } from '@/enum/Channel';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { INVEST_SYNC } from '@/services/hive/investSyncService';
import { LoadingOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { useRef, useState } from 'react';
import { USER_INVEST_SERVICE_CONFIG } from '../../services/hive/investService';
import AutomateOrderTable from './components/AutomateOrderTable';
import InvestDetailModal from './components/InvestDetailModal';

const POLLING_INTERVAL = 10000;

const Invest = () => {
  const [polling, setPolling] = useState(POLLING_INTERVAL);
  const [time, setTime] = useState(new Date());
  const tableRef = useRef();

  const [currentRow, setCurrentRow] = useState();
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const onCreate = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(USER_INVEST_SERVICE_CONFIG, request);
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
      title: 'Status',
      dataIndex: ['active'],
      valueEnum: {
        true: { text: '', status: 'Success' },
        false: {
          text: '',
          status: 'Error',
        },
      },
    },
    {
      title: 'Channel',
      dataIndex: ['channel'],
      render: (text, record) => getEnumLabelByKey(CHANNEL_TYPES, record.channel),
    },
    {
      title: 'Product Name',
      dataIndex: ['productName'],
    },
    { title: 'Channel Product ID', dataIndex: ['channelProductId'] },
    {
      title: 'Algoirthm',
      dataIndex: ['algorithmType'],
      render: (text, record) => getEnumLabelByKey(ALGORITHM_TYPES, record.algorithmType),
    },
    { title: 'Price', dataIndex: ['price'] },
    { title: 'Max Concurrent', dataIndex: ['maxConcurrent'] },
    { title: 'Gain Sell Rate', dataIndex: ['gainSellRate'] },
    { title: 'Loss Sell Rate', dataIndex: ['lossSellRate'] },
    { title: 'Max Buy In Price', dataIndex: ['maxBuyInPrice'] },
    { title: 'Min Buy In Price', dataIndex: ['minBuyInPrice'] },
    { title: 'Size', dataIndex: ['size'] },
    // {
    //   title: '支款方式',
    //   dataIndex: 'companyBusinessPaymentType',
    //   valueEnum: getValueEnum(COMPANY_BUSINESS_PAYMENT_TYPES),
    // },
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
          <InactiveableLinkButton
            key="remove"
            label="Remove"
            onClick={() => {
              onDelete(record);
            }}
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

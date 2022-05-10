import React from 'react';
import ProTable from '@ant-design/pro-table';
import { BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { SYSTEM_LOG_SERVICE_CONFIG } from '@/services/hive/systemLogService';
import { getValueEnum } from '@/enum/enumUtil';
import { SYSTEM_LOG_OPERATIONS } from '@/enum/systemLogOperation';
import { SYSTEM_LOG_TYPES } from '@/enum/systemLogType';
import moment from 'moment';
import { toDisplayDate } from '@/util/dateUtil';
import ProFormSystemLogTypeSelect from '@/commons/proForm/ProFormSystemLogTypeSelect';
import ProFormSystemLogOperationSelect from '@/commons/proForm/ProFormSystemLogOperationSelect';

const SystemLog = () => {
  const query = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      SYSTEM_LOG_SERVICE_CONFIG,
      { ...params, active: true },
      sort,
      filter,
    );
  };

  const COLUMNS = [
    {
      title: '日誌ID',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '日誌類型',
      dataIndex: 'systemLogOperation',
      valueEnum: getValueEnum(SYSTEM_LOG_OPERATIONS),
      valueType: 'select',
    },
    {
      title: '日誌內容',
      dataIndex: 'systemLogType',
      valueEnum: getValueEnum(SYSTEM_LOG_TYPES),
      valueType: 'select',
    },
    {
      title: '目標ID',
      dataIndex: ['toId'],
    },
    {
      title: '操作員ID',
      dataIndex: ['createBy', 'username'],
      key: 'createBy.username',
    },
    {
      title: '操作人名',
      dataIndex: ['createBy', 'name'],
      key: 'createBy.name',
    },
    {
      title: '操作時間',
      dataIndex: ['createTime'],
      renderText: (text, record) => toDisplayDate(text, 'YYYY-MM-DD HH:MM:SS'),
      search: false,
    },
  ];

  return <ProTable columns={COLUMNS} request={query} />;
};

export default SystemLog;

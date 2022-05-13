import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';

import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';

import CompanyModalForm from './components/companyModalForm';

import { ADMIN_COMPANY_SERVICE_CONFIG } from '@/services/hive/companyService';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { getValueEnum } from '@/enum/enumUtil';
import { COMPANY_ACCOUNT_TYPES } from '@/enum/companyAccountType';

const Compamy = () => {
  const actionRef = useRef();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const createCompanyServiceRequest = async (company) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(ADMIN_COMPANY_SERVICE_CONFIG, company);
    setCreateModalVisible(false);
    onDataChanged();
  };

  const deleteCompanyServiceRequest = async (company) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(ADMIN_COMPANY_SERVICE_CONFIG, company.id);
    onDataChanged();
  };

  const updateCompanyServiceRequest = async (company) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(ADMIN_COMPANY_SERVICE_CONFIG, company);
    setUpdateModalVisible(false);
    onDataChanged();
  };

  const onDataChanged = () => {
    actionRef.current.reload();
  };

  const COLUMNS = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '企業中文名',
      dataIndex: 'chineseName',
      copyable: true,
      ellipsis: true,
      tip: '企業名過長會自動收縮',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '企業名為必填',
          },
        ],
      },
    },
    {
      title: '企業英文名',
      dataIndex: 'englishName',
      copyable: true,
      ellipsis: true,
      tip: '企業名過長會自動收縮',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '企業名為必填',
          },
        ],
      },
    },
    {
      title: '前序',
      dataIndex: 'prefix',
      copyable: true,
    },
    {
      title: '狀態',
      dataIndex: 'active',
      search: false,
      valueEnum: {
        true: { text: '正常', status: 'Success' },
        false: {
          text: '停用',
          status: 'Error',
        },
      },
    },
    {
      title: '商城搜索',
      dataIndex: 'clientSearchable',
      key: 'clientSearchableHelper',
      valueEnum: {
        true: { text: '允許', status: 'Success' },
        false: {
          text: '禁止',
          status: 'Default',
        },
      },
    },
    {
      title: '賬戶種型',
      dataIndex: 'companyAccountType',
      search: false,
      valueEnum: getValueEnum(COMPANY_ACCOUNT_TYPES),
    },
    {
      title: '到期日',
      dataIndex: 'expiryDate',
      search: false,
      valueType: 'date',
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '到期日名為必填',
          },
        ],
      },
    },
    {
      title: '允許用戶數',
      dataIndex: 'allowedUserNumber',
      search: false,
      valueType: 'number',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '允許用戶數為必填',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, aciton) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          修改
        </a>,
        <a key="deactive">停用</a>,
        <Popconfirm
          cancelText="取消"
          key="delete"
          onConfirm={() => deleteCompanyServiceRequest(record)}
          okText="確定"
          title="確認刪除公司?"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={COLUMNS}
        request={async (params = {}, sort, filter) => {
          return BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(ADMIN_COMPANY_SERVICE_CONFIG, {
            ...params,
            active: true,
          });
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="button"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
      />
      <CompanyModalForm
        onClickSubmit={createCompanyServiceRequest}
        setModalVisible={setCreateModalVisible}
        visible={createModalVisible}
      />
      <CompanyModalForm
        company={currentRow || {}}
        onClickSubmit={updateCompanyServiceRequest}
        setModalVisible={setUpdateModalVisible}
        visible={updateModalVisible}
      />
    </PageContainer>
  );
};

export default Compamy;

import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { USER_ROLES } from '@/enum/userRole';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import {
  COMPANY_INTERNAL_USER_RESET_PASSWORD,
  COMPANY_INTERNAL_USER_SERVICE_CONFIG,
} from '@/services/hive/internalUserService';
import { PlusOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useRef, useState } from 'react';
import UserManagerModalForm from './components/UserManagerModalForm';

export function UserManage() {
  const tableActionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_INTERNAL_USER_SERVICE_CONFIG, request);
    tableActionRef.current.reload();
    return true;
  };

  const deactivate = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(COMPANY_INTERNAL_USER_SERVICE_CONFIG, record.sid);
    tableActionRef.current.reload();
  };

  const onClickEdit = (record) => {
    setCurrentRow(record);
    setModalFormVisible(true);
  };

  const onChangeModalFormVisible = (visible) => {
    if (!visible) {
      setCurrentRow(undefined);
    }
    setModalFormVisible(visible);
  };

  const query = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
      COMPANY_INTERNAL_USER_SERVICE_CONFIG,
      params,
      sort,
      filter,
    );
  };

  const resetPassword = async (record) => {
    await COMPANY_INTERNAL_USER_RESET_PASSWORD(record);
    tableActionRef.current.reload();
    message.success('密碼已重置為Ab123456');
  };

  const update = async (record) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_INTERNAL_USER_SERVICE_CONFIG, record);
    tableActionRef.current.reload();
    return true;
  };

  const COLUMNS = [
    { title: '人員名稱', dataIndex: 'name' },
    { title: '人員賬號', dataIndex: 'username' },
    {
      title: '權限',
      dataIndex: 'authorities',
      render: (text, record) =>
        record.authorities.map((authority, index) => (
          <Tag color="success" key={'authorizites_tag'}>
            {getEnumLabelByKey(USER_ROLES, authority)}
          </Tag>
        )),
    },
    ProTableOperationColumnButtons(onClickEdit, deactivate, (text, record) => (
      <Popconfirm
        cancelText="取消"
        key="delete"
        onConfirm={() => resetPassword(record)}
        okText="確認"
        title="確認重置密碼?"
      >
        <a>重置密碼</a>
      </Popconfirm>
    )),
  ];

  return (
    <PageContainer>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <ProCard>
          <Space direction="vertical">
            <Text>企業允許最大人員數: 1</Text>
            <Text>企業人員賬戶數量: 1</Text>
          </Space>
        </ProCard>
        <ProTable
          actionRef={tableActionRef}
          columns={COLUMNS}
          request={query}
          search={false}
          toolBarRender={() => [
            <Button
              icon={<PlusOutlined />}
              key="button"
              type="primary"
              onClick={() => onChangeModalFormVisible(true)}
            >
              新建
            </Button>,
          ]}
        />
      </Space>
      <UserManagerModalForm
        onChangeModalFormVisible={onChangeModalFormVisible}
        onFinish={currentRow ? update : create}
        user={currentRow}
        visible={modalFormVisible}
      />
    </PageContainer>
  );
}

export default UserManage;

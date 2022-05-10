import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import { getValueEnum } from '@/enum/enumUtil';
import { PRINTERS } from '@/enum/printer';
import {
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_PRINTER_SERVICE_CONFIG } from '@/services/printerService';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import PrinterModalForm from './components/PrinterModalForm';

const Printer = () => {
  const tableActionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [modalFormVisible, setModalFormVisible] = useState();

  const create = async (request) => {
    await BEDROCK_CREATE_SERVICE_REQEUST(COMPANY_PRINTER_SERVICE_CONFIG, request);
    tableActionRef.current.reload();
    return true;
  };

  const inactivate = async (record) => {
    await BEDROCK_DEACTIVATE_SERVICE_REQUEST(COMPANY_PRINTER_SERVICE_CONFIG, record.id);
    tableActionRef.current.reload();
  };

  const onVisibleChange = (visible) => {
    if (!visible) {
      setCurrentRow();
    }
    setModalFormVisible(visible);
  };

  const query = async (params, sort, filter) => {
    return await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(COMPANY_PRINTER_SERVICE_CONFIG, {
      ...params,
      active: true,
    });
  };

  const update = async (request) => {
    await BEDROCK_UPDATE_SERVICE_REQUEST(COMPANY_PRINTER_SERVICE_CONFIG, request);
    tableActionRef.current.reload();
    return true;
  };

  const COLUMNS = [
    { title: '名稱', dataIndex: ['name'] },
    {
      title: '打印機類型',
      dataIndex: ['printer'],
      valueEnum: getValueEnum(PRINTERS),
    },
    { title: '打印機SN', dataIndex: ['serialNumber'], search: false },
    { title: '打印機Key', dataIndex: ['printerKey'], search: false },
    { title: '備註', dataIndex: ['remark'], search: false },
    ProTableOperationColumnButtons((record) => {
      setCurrentRow(record);
      setModalFormVisible(true);
    }, inactivate),
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableActionRef}
        columns={COLUMNS}
        request={query}
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="button"
            onClick={() => setModalFormVisible(true)}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
      <PrinterModalForm
        onFinish={currentRow ? update : create}
        onVisibleChange={onVisibleChange}
        printer={currentRow}
        visible={modalFormVisible}
      />
    </PageContainer>
  );
};

export default Printer;

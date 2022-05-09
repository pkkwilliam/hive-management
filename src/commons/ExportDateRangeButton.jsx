import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { FileTextOutlined } from '@ant-design/icons';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { Button, Descriptions, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import CompanyHeader from './print/CompanyHeader';
import PrintableHiddenComponentWrapper from './print/PrintableHiddenComponentWrapper';

const ExportDateRangeButton = (props) => {
  const dateFormat = 'YYYY-MM-DD';
  const { columns, formRef, params = {}, printContent, serviceConfig } = props;

  const printRef = useRef();

  const [createTimeRange, setCreateTimeRange] = useState({
    createDateRangeEnd: undefined,
    createDateRangeStart: undefined,
  });
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (createTimeRange.createDateRangeEnd && createTimeRange.createDateRangeStart) {
      query();
    }
  }, [createTimeRange]);

  const query = async () => {
    const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(serviceConfig, {
      ...formRef.current.getFieldsValue(),
      ...params,
      'queryHelperRequest.createTimeRangeEnd': createTimeRange.createDateRangeEnd,
      'queryHelperRequest.createTimeRangeStart': createTimeRange.createDateRangeStart,
    });
    setData(response.data);
  };

  const setModalVisible = (visible) => {
    if (!visible) {
      setCreateTimeRange({ createDateRangeEnd: undefined, createDateRangeStart: undefined });
      setData([]);
    }
    setVisible(visible);
  };

  return (
    <>
      <Button icon={<FileTextOutlined />} onClick={() => setModalVisible(true)}>
        導出數據
      </Button>
      <Modal
        footer={[
          <Button key="customClose" onClick={() => setModalVisible(false)}>
            關閉
          </Button>,
          <ReactToPrint
            key="printButoon"
            trigger={() => (
              <Button key="print" type="primary">
                列印
              </Button>
            )}
            content={() => printRef.current}
            pageStyle={`{ size: 2.5in 4in }`}
          />,
        ]}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
        title="導出數據"
        visible={visible}
        width={1500}
      >
        <ProFormDateRangePicker
          fieldProps={{
            onChange: (momments, localDates) =>
              setCreateTimeRange({
                createDateRangeStart: localDates[0],
                createDateRangeEnd: localDates[1],
              }),
            // defaultValue: [
            //   moment(moment().toDate(), dateFormat),
            //   moment(moment().toDate(), dateFormat).subtract(1, 'month'),
            // ],
          }}
          label="期間"
          rules={[{ required: true, message: '請選擇數據期間' }]}
        />
        {printContent(data)}
      </Modal>
      <PrintableHiddenComponentWrapper ref={printRef}>
        <Space direction="vertical">
          <CompanyHeader />
          <Descriptions>
            <Descriptions.Item label="期間">{`${createTimeRange.createDateRangeStart} - ${createTimeRange.createDateRangeEnd}`}</Descriptions.Item>
          </Descriptions>
          {printContent(data)}
        </Space>
      </PrintableHiddenComponentWrapper>
    </>
  );
};

export default ExportDateRangeButton;

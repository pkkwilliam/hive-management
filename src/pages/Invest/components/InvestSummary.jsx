import React, { useEffect, useState } from 'react';
import { Button, Card, Col, DatePicker, Divider, Row, Space, Statistic, Tag, Tooltip } from 'antd';
import { GET_INVEST_SUMMARY } from '@/services/hive/investService';
import { getDate, toApplicationLocalDate } from '@/util/dateUtil';
import Text from 'antd/lib/typography/Text';
import { SearchOutlined } from '@ant-design/icons';

const InvestSummary = (props) => {
  const [investSummary, setInvestSummary] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: getDate(-30),
    endDate: getDate(2),
  });

  useEffect(() => {
    getSummary(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const getSummary = async (startDate, endDate) => {
    const response = await GET_INVEST_SUMMARY(
      props.invest.id,
      toApplicationLocalDate(startDate),
      toApplicationLocalDate(endDate),
    );
    setInvestSummary(response);
  };

  return (
    <Card
      title="Invest Summary"
      extra={
        <Space>
          <DatePicker.RangePicker
            dataFormat="YYYY-MM-DD"
            defaultValue={[dateRange.startDate, dateRange.endDate]}
            onChange={(dates) => setDateRange({ startDate: dates[0], endDate: dates[1] })}
          />
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => getSummary(dateRange.startDate, dateRange.endDate)}
          />
        </Space>
      }
    >
      <Space direction="vertical">
        <Text>Financial Report</Text>
        <InvestFinancialReport investSummary={investSummary} />
      </Space>
      <Divider />
      <Space direction="vertical">
        <Text>Automate Order Bar</Text>
        <AutomateOrderBar invest={investSummary} />
      </Space>
    </Card>
  );
};

const InvestFinancialReport = (props) => {
  const { activeOrderCount, gain, loss, potentialGain, potentialLoss } = props.investSummary;
  return (
    <Space split={<Divider type="vertical" />}>
      <Statistic title="Active" value={activeOrderCount ?? 0} />
      <Statistic
        title="Gain"
        value={gain ?? 0}
        precision={2}
        valueStyle={{ color: '#3f8600' }}
        prefix={'$'}
      />
      <Statistic
        title="Loss"
        value={loss ?? 0}
        precision={2}
        valueStyle={{ color: '#cf1322' }}
        prefix={'$'}
      />

      <Statistic
        title="P-Gain"
        value={potentialGain ?? 0}
        precision={2}
        valueStyle={{ color: '#3f8600' }}
        prefix={'$'}
      />

      <Statistic
        title="P-Loss"
        value={potentialLoss ?? 0}
        precision={2}
        valueStyle={{ color: '#cf1322' }}
        prefix={'$'}
      />
    </Space>
  );
};

const AutomateOrderBar = (props) => {
  const { investSteps } = props.invest;
  if (!investSteps) {
    return <></>;
  }
  const bars = investSteps.map(({ from, hasOrder, isProfit, to }) => {
    const color = !hasOrder ? 'grey' : isProfit ? 'green' : 'red';
    return (
      <Tooltip key="AutomateOrderBar" text={`$${from}-$${to}`}>
        <div style={{ backgroundColor: color, borderRadius: 5, width: 9, height: 5 }} />
      </Tooltip>
    );
  });
  return <Space wrap>{bars}</Space>;
};

export default InvestSummary;

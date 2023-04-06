import React, { useState } from 'react';
import { Space, Tag } from 'antd';
import { GET_PING } from '@/services/hive/pingService';
import { useEffect } from 'react';

/**
 * this should only be use in one place through out the whole application
 */

const OFF_COLOR = 'default';
const ON_COLOR = 'processing';

const PING_INTERVAL = 60000;

const StatusTag = ({ isOn, text }) => {
  return <Tag color={isOn ? ON_COLOR : OFF_COLOR}>{text}</Tag>;
};

const PingChecker = () => {
  let interval;
  const [pingResponse, setPingResponse] = useState({});
  useEffect(() => {
    pingServer();
    interval = setInterval(() => pingServer(), PING_INTERVAL);
  }, []);

  const pingServer = () => {
    GET_PING()
      .then((response) => setPingResponse(response))
      .catch((error) => setPingResponse({}));
  };

  return (
    <Space>
      <StatusTag isOn={pingResponse.connected} text="MDC" />
      <StatusTag isOn={pingResponse?.channelsHealth?.['COINBASE_CRYPTO']} text="CoinBase" />
      <StatusTag isOn={pingResponse?.channelsHealth?.['FOREX_STANDARD_ACCOUNT']} text="Forex" />
      <StatusTag isOn={pingResponse?.channelsHealth?.['INTERACTIVE_BROKERS_STOCK']} text="MDC" />
    </Space>
  );
};

export default PingChecker;

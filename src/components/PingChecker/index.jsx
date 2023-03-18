import React, { useState } from 'react';
import { Space, Tag } from 'antd';
import { GET_PING } from '@/services/hive/pingService';
import { useEffect } from 'react';

/**
 * this should only be use in one place through out the whole application
 */

const PING_INTERVAL = 60000;

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
      <Tag color={pingResponse.connected ? 'green' : 'red'}>{`MDC`}</Tag>
      <Tag
        color={pingResponse?.channelsHealth?.['COINBASE_CRYPTO'] ? 'green' : 'red'}
      >{`CoinBase`}</Tag>
      <Tag
        color={pingResponse?.channelsHealth?.['FOREX_STANDARD_ACCOUNT'] ? 'green' : 'red'}
      >{`Forex`}</Tag>
      <Tag
        color={pingResponse?.channelsHealth?.['INTERACTIVE_BROKERS_STOCK'] ? 'green' : 'red'}
      >{`IB`}</Tag>
    </Space>
  );
};

export default PingChecker;

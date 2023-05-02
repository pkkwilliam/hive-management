import Text from 'antd/lib/typography/Text';
import React from 'react';

const InvestOrderBook = (props) => {
  const { gridInterval = 1, maxPrice = 0, minPrice = 0 } = props;
  const estimateNumberOfOrder = (maxPrice - minPrice) / gridInterval;
  return (
    <>
      <Text>Estimate number of order: {estimateNumberOfOrder.toFixed(0)}</Text>
    </>
  );
};

export default InvestOrderBook;

import ProCard from '@ant-design/pro-card';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CategoryOnboard from './components/CategoryOnboard';
import CompanyBusinessOnboard from './components/CompanyBusinessOnboard';
import ItemOnboard from './components/ItemOnboard';
import OrderOnobard from './components/OrderOnboard';
import PriceTemplateOnboard from './components/PriceTemplateOnboard';
import ShopOnboard from './components/ShopOnboard';
import { Alert } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

export const Onboard = () => {
  const { onboard, getOnboard } = useModel('onboard');

  const [collapsed, setCollapsed] = useState(true);
  const [finishedAtLeastOne, setFinishedAtLeastOne] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);

  useEffect(() => {
    // force to show onboard when user press the button, so ignore any other changes
    if (showOnboard) {
      return;
    }
    let shouldCollapse = true;
    let count = 0;
    let finishedCount = 0;
    let unfinishedCount = 0;
    for (let key in onboard) {
      // we only need to validate once
      if (shouldCollapse && onboard[key]) {
        shouldCollapse = false;
      }
      if (onboard[key]) {
        unfinishedCount += 1;
      } else {
        finishedCount += 1;
      }
      count += 1;
    }
    setCollapsed(shouldCollapse);
    setFinishedAtLeastOne(finishedCount > 0);
  }, [onboard]);

  return (
    <ProCard
      collapsed={collapsed}
      collapsible
      extra={
        <Space
          onClick={() => {
            setCollapsed(!collapsed);
            setShowOnboard(true);
          }}
        >
          <Alert message="使用嚮導助您快速熟悉系統及添加必需要的組件" type="success" />
          <RightOutlined rotate={!collapsed ? 90 : undefined} />
        </Space>
      }
      title="使用嚮導"
    >
      <Space direction="vertical" style={{ display: 'flex' }} size="large">
        {/* onboard partial finished */}
        {finishedAtLeastOne && !showOnboard ? (
          <a onClick={() => setShowOnboard(true)}>顯示所有</a>
        ) : null}
        {showOnboard || onboard?.showCreateShop ? <ShopOnboard /> : null}
        {showOnboard || onboard?.showCreateCategory ? <CategoryOnboard /> : null}
        {showOnboard || onboard?.showCreateCompanyBusiness ? <CompanyBusinessOnboard /> : null}
        {showOnboard || onboard?.showCreateItem ? <ItemOnboard /> : null}
        {showOnboard || onboard?.showCreateOrder ? <OrderOnobard /> : null}
        {showOnboard || onboard?.showCreatePriceTemplate ? <PriceTemplateOnboard /> : null}
      </Space>
    </ProCard>
  );
};

export default Onboard;

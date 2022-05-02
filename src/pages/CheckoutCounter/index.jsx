import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import CheckoutCounterItemSpecificationSelect from './components/CheckoutCounterItemSpecificationSelect';
import CheckoutCounterItemSpecificationSelectedStatistic from './components/CheckoutCounterItemSpecificationSelectedStatistic';
import CheckoutCounterItemSpecificationTable from './components/CheckoutCounterItemSpecificationTable';
import { Button, Card, Space } from 'antd';
import CheckoutModal from './components/CheckoutModal';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';

const CheckoutCounter = () => {
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [distributionShop, setDistributionShop] = useState();
  const [scanRef, setScanRef] = useState();
  const [selectedItemSpecifications, setSelectedItemSpecifications] = useState([]);

  const clear = () => {
    setSelectedItemSpecifications([]);
  };

  const onClickCheckout = () => {
    setCheckoutModalVisible(true);
  };

  const onSelectItemSpecification = (value, option, quantity = 1) => {
    let containeItem = false;
    let updatedItems = selectedItemSpecifications.map((selectedItemSpecification) => {
      if (selectedItemSpecification.itemSpecification.id === option.data.id) {
        containeItem = true;
        return {
          itemSpecification: selectedItemSpecification.itemSpecification,
          quantity: selectedItemSpecification.quantity + quantity,
        };
      } else {
        return selectedItemSpecification;
      }
    });
    if (!containeItem) {
      updatedItems.push({ itemSpecification: option.data, quantity: 1 });
    }
    setSelectedItemSpecifications(updatedItems);
  };

  return (
    <>
      <Card>
        <ProFormShopSelect
          allowClear={false}
          label="銷售地點"
          onChange={(shopId) => setDistributionShop(shopId)}
        />
      </Card>
      {!distributionShop ? null : (
        <ProCard direction="row" ghost gutter={16}>
          <ProCard direction="column" ghost>
            <CheckoutCounterItemSpecificationSelectedStatistic
              selectedItemSpecifications={selectedItemSpecifications}
            />
            <ProCard>
              <ProCard colSpan={20}>
                <CheckoutCounterItemSpecificationSelect
                  onSelect={onSelectItemSpecification}
                  setRef={setScanRef}
                  shopId={distributionShop}
                  showSearch
                />
                <CheckoutCounterItemSpecificationTable
                  dataSource={selectedItemSpecifications}
                  setSelectedItemSpecifications={setSelectedItemSpecifications}
                />
              </ProCard>
              <ProCard layout="center">
                <Space direction="vertical" size="large">
                  <Button
                    block
                    disabled={selectedItemSpecifications < 1}
                    onClick={onClickCheckout}
                    size="large"
                    type="primary"
                  >
                    結賬
                  </Button>
                  <Button block size="large" onClick={() => scanRef.current.focus()}>
                    繼續掃描
                  </Button>
                  <Button block onClick={clear} size="large">
                    清空
                  </Button>
                  <Button block disabled size="large">
                    掛單F12
                  </Button>
                </Space>
              </ProCard>
            </ProCard>
          </ProCard>
        </ProCard>
      )}
      <CheckoutModal
        onChangeVisible={setCheckoutModalVisible}
        onSuccess={() => {
          clear();
        }}
        order={{
          distributionShop: { id: distributionShop },
          orderItemInfos: selectedItemSpecifications,
        }}
        visible={checkoutModalVisible}
      />
    </>
  );
};

export default CheckoutCounter;

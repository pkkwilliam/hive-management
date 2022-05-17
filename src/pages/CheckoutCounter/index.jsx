import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import CheckoutCounterItemSpecificationSelect from './components/CheckoutCounterItemSpecificationSelect';
import CheckoutCounterItemSpecificationSelectedStatistic from './components/CheckoutCounterItemSpecificationSelectedStatistic';
import CheckoutCounterItemSpecificationTable from './components/CheckoutCounterItemSpecificationTable';
import { Button, Card, Space } from 'antd';
import CheckoutModal from './components/CheckoutModal';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';
import { useModel } from 'umi';
import CheckoutCounterQuickSelector from './components/CheckoutCounterQuickSelector';
import { ProFormGroup } from '@ant-design/pro-form';

const CheckoutCounter = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
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

  const onSelectItemSpecification = (itemSpecification, quantity = 1) => {
    let containeItem = false;
    let updatedItems = selectedItemSpecifications.map((selectedItemSpecification) => {
      if (selectedItemSpecification.itemSpecification.id === itemSpecification.id) {
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
      updatedItems.push({ itemSpecification, quantity: 1 });
    }
    setSelectedItemSpecifications(updatedItems);
  };

  return (
    <>
      <Card>
        <ProFormGroup>
          <ProFormShopSelect
            allowClear={false}
            disabled={distributionShop}
            formItemProps={{ style: { margin: 0 } }}
            label="銷售地點"
            onChange={(shopId) => {
              setDistributionShop(shopId);
              setInitialState({ ...initialState, fullScreen: true, menuCollapsed: true });
            }}
            value={distributionShop}
          />
          <Button
            disabled={!distributionShop}
            onClick={() => {
              setDistributionShop();
              clear();
            }}
          >
            重置
          </Button>
        </ProFormGroup>
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
                  <Button block disabled size="large">
                    補打上單
                  </Button>
                </Space>
              </ProCard>
            </ProCard>
          </ProCard>
          <ProCard colSpan={8} ghost>
            <CheckoutCounterQuickSelector onSelect={onSelectItemSpecification} />
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

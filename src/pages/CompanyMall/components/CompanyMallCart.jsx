import ProFormPaymentChannelRadio from '@/commons/proForm/ProFormPaymentChannelRadio';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WEB } from '@/enum/orderPlaceChannel';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { USER_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ProFormText, StepsForm } from '@ant-design/pro-form';
import { Button, Dropdown, Image, Menu, Modal, Result, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';

const ShoppingCartMenu = (props) => {
  const { cartItemSpecifications, setVisible } = props;
  return (
    <>
      <Menu>
        <Menu.Item>購物車</Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Text>{`${cartItemSpecifications.length}件商品`}</Text>
        </Menu.Item>
        <Menu.Item>
          <Button
            disabled={cartItemSpecifications.length < 1}
            onClick={() => setVisible(true)}
            type="primary"
          >
            結算
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

const CompanyMallCart = (props) => {
  const { cartItemSpecifications, company, shop } = props;
  const [orderResponse, setOrderResponse] = useState({});
  const [visible, setVisible] = useState(false);

  const onClickCheckOut = async (request) => {
    const requestBody = {
      ...request,
      distributionShop: shop,
      orderItemInfos: cartItemSpecifications,
      orderPlaceChannel: ORDER_PLACE_CHANNEL_EXTERNAL_CUSTOMER_WEB.key,
    };
    const response = await BEDROCK_CREATE_SERVICE_REQEUST(USER_ORDER_SERVICE_CONFIG, requestBody);
    setOrderResponse(response);
    return true;
  };

  return (
    <>
      <Dropdown
        overlay={
          <ShoppingCartMenu
            cartItemSpecifications={cartItemSpecifications}
            setVisible={setVisible}
          />
        }
      >
        <Space>
          <ShoppingCartOutlined />
          購物車
        </Space>
      </Dropdown>
      <StepsForm
        stepsFormRender={(dom, submitter) => {
          return (
            // @ts-expect-error
            <Modal
              destroyOnClose
              footer={submitter}
              onCancel={() => setVisible(false)}
              title="結算"
              visible={visible}
              width={800}
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm name="items" title="購物車">
          <Space>
            {cartItemSpecifications.map((cartItemSpecification) => (
              <Space key="cartItemSpecificarion">
                <Image src={cartItemSpecification.itemSpecification.item.imageUrl} />
                <Title level={5}>{cartItemSpecification.itemSpecification.item.name}</Title>
                <Text>{cartItemSpecification.itemSpecification.name}</Text>
                <Text>{cartItemSpecification.quantity}</Text>
              </Space>
            ))}
          </Space>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="order" title="訂單" onFinish={onClickCheckOut}>
          <ProFormPaymentChannelRadio label="支付方式" name={['paymentChannel']} />
          <ProFormText label="備註" name={['remark']} />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="orderConfirm" title="訂單完成" onFinish={() => true}>
          <Result
            status="success"
            title={`單號: ${orderResponse.id} 費用: $${
              orderResponse.cost
            } 支付渠道: ${getEnumLabelByKey(PAYMENT_CHANNELS, orderResponse.paymentChannel)}`}
            subTitle={`結賬成功`}
            extra={[
              <Button type="primary" key="close" onClick={() => setVisible(false)}>
                關閉
              </Button>,
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default CompanyMallCart;

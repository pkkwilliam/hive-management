import ProFormPaymentChannelRadio from '@/commons/proForm/ProFormPaymentChannelRadio';
import { ORDER_PLACE_CHANNEL_DIRECT_SALES_IN_SHOP } from '@/enum/orderPlaceChannel';
import { ORDER_STATUS_PAYMENT_PENDING, ORDER_STATUS_ORDER_FINISHED } from '@/enum/orderStatus';
import { BEDROCK_CREATE_SERVICE_REQEUST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { calculateTotalCost } from '@/util/orderUtil';
import { ModalForm, ProFormDependency } from '@ant-design/pro-form';
import { Button, Col, Divider, Form, InputNumber, message, Modal, Result, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import {
  PAMYNET_CHANNEL_MACAU_PASS_CARD,
  PAYMENT_CHANNELS,
  PAYMENT_CHANNEL_ALIPAY,
  PAYMENT_CHANNEL_BOC_PAY,
  PAYMENT_CHANNEL_CASH,
  PAYMENT_CHANNEL_M_PAY,
  PAYMENT_CHANNEL_WECHAT_PAY,
} from '@/enum/paymentChannel';
import { PAYMENT_STATUS_PAID, PAYMENT_STATUS_PENDING } from '@/enum/paymentStatus';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { useModel } from 'umi';
import { COMPANY_PRINT_ORDER_BY_ID } from '@/services/hive/printService';

const CheckoutModal = (props) => {
  // Model
  const { shops } = useModel('shop');

  // ModalForm
  const [form] = Form.useForm();
  const [cashValue, setCashValue] = useState();
  const [orderResponse, setOrderResponse] = useState();
  const { onChangeVisible, order, visible } = props;
  form.setFieldsValue(order);

  const onClickCancel = () => {
    form.resetFields();
    onChangeVisible(false);
    setCashValue(0);
  };

  const onClickClose = () => {
    form.resetFields();
    onChangeVisible(false);
    setCashValue(0);
    setOrderResponse(undefined);
  };

  const createOrder = async (request, printReceipt = false) => {
    const { paymentChannel } = request;
    let requestBody = {
      ...order,
      ...request,
      orderPlaceChannel: ORDER_PLACE_CHANNEL_DIRECT_SALES_IN_SHOP.key,
    };

    // if payment status is CASH then create order with payment status paid, else application need to call payment APIs
    if (
      paymentChannel === PAYMENT_CHANNEL_CASH.key ||
      paymentChannel === PAMYNET_CHANNEL_MACAU_PASS_CARD.key
    ) {
      requestBody.paymentStatus = PAYMENT_STATUS_PAID.key;
      requestBody.orderStatus = ORDER_STATUS_ORDER_FINISHED.key;
    } else {
      requestBody.paymentStatus = PAYMENT_STATUS_PENDING.key;
      requestBody.orderStatus = ORDER_STATUS_PAYMENT_PENDING.key;
    }

    const response = await BEDROCK_CREATE_SERVICE_REQEUST(
      COMPANY_ORDER_SERVICE_CONFIG,
      requestBody,
    );
    setOrderResponse(response);
    if (printReceipt) {
      printOrderReceiptRequest(response);
    }

    props.onSuccess();
    message.success('結賬成功');
  };

  const printOrderReceiptRequest = (order) => {
    const shop = shops.find((shop) => shop.id === order.distributionShop.id);
    if (shop.defaultPrinter) {
      COMPANY_PRINT_ORDER_BY_ID(order.id, shop.defaultPrinter.id);
    }
  };

  const MainContent = orderResponse ? (
    <OrderResult
      orderResponse={orderResponse}
      onChangeVisible={onChangeVisible}
      onClickClose={onClickClose}
      setOrderResponse={setOrderResponse}
    />
  ) : (
    <Row>
      <Col span={12}>
        <LeftPanel onClickCancel={onClickCancel} />
      </Col>
      <Col span={12}>
        <RightPanel cashValue={cashValue} order={order} setCashValue={setCashValue} />
      </Col>
    </Row>
  );

  return (
    <ModalForm
      closable={false}
      destroyOnClose
      footer={[]}
      form={form}
      maskClosable={false}
      modalProps={{
        closable: false,
      }}
      onFinish={(request) => createOrder(request, true)}
      onChangeVisible={onChangeVisible}
      submitter={{
        render: (props, defaultDoms) => {
          if (orderResponse) {
            return null;
          }
          return [
            <Button
              key="finishWithoutPrint"
              onClick={() => createOrder(form.getFieldsValue())}
              size="large"
            >
              完成結賬
            </Button>,
            ...defaultDoms,
          ];
        },
        resetButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },
        searchConfig: {
          submitText: '完成結賬並列印收據',
        },
        submitButtonProps: {
          block: true,
          size: 'large',
        },
      }}
      visible={visible}
      width={1200}
    >
      {MainContent}
    </ModalForm>
  );
};

const LeftPanel = (props) => {
  const { onClickCancel } = props;
  return (
    <Space direction="vertical">
      <Space direction="horizontal">
        <Button block onClick={onClickCancel} size="large">
          F1 作廢
        </Button>
        <Button block disabled onClick={onClickCancel} size="large">
          F2 會員
        </Button>
      </Space>
      <Divider>優惠方式</Divider>
      <Space direction="horizontal">
        <Button block disabled size="large">
          優惠券
        </Button>
        <Button block disabled size="large">
          整單折扣
        </Button>
        <Button block disabled size="large">
          整單改價
        </Button>
      </Space>
      <Divider>零頭處理</Divider>
      <Space direction="horizontal">
        <Button block disabled size="large">
          抹分
        </Button>
        <Button block disabled size="large">
          見角進元
        </Button>
      </Space>
      <Divider>支付方式</Divider>
      <Space direction="horizontal">
        <ProFormPaymentChannelRadio
          paymentChannels={[
            PAYMENT_CHANNEL_CASH,
            PAMYNET_CHANNEL_MACAU_PASS_CARD,
            PAYMENT_CHANNEL_M_PAY,
            PAYMENT_CHANNEL_BOC_PAY,
            PAYMENT_CHANNEL_ALIPAY,
            PAYMENT_CHANNEL_WECHAT_PAY,
          ]}
          name={['paymentChannel']}
          rules={[{ required: true, message: '請選擇支付方式' }]}
        />
      </Space>
    </Space>
  );
};

const OrderResult = (props) => {
  const { onClickClose, orderResponse, setOrderResponse } = props;
  return (
    <Result
      status="success"
      title={`單號: ${orderResponse.id} 費用: $${orderResponse.cost} 支付渠道: ${getEnumLabelByKey(
        PAYMENT_CHANNELS,
        orderResponse.paymentChannel,
      )}`}
      subTitle={`結賬成功`}
      extra={[
        <Button type="primary" key="close" onClick={onClickClose}>
          關閉
        </Button>,
      ]}
    />
  );
};

const RightPanel = (props) => {
  const { cashValue, order, setCashValue } = props;
  return (
    <>
      <Row align="middle" flex>
        <Col flex={1}>
          <Text style={{ fontSize: 16 }} type="secondary">
            商品合計
          </Text>
        </Col>
        <Col>
          <Text strong style={{ fontSize: 28 }}>
            ${calculateTotalCost(order.orderItemInfos)}
          </Text>
        </Col>
      </Row>
      <Divider dashed plain />
      <Row align="middle" flex>
        <Col flex={1}>
          <Text type="danger">商品優惠</Text>
        </Col>
        <Col>
          <Title level={5} type="danger">
            $0.00
          </Title>
        </Col>
      </Row>
      <Row align="middle" flex>
        <Col flex={1}>
          <Text type="danger">整單優惠</Text>
        </Col>
        <Col>
          <Title level={5} type="danger">
            $0.00
          </Title>
        </Col>
      </Row>
      <Divider dashed plain />
      <Row align="middle" flex>
        <Col flex={1}>
          <Text style={{ fontSize: 22 }}>應收</Text>
        </Col>
        <Col>
          <Title level={3}>${calculateTotalCost(order.orderItemInfos)}</Title>
        </Col>
      </Row>
      <Divider />
      <ProFormDependency name={['paymentChannel']}>
        {({ paymentChannel }) => {
          const cost = calculateTotalCost(order.orderItemInfos);
          const isCash = paymentChannel === PAYMENT_CHANNEL_CASH.key;
          return (
            <>
              <InputNumber
                disabled={!isCash}
                onChange={setCashValue}
                placeholder="現金"
                size="large"
                style={{ width: '100%' }}
                value={cashValue}
              />
              <Divider />
              <Row flex>
                <Col flex={1}>
                  <Text style={{ fontSize: 22 }}>
                    {isCash
                      ? '找零'
                      : getEnumLabelByKey(PAYMENT_CHANNELS, paymentChannel, '選擇支付方式')}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 26 }}>
                    {isCash ? `$${(cashValue ?? 0) - cost}` : `$${cost}`}
                  </Text>
                </Col>
              </Row>
            </>
          );
        }}
      </ProFormDependency>
    </>
  );
};

export default CheckoutModal;

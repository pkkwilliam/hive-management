import React from 'react';
import OrderModalForm from '@/pages/Order/components/OrderModalForm';
import { ModalForm, ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';
import OrderItemInfoList from '@/pages/Order/components/OrderItemInfoList';
import ProFormOrderPlaceChannelRadio from '@/commons/proForm/ProFormOrderPlaceChannelRadio';
import ProFormOrderStatusRadio from '@/commons/proForm/ProFormOrderStatusRadio';
import ProFormPaymentChannelRadio from '@/commons/proForm/ProFormPaymentChannelRadio';
import ProFormPaymentStatusRadio from '@/commons/proForm/ProFormPaymentStatusRadio';
import { ORDER_STATUS_ORDER_PENDING } from '@/enum/orderStatus';
import { ORDER_PLACE_CHANNEL_INTERNAL_ORDER } from '@/enum/orderPlaceChannel';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';

const OrderExternalMiniProgramModalForm = (props) => {
  const fieldsReadOnly = true;
  const [form] = Form.useForm();
  const { order, onFinish, onVisibleChange, visible } = props;

  if (order?.id) {
    form.setFieldsValue({
      ...order,
      orderItemInfos: order.orderItemInfos.map((orderItemInfo) => ({
        ...orderItemInfo,
        item: orderItemInfo.itemSpecification.item,
      })),
    });
  }

  return (
    <ModalForm
      destroyOnClose
      form={form}
      modalProps={{ maskClosable: false }}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={order ? '修改訂單' : '創建訂單'}
      visible={visible}
      width={1200}
    >
      <ProFormDigit hidden disabled label="ID" name="id" />
      <ProFormShopSelect
        label="配貨中心"
        name={['distributionShop', 'id']}
        readonly={fieldsReadOnly}
        tooltip="訂單確認後不能修改，如需修改，請删除此訂單後再重新下單"
      />
      <ProFormGroup>
        <ProFormShopSelect
          label="客戶名稱"
          name={['createBy', 'name']}
          readonly={fieldsReadOnly}
          tooltip="訂單確認後不能修改，如需修改，請删除此訂單後再重新下單"
        />
        <ProFormShopSelect
          label="客戶電話"
          name={['createBy', 'smsNumber']}
          readonly={fieldsReadOnly}
          tooltip="訂單確認後不能修改，如需修改，請删除此訂單後再重新下單"
        />
      </ProFormGroup>
      <OrderItemInfoList readonly label="訂單內容" name="orderItemInfos" form={form} />
      <ProFormOrderPlaceChannelRadio
        initialValue={ORDER_PLACE_CHANNEL_INTERNAL_ORDER.key}
        label="訂單渠道"
        name="orderPlaceChannel"
        rules={[{ required: true, message: '請選擇訂單渠道' }]}
      />
      <ProFormOrderStatusRadio
        initialValue={ORDER_STATUS_ORDER_PENDING.key}
        label="訂單狀態"
        name="orderStatus"
        rules={[{ required: true, message: '請選擇訂單狀態' }]}
      />
      <ProFormPaymentChannelRadio
        label="支付渠道"
        name={['paymentChannel']}
        rules={[{ required: true, message: '請選擇支付渠道' }]}
      />
      <ProFormPaymentStatusRadio
        label="支付狀態"
        name="paymentStatus"
        rules={[{ required: true, message: '請選擇支付狀態' }]}
      />
      <ProFormText label="備註" name="remark" />
    </ModalForm>
  );
};

export default OrderExternalMiniProgramModalForm;

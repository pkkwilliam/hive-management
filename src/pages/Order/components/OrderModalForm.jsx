import React from 'react';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import ProFormCompanyBusinessSelect from '@/commons/proForm/ProFormCompanyBusinessSelect';
import ProFormCompanyBusinessAddressSelect from '@/commons/proForm/ProFormCompanyBusinessAddress';
import ProFormOrderPlaceChannelRadio from '@/commons/proForm/ProFormOrderPlaceChannelRadio';
import ProFormOrderStatusRadio from '@/commons/proForm/ProFormOrderStatusRadio';
import ProFormPaymentStatusRadio from '@/commons/proForm/ProFormPaymentStatusRadio';
import OrderItemInfoList from './OrderItemInfoList';
import ProFormShopSelect from '@/commons/proForm/ProFormShopSelect';
import ProFormPaymentChannelRadio from '@/commons/proForm/ProFormPaymentChannelRadio';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { ORDER_PLACE_CHANNEL_INTERNAL_ORDER } from '@/enum/orderPlaceChannel';
import { ORDER_STATUS_ORDER_PENDING } from '@/enum/orderStatus';

const InternalOrderModalForm = (props) => {
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
      <ProFormDependency name={['companyBusiness', 'deliveryAddress', 'distributionShop']}>
        {({ companyBusiness, deliveryAddress, distributionShop }) => {
          return (
            <>
              <ProFormShopSelect
                label="配貨中心"
                name={['distributionShop', 'id']}
                readonly={distributionShop?.id}
                rules={[{ required: true, message: '請選擇配貨中心' }]}
                tooltip="訂單確認後不能修改，如需修改，請删除此訂單後再重新下單"
              />
              <ProFormGroup>
                <ProFormCompanyBusinessSelect
                  label="客戶"
                  name={['companyBusiness', 'id']}
                  readonly={companyBusiness?.id}
                  rules={[{ required: true, message: '請選擇客戶' }]}
                  width={'md'}
                />
                <ProFormCompanyBusinessAddressSelect
                  dependencies={['companyBusiness', 'id']}
                  label="送貨地址"
                  name={['deliveryAddress', 'id']}
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        const companyBusinessUser = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(
                          COMPANY_MANAGER_COMPANY_BUSINESS_SERVICE_CONFIG,
                          { active: true, id: getFieldValue('companyBusiness').id },
                        );
                        const hasAddress = companyBusinessUser.data[0].deliveryAddress.some(
                          (deliveryAddress) => deliveryAddress.id === value,
                        );
                        return value && !hasAddress
                          ? Promise.reject(new Error('送貨地址與客戶地址不符'))
                          : Promise.resolve();
                      },
                    }),
                  ]}
                  width={'xl'}
                />
              </ProFormGroup>
            </>
          );
        }}
      </ProFormDependency>
      <OrderItemInfoList label="訂單內容" name="orderItemInfos" form={form} />
      <ProFormGroup>
        <ProFormMoney label="拆扣費用" name="discount" />
        <ProFormMoney label="額外費用" name="extraFee" />
      </ProFormGroup>
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

export default InternalOrderModalForm;

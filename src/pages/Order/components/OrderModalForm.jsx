import React from 'react';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import { Button, Form } from 'antd';
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
import { COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG } from '@/services/hive/companyBusinessService';
import { ORDER_PLACE_CHANNEL_INTERNAL_ORDER } from '@/enum/orderPlaceChannel';
import { ORDER_STATUS_ORDER_PENDING } from '@/enum/orderStatus';
import ProFormCurrencyRadio from '@/commons/proForm/ProFormCurrencyRadio';

const OrderModalForm = (props) => {
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
      submitter={{
        // 完全自定义整个区域
        render: (props, doms) => {
          return [
            order ? null : (
              <Button key="reset" onClick={() => props.form?.resetFields()}>
                重置
              </Button>
            ),
            ...doms,
          ];
        },
      }}
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
                          COMPANY_COMPANY_BUSINESS_SERVICE_CONFIG,
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
      <ProFormGroup>
        <ProFormDateTimePicker
          label="送貨日期"
          name={['deliveryDate']}
          fieldProps={{
            showTime: true,
            showSecond: false,
            minuteStep: 30,
            secondStep: 30,
            format: 'YYYY-MM-DD HH:mm',
          }}
        />
        <ProFormText
          label="客戶採購訂單號(PO)"
          name={['companyBusinessPurchaseOrder']}
          tooltip="外部企業採購訂單號，方便企業查找對方的採購單。"
        />
      </ProFormGroup>
      <OrderItemInfoList readonly={order} label="訂單內容" name="orderItemInfos" form={form} />
      <ProFormGroup>
        <ProFormMoney readonly={order} label="折扣費用" name="discount" />
        <ProFormMoney readonly={order} label="額外費用" name="extraFee" />
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
      <ProFormCurrencyRadio
        label="幣種"
        name={['currency']}
        rules={[{ required: true, message: '請選擇支付幣種' }]}
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

export default OrderModalForm;

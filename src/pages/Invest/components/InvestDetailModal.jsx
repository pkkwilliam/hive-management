import React, { useState } from 'react';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import ProFormAlgorithmSelect from '@/commons/proForm/ProFormAlgorithmSelect';
import ProFormChannelSelect from '@/commons/proForm/ProFormChannelSelect';
import { Form, Space } from 'antd';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import { ALGORITHM_GRID_TRADING } from '@/enum/Algorithm';
import ProFormCalculateMerhodSelect from '@/commons/proForm/ProFormCalculateMethodSelect';

const InvestModalForm = (props) => {
  const { invest, onFinish, setVisible, visible } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(invest);

  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(setVisible, form, visible)}
      title={invest ? `ID: ${invest.id} Edit Invest` : 'Add Invest'}
      visible={visible}
      width={1200}
    >
      <Space direction="vertical">
        <Space>
          <ProFormSwitch label="Active" name={['active']} />
          <ProFormText hidden label="ID" name={['id']} />
        </Space>
        <Space>
          <ProFormChannelSelect label="Channel" name={['channel']} rules={[{ required: true }]} />
          <ProFormText
            label="Product Name"
            name={['productName']}
            placeholder="Apple Stock"
            rules={[{ required: true, message: 'Pelase enter product name' }]}
          />
          <ProFormText
            label="Channel Product ID"
            name={['channelProductId']}
            placeholder="USD-BIT"
            rules={[{ required: true, message: 'Pelase enter channel product ID' }]}
          />
        </Space>
        <Space>
          <ProFormDigit
            label="Max Concurrent"
            name={['maxConcurrent']}
            rules={[{ required: true }]}
          />
          <ProFormDigit label="Size" name={['size']} />
        </Space>
        <Space>
          <ProFormAlgorithmSelect
            label="Algorithm"
            name={['algorithmType']}
            rules={[{ required: true }]}
          />
        </Space>
        <Space>
          <ProFormDependency name={['algorithmType']}>
            {(dependencyValues) => {
              const { algorithmType } = dependencyValues;
              switch (algorithmType) {
                case ALGORITHM_GRID_TRADING.key:
                  return <GridTradingField />;
                default:
                  return null;
              }
            }}
          </ProFormDependency>
        </Space>
      </Space>
      <Space>
        <ProFormCalculateMerhodSelect
          label="Gain Sell Calculate Method"
          name={['gainSellCalculateMethod']}
        />
        <ProFormDigit label="Gain Sell Rate" name={['gainSellRate']} />
        <ProFormDigit label="Loss Sell Rate" name={['lossSellRate']} />
        <ProFormDigit label="Max Buy In Price" name={['maxBuyInPrice']} />
        <ProFormDigit label="Min Buy In Price" name={['minBuyInPrice']} />
      </Space>
    </ModalForm>
  );
};

const GridTradingField = () => {
  return (
    <Space>
      <ProFormDigit label="Grid Interval" name={['gridInterval']} rules={[{ required: true }]} />
      <ProFormDigit
        label="Max Open Per Grid"
        name={['maxOpenPerGrid']}
        rules={[{ required: true }]}
      />
    </Space>
  );
};

export default InvestModalForm;

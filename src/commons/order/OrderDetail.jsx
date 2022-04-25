import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { toDisplayDate } from '@/util/dateUtil';
import ProTable from '@ant-design/pro-table';
import { Card, Descriptions, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const OrderDetail = (props) => {
  const { order } = props;
  const {
    companyBusiness,
    cost,
    createTime,
    deliveryAddress,
    discount,
    distributionShop,
    extraFee,
    id,
    orderPlaceChannel,
    paymentChannel,
    remark,
  } = order;

  const COLUMNS = [
    { title: 'SKU', dataIndex: ['itemSpecification', 'sku'] },
    { title: '品牌', dataIndex: ['itemSpecification', 'item', 'brand'] },
    { title: '商品', dataIndex: ['itemSpecification', 'item', 'name'] },
    { title: '規格', dataIndex: ['itemSpecification', 'name'] },
    { title: '數量', dataIndex: ['quantity'] },
    { title: '單價', dataIndex: ['price'] },
    { title: '小計', renderText: (text, record) => record.quantity * record.price },
  ];

  return (
    <Space direction="vertical" size={'large'}>
      <Card title="送貨資料">
        <Descriptions column={3}>
          <Descriptions.Item label="公司名稱">{companyBusiness?.name ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="公司聯繫人">
            {companyBusiness?.businessUser?.name ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="公司聯繫人電話">
            {`${companyBusiness?.businessUser?.countryCode ?? '-'}-${
              companyBusiness?.businessUser?.smsNumber ?? '-'
            }`}
          </Descriptions.Item>
          <Descriptions.Item label="收貨聯繫人">
            {deliveryAddress?.contactName ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="收貨聯繫人電話">
            {`${deliveryAddress?.countryCode ?? '-'}-${deliveryAddress?.smsNumber ?? '-'}`}
          </Descriptions.Item>
          <Descriptions.Item label="收貨地址">
            {`${deliveryAddress?.street ?? '-'}${deliveryAddress?.unit ?? '-'}`}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="收貨地址備註">
            {deliveryAddress?.remark ?? '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="訂單資料">
        <Descriptions>
          <Descriptions.Item label="單號">{id}</Descriptions.Item>
          <Descriptions.Item label="日期">
            {toDisplayDate(createTime, 'YYYY-MM-DD HH:mm:SS')}
          </Descriptions.Item>
          <Descriptions.Item label="配貨中心">{distributionShop?.name}</Descriptions.Item>
          <Descriptions.Item label="下單渠道">
            {getEnumLabelByKey(ORDER_PLACE_CHANNELS, orderPlaceChannel)}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="支付渠道">
            {getEnumLabelByKey(PAYMENT_CHANNELS, paymentChannel)}
          </Descriptions.Item>
          <Descriptions.Item label="折扣">{discount}</Descriptions.Item>
          <Descriptions.Item label="額外費用">{extraFee}</Descriptions.Item>
          <Descriptions.Item label="總價">{cost}</Descriptions.Item>
          <Descriptions.Item label="備註" span={3}>
            {remark}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ProTable
        columns={COLUMNS}
        dataSource={order.orderItemInfos}
        options={false}
        pagination={false}
        search={false}
      />
    </Space>
  );
};

export default OrderDetail;

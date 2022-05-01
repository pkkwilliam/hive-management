import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { toDisplayDate } from '@/util/dateUtil';
import { StatisticCard } from '@ant-design/pro-card';
import { Card, Descriptions, Divider, Space, Statistic, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const HEADER_FONT_SIZE = 16;

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
    {
      title: 'SKU',
      dataIndex: ['itemSpecification', 'sku'],
      render: (text, record) => (text ? text : '-'),
    },
    { title: '品牌', dataIndex: ['itemSpecification', 'item', 'brand'] },
    { title: '商品', dataIndex: ['itemSpecification', 'item', 'name'] },
    { title: '規格', dataIndex: ['itemSpecification', 'name'] },
    { title: '數量', dataIndex: ['quantity'] },
    { title: '單價', dataIndex: ['price'] },
    { title: '小計', render: (text, record) => record.quantity * record.price },
  ];

  return (
    <Space direction="vertical">
      <Descriptions column={1} size="small">
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="單號"
        >
          {id}
        </Descriptions.Item>
        <Descriptions.Item
          label="配貨中心"
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
        >
          {distributionShop?.name}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="公司名稱"
        >
          {companyBusiness?.name ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="聯繫人電話"
        >
          {`${deliveryAddress?.phoneNumber ?? '-'}`}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontSize: HEADER_FONT_SIZE }}
          labelStyle={{ fontSize: HEADER_FONT_SIZE }}
          label="收貨地址"
        >
          {`${deliveryAddress?.street ?? '-'}${deliveryAddress?.unit ?? '-'}`}
        </Descriptions.Item>
      </Descriptions>
      <PriceSummary order={order} />
      <Card size="small" title="送貨資料">
        <Descriptions column={3}>
          <Descriptions.Item label="公司名稱">{companyBusiness?.name ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="收貨聯繫人">
            {deliveryAddress?.contactName ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="聯繫人電話">
            {`${deliveryAddress?.phoneNumber ?? '-'}`}
          </Descriptions.Item>
          <Descriptions.Item label="收貨地址">
            {`${deliveryAddress?.street ?? '-'}${deliveryAddress?.unit ?? '-'}`}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="收貨地址備註">
            {deliveryAddress?.remark ?? '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card size="small" title="訂單資料">
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
          <Descriptions.Item label="備註" span={3}>
            {remark}
          </Descriptions.Item>
          <Descriptions.Item label="折扣">{`$${discount ?? '-'}`}</Descriptions.Item>
          <Descriptions.Item label="額外費用">{`$${extraFee ?? '-'}`}</Descriptions.Item>
          <Descriptions.Item label="總價">{`$${cost}`}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card size="small" title="費用">
        <Table
          bordered={false}
          columns={COLUMNS}
          dataSource={order.orderItemInfos}
          pagination={false}
          size="small"
        />
      </Card>
    </Space>
  );
};

const PriceSummary = (props) => {
  const { cost, discount, extraFee, orderItemInfos } = props.order;

  return (
    <StatisticCard.Group direction="row">
      <StatisticCard
        statistic={{
          title: '貨品種數',
          value: orderItemInfos.length,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '貨品金額',
          value: `$${cost + discount - extraFee}`,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '折扣',
          value: `$${discount ?? '-'}`,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '額外費用',
          value: `$${extraFee ?? '-'}`,
        }}
      />
      <StatisticCard.Divider type={'vertical'} />
      <StatisticCard
        statistic={{
          title: '總費用',
          value: `$${cost ?? '-'}`,
        }}
      />
    </StatisticCard.Group>
  );
};

export default OrderDetail;

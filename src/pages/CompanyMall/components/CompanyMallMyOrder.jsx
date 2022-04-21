import {
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { USER_ORDER_SERVICE_CONFIG } from '@/services/hive/orderService';
import { Col, Collapse, Descriptions, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { toDisplayDate } from '@/util/dateUtil';
import { getEnumLabelByKey } from '@/enum/enumUtil';
import { ORDER_STATUSES } from '@/enum/orderStatus';
import { ORDER_PLACE_CHANNELS } from '@/enum/orderPlaceChannel';
import { PAYMENT_CHANNELS } from '@/enum/paymentChannel';
import { PAYMENT_STATUSES } from '@/enum/paymentStatus';
import { useModel } from 'umi';

const CompanyMallMyOrder = (props) => {
  const { initialState } = useModel('@@initialState');
  const { company, setVisible, visible } = props;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    queryOrder();
  }, [company]);

  const queryOrder = async () => {
    if (!company || !initialState.currentUser) {
      return;
    }
    const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(USER_ORDER_SERVICE_CONFIG, {
      current: 1,
      pageSize: 200,
      'company.id': company?.id,
      'createBy.sid': initialState.currentUser.sid,
    });
    setOrders(response.data);
  };
  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={() => setVisible(false)}
      title="歷史訂單"
      visible={visible}
    >
      <Collapse>
        {orders.map((order) => (
          <Collapse.Panel header={`單號: ${order.id}`} key={order.id}>
            <Descriptions title="訂單詳細">
              <Descriptions.Item label="創單時間">
                {toDisplayDate(order.createTime, 'YYYY-MM-DD HH:MM:SS')}
              </Descriptions.Item>
              <Descriptions.Item label="狀態">
                {getEnumLabelByKey(ORDER_STATUSES, order.orderStatus)}
              </Descriptions.Item>
              <Descriptions.Item label="總價">{order.cost}</Descriptions.Item>
              <Descriptions.Item label="企業">{order.company.chineseName}</Descriptions.Item>
              <Descriptions.Item label="地點">{order.distributionShop.name}</Descriptions.Item>
              <Descriptions.Item label="下單方式">
                {getEnumLabelByKey(ORDER_PLACE_CHANNELS, order.orderPlaceChannel)}
              </Descriptions.Item>
              <Descriptions.Item label="支付方式">
                {getEnumLabelByKey(PAYMENT_CHANNELS, order.paymentChannel)}
              </Descriptions.Item>
              <Descriptions.Item label="支付狀態">
                {getEnumLabelByKey(PAYMENT_STATUSES, order.paymentStatus)}
              </Descriptions.Item>
              <Descriptions.Item label="備註">{order.remark}</Descriptions.Item>
            </Descriptions>
          </Collapse.Panel>
        ))}
      </Collapse>
    </Modal>
  );
};

export default CompanyMallMyOrder;

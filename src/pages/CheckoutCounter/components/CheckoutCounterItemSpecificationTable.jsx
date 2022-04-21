import ProTable from '@ant-design/pro-table';
import { Button, InputNumber, Row, Table } from 'antd';
import React from 'react';
import { Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

const CheckoutCounterItemSpecificationTable = (props) => {
  const { dataSource, setSelectedItemSpecifications } = props;

  const deleteRow = (record) => {
    setSelectedItemSpecifications(
      dataSource.filter((data) => data.itemSpecification.id !== record.itemSpecification.id),
    );
  };

  const onChangeQuantity = (record, quantity) => {
    setSelectedItemSpecifications(
      dataSource.map((data) => {
        if (data.itemSpecification.id !== record.itemSpecification.id) {
          return data;
        } else {
          return { ...data, quantity };
        }
      }),
    );
  };

  const COLUMNS = [
    { title: '行', valueType: 'indexBorder' },
    {
      title: '商品',
      render: (text, record) => (
        <Space direction="vertical">
          <Link>{`${record.itemSpecification.item.name} ${record.itemSpecification.name}`}</Link>
          <Text type="secondary">{record.itemSpecification.sku}</Text>
        </Space>
      ),
    },
    {
      title: '單價',
      dataIndex: ['itemSpecification', 'price'],
      renderText: (text, record) => '$' + text,
    },
    {
      title: '優惠價',
      dataIndex: ['itemSpecification', 'discountPrice'],
      renderText: (text, record) => '$' + text,
    },
    {
      title: '數量',
      dataIndex: 'quantity',
      render: (text, record) => (
        <InputNumber onChange={(value) => onChangeQuantity(record, value)} value={text} />
      ),
    },
    {
      title: '小計',
      dataIndex: 'cost',
      render: (text, record) =>
        `$${
          (record.itemSpecification.discountPrice
            ? record.itemSpecification.discountPrice
            : record.itemSpecification.price) * record.quantity
        }`,
    },
    {
      title: '操作',
      dataIndex: 'cost',
      render: (text, record) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => deleteRow(record)} type="link">
          删除
        </Button>
      ),
    },
  ];
  return (
    <ProTable
      options={false}
      columns={COLUMNS}
      pagination={false}
      search={false}
      size="small"
      {...props}
    />
  );
};

export default CheckoutCounterItemSpecificationTable;

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useModel } from 'umi';
import React, { useState } from 'react';
import CompanyMallMyOrder from './CompanyMallMyOrder';

const UserMenu = (props) => {
  const { onClickMyOrder } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  return (
    <Menu>
      {!currentUser ? (
        <Menu.Item key="login">
          <Text>登入</Text>
        </Menu.Item>
      ) : null}
      <Menu.Item key="myOrder" onClick={onClickMyOrder}>
        <Text>我的訂單</Text>
      </Menu.Item>
      {currentUser ? (
        <Menu.Item key="logout">
          <Text type="danger">登出</Text>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

const CompanyMallUser = (props) => {
  const { company } = props;
  const [myOrderModalVisible, setMyOrderModalVisible] = useState(false);
  return (
    <>
      <Dropdown
        overlay={
          <UserMenu
            onClickMyOrder={() => {
              setMyOrderModalVisible(true);
            }}
          />
        }
      >
        <Space>
          <UserOutlined />
          我的
        </Space>
      </Dropdown>
      <CompanyMallMyOrder
        company={company}
        setVisible={setMyOrderModalVisible}
        visible={myOrderModalVisible}
      />
    </>
  );
};

export default CompanyMallUser;

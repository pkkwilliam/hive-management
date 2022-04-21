import React, { useEffect, useState } from 'react';
import { Avatar, Form, Layout, message, PageHeader, Space } from 'antd';
import { history, useParams } from 'umi';
import { BEDROCK_GET_BY_ID_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { PUBLIC_COMAPNY_SERVICE_CONFIG } from '@/services/hive/companyService';
import { PUBLIC_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import CompanyMallItemList from './components/CompanyMallItemList';
import { Header } from 'antd/lib/layout/layout';
import Footer from '@/components/Footer';
import CompanyMallCart from './components/CompanyMallCart';
import CompanyMallItemModal from './components/CompanyMallItemModal';
import CompanyMallUser from './components/CompanyMallUser';

const CompanyMall = () => {
  const { companyId, shopId } = useParams();
  const [cartItemSpecifications, setCartItemSpecifications] = useState([]);
  const [company, setCompany] = useState();
  const [currentRow, setCurrentRow] = useState();
  const [shop, setShop] = useState();
  const [itemModalVisible, setItemModalVisible] = useState(false);

  const getCompany = async (params, sort, filter) => {
    const response = await BEDROCK_GET_BY_ID_SERVICE_REQUEST(
      PUBLIC_COMAPNY_SERVICE_CONFIG,
      companyId,
    );
    setCompany(response);
  };

  const getShop = async (params, sort, filter) => {
    const response = await BEDROCK_GET_BY_ID_SERVICE_REQUEST(PUBLIC_SHOP_SERVICE_CONFIG, shopId);
    setShop(response);
  };

  const onClickAdd = (cartItemSpecification) => {
    setCartItemSpecifications([...cartItemSpecifications, cartItemSpecification]);
  };

  const onClickItem = (item) => {
    setCurrentRow(item);
    setItemModalVisible(true);
  };

  const onChangeItemModalVisible = (visible) => {
    if (!visible) {
      setCurrentRow();
    }
    setItemModalVisible(visible);
  };

  useEffect(() => {
    getCompany();
    getShop();
  }, []);

  return (
    <>
      <Layout>
        <Header
          style={{ backgroundColor: '#cef33b' }}
          onBack={() => window.history.back()}
          title="Title"
          subTitle="This is a subtitle"
        >
          <PageHeader
            avatar={{ src: company?.logoImageUrl }}
            className="site-page-header"
            backIcon={false}
            title={company?.chineseName}
            subTitle={shop?.name}
            extra={[
              <CompanyMallUser company={company} key="user" shop={shop} size={38} />,
              <CompanyMallCart
                cartItemSpecifications={cartItemSpecifications}
                company={company}
                key="cart"
                shop={shop}
                size={38}
              />,
            ]}
          />
        </Header>
        <CompanyMallItemList onClickItem={onClickItem} />
        <Footer>Footer</Footer>
      </Layout>
      <CompanyMallItemModal
        item={currentRow}
        onClickAdd={onClickAdd}
        setVisible={onChangeItemModalVisible}
        visible={itemModalVisible}
      />
    </>
  );
};

export default CompanyMall;

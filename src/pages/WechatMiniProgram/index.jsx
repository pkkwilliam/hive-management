import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { COMPANY_GET_COMPANY_WECHAT_MINI_PROGRAM_CONFIG_BY_COMPANY_ID } from '@/services/hive/wechatMiniProgramConfigService';
import { useModel } from 'umi';
import RecommendItemTransfer from './components/RecommendItemTransfer';
import CategoryTransfer from './components/CategoryTransfer';
import ItemSpecificationTransfer from './components/ItemSpecificationTransfer';
import {
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';
import { COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_CONFIG } from '@/services/hive/wechatMiniProgramConfigService';
import ProTable from '@ant-design/pro-table';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import { convertEnumsToProTableValueEnum } from '@/enum/enumUtil';
import { SHOP_TYPES } from '@/enum/shopType';

const WechatMiniProgram = () => {
  const { initialState } = useModel('@@initialState');
  const [wechatMiniProgramConfig, setWechatMiniProgramConfig] = useState({});

  const COLUMNS = [
    { title: '店名/倉名', dataIndex: 'name' },
    {
      title: '類型',
      dataIndex: 'shopType',
      valueEnum: convertEnumsToProTableValueEnum(SHOP_TYPES),
    },
    {
      title: '小程序二維碼',
      render: (text, record) => (
        <a onClick={() => onClickMiniProgramQrCode(record)}>小程序二維碼</a>
      ),
      search: false,
    },
  ];

  const query = async () => {
    const { currentUser } = initialState || {};
    const response = await COMPANY_GET_COMPANY_WECHAT_MINI_PROGRAM_CONFIG_BY_COMPANY_ID(
      currentUser.company.id,
    );
    setWechatMiniProgramConfig(response);
  };

  const update = async (request) => {
    const response = await BEDROCK_UPDATE_SERVICE_REQUEST(
      COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_CONFIG,
      request,
    );
    setWechatMiniProgramConfig(response);
  };

  useEffect(() => {
    query();
  }, []);

  return (
    <PageContainer>
      <ProCard bordered title="門店二維碼">
        <ProTable
          columns={COLUMNS}
          options={false}
          pagination={{ pageSize: 5 }}
          request={async (params = {}, sort, filter) => {
            return BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(COMPANY_SHOP_SERVICE_CONFIG, {
              ...params,
              active: true,
            });
          }}
          search={false}
        />
      </ProCard>
      <ProCard
        bordered
        title="內容"
        tabs={{
          type: 'card',
        }}
      >
        <ProCard.TabPane key="tab1" tab="推薦產品">
          <RecommendItemTransfer
            onUpdate={update}
            wechatMiniProgramConfig={wechatMiniProgramConfig}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="標籤/分類">
          <CategoryTransfer onUpdate={update} wechatMiniProgramConfig={wechatMiniProgramConfig} />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="產品">
          <ItemSpecificationTransfer
            onUpdate={update}
            wechatMiniProgramConfig={wechatMiniProgramConfig}
          />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  );
};

export default WechatMiniProgram;

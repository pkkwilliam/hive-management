import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { COMPANY_GET_COMPANY_WECHAT_MINI_PROGRAM_CONFIG_BY_COMPANY_ID } from '@/services/hive/wechatMiniProgramConfigService';
import { useModel } from 'umi';
import RecommendItemTransfer from './components/RecommendItemTransfer';
import CategoryTransfer from './components/CategoryTransfer';
import ItemSpecificationTransfer from './components/ItemSpecificationTransfer';
import { BEDROCK_UPDATE_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_WECHAT_MINI_PROGRAM_CONFIG_SERVICE_CONFIG } from '@/services/hive/wechatMiniProgramConfigService';
import ShopProTable from '../companyManager/Shop/components/ShopProTable';

const WechatMiniProgram = () => {
  const { initialState } = useModel('@@initialState');
  const [wechatMiniProgramConfig, setWechatMiniProgramConfig] = useState({});

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
        <ShopProTable
          tableProps={{
            columnsProps: {
              showOperationButtons: false,
            },
            options: false,
            search: false,
            toolBarRender: () => null,
          }}
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

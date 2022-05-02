import CreatePriorModal, {
  CREATE_PRIOR_MODAL_CATEGORY,
  CREATE_PRIOR_MODAL_ITEM,
  CREATE_PRIOR_MODAL_SHOP,
} from '@/commons/CreatePriorModal';
import { SettingOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import { history } from 'umi';

const WechatMiniProgramOnboard = () => {
  return (
    <>
      <ProCard
        extra={
          <CreatePriorModal
            priorModals={[
              CREATE_PRIOR_MODAL_SHOP,
              CREATE_PRIOR_MODAL_CATEGORY,
              CREATE_PRIOR_MODAL_ITEM,
            ]}
          >
            <Button
              icon={<SettingOutlined />}
              onClick={() => history.push('/wechatMiniProgram')}
              type="primary"
            >
              設置小程序
            </Button>
          </CreatePriorModal>
        }
        bordered
        headerBordered
        size="small"
        title="微信小程序"
        type="inner"
      >
        <Space>
          <Text>企業專屬的微信小程序，助您的企業邁向電子商務，開拓各區網上客源！</Text>
        </Space>
      </ProCard>
    </>
  );
};

export default WechatMiniProgramOnboard;

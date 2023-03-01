import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { GET_USER_PROFILE } from './services/hive/userProfile';
import { PUBLIC_GET_COMPANY_CONFIG_BY_COMPANY_ID } from './services/hive/companyConfigService';
import { Button, Space } from 'antd';
import { GET_COMPANY_ONBOARD } from './services/hive/companyOnboardService';
import { BEDROCK_GET_BY_ID_SERVICE_REQUEST } from './services/hive/bedrockTemplateService';
import { PUBLIC_COMAPNY_SERVICE_CONFIG } from './services/hive/companyService';

const isDev = process.env.NODE_ENV === 'development';
const companyMallPath = '/company/mall';
const mpayHelper = '/mpayH5Helper';
const renewalPath = '/companyManager/renewal';
const loginPath = '/user/login';
const trialPath = '/user/trial';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const userProfile = await GET_USER_PROFILE();
      return userProfile;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面 or Trial Page，不执行
  if (
    history.location.pathname !== companyMallPath &&
    !history.location.pathname.includes(mpayHelper) &&
    history.location.pathname !== loginPath &&
    history.location.pathname !== trialPath
  ) {
    const currentUser = await fetchUserInfo();
    const companyConfig = await PUBLIC_GET_COMPANY_CONFIG_BY_COMPANY_ID(currentUser.company.id);
    const companyOnBoard = await GET_COMPANY_ONBOARD();
    const company = await BEDROCK_GET_BY_ID_SERVICE_REQUEST(
      PUBLIC_COMAPNY_SERVICE_CONFIG,
      currentUser.company.id,
    );

    return {
      fetchUserInfo,
      company,
      companyOnBoard,
      companyConfig,
      currentUser,
      fullScreen: false,
      menuCollapsed: false,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState = { fullScreen: false }, setInitialState }) => {
  const { fullScreen, menuCollapsed } = initialState;
  return {
    collapsed: menuCollapsed,
    onCollapse: (collapsed) => setInitialState({ ...initialState, menuCollapsed: collapsed }),
    contentStyle: fullScreen ? { margin: 0 } : {},
    headerContentRender: () => (
      <Space style={{ marginLeft: 16 }}>
        {/* <Link to={'/checkoutCounter'}>
          <Button>收銀</Button>
        </Link>
        <Link to={'/order/internalOrder'}>
          <Button>企業訂單</Button>
        </Link> */}
      </Space>
    ),
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => (menuCollapsed ? null : <Footer />),
    onPageChange: () => {
      const { location } = history;

      // check if company payment due date is valid to use, if not redirect user to proper page to make payment
      const { expired } = initialState.company || {};
      if (expired && location.pathname !== renewalPath && location.pathname !== loginPath) {
        history.push(renewalPath);
      }

      // 如果没有登录，重定向到 login
      setInitialState({ ...initialState, fullScreen: false });
      if (
        !initialState?.currentUser &&
        location.pathname !== companyMallPath &&
        !location.pathname.includes(mpayHelper) &&
        location.pathname !== loginPath &&
        location.pathname !== trialPath
      ) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export default [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    hideInMenu: true,
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    hideInMenu: true,
    path: '/account',
    name: '賬號',
    routes: [
      {
        path: '/account/settings',
        name: '個人設置',
        component: './user/Account/index',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/company/mall',
    layout: false,
    name: '賬號',
    routes: [
      {
        exact: true,
        access: 'canPublic',
        path: '/company/mall/:companyId/:shopId',
        name: '企業商城',
        component: './CompanyMall/index',
      },
    ],
  },
  {
    hideInMenu: true,
    path: '/mpayH5Helper',
    layout: false,
    name: 'Mpay支付',
    routes: [
      {
        exact: true,
        access: 'canPublic',
        path: '/mpayH5Helper/:orderId',
        name: '支付系統',
        component: './MpayHelper/index',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            path: '/user',
            routes: [
              {
                name: 'Hive試用',
                path: '/user/trial',
                component: './user/Trial',
              },
            ],
          },
        ],
      },

      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'Hive管理',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/company',
        name: '企業',
        component: './admin/Company/index',
      },
      {
        path: '/admin/user',
        name: '用戶',
        component: './admin/User/index',
      },
    ],
  },
  {
    path: '/companyManager',
    name: '管理',
    routes: [
      {
        path: '/companyManager/shop',
        name: '門店/倉庫',
        component: './companyManager/Shop/index',
      },
      {
        path: '/companyManager/user',
        name: '內部人員',
        component: './companyManager/UserManage/index',
      },
      {
        path: '/companyManager/companyBusiness',
        name: '客戶',
        component: './companyManager/CompanyBusiness/index',
      },
      {
        path: '/companyManager/itemSpecificationPriceTemplate',
        name: '客戶專屬價單',
        component: './companyManager/ItemSpecificationPriceTemplate/index',
      },
      {
        path: '/companyManager/printer',
        name: '打印機',
        component: './company/Printer/index',
      },
    ],
  },
  {
    path: '/financial',
    name: '財務管理',
    routes: [
      {
        path: '/financial/companyBusiness',
        name: '客戶賬單',
        component: './financial/FinancialCompanyBusiness/index',
      },
    ],
  },
  {
    path: '/category',
    name: '標籤/分類',
    component: './company/Category/index',
  },
  {
    path: '/companyManagerItem',
    name: '商品管理',
    routes: [
      {
        path: '/companyManagerItem/item',
        name: '商品',
        component: './company/Item/index',
      },
      // {
      //   path: '/companyManagerItem/itemSpecification',
      //   name: '商品規格',
      //   component: './companyManager/ItemSpecification/index',
      // },
      // {
      //   path: '/companyManagerItem/itemSpecificationStock',
      //   name: '地點庫存',
      //   component: './shopManager/ItemSpecificationStock/index',
      // },
    ],
  },
  {
    path: '/order',
    name: '訂單',
    routes: [
      // {
      //   path: '/order',
      //   name: '銷售訂單',
      //   component: './Order/index',
      // },
      {
        path: '/order/internalOrder',
        name: '企業訂單',
        component: './Order/OrderInternal/index',
      },
      {
        path: '/order/externalCompanyBusiness',
        name: '外部訂單(企業)',
        component: './Order/OrderExternalCompanyBusiness/index',
      },
      {
        path: '/order/externalMiniProgram',
        name: '外部訂單(微信)',
        component: './Order/OrderExternalMiniPrgoram/index',
      },
      {
        path: '/order/directSale',
        name: '地點直銷',
        component: './Order/OrderDirectSale/index',
      },
    ],
  },
  {
    path: '/checkoutCounter',
    name: '收銀',
    icon: 'moneyCollect',
    component: './CheckoutCounter/index',
  },
  {
    path: '/wechatMiniProgram',
    name: '微信小程序',
    icon: 'wechat',
    component: './WechatMiniProgram/index',
  },
  {
    path: '/systemLog',
    name: '系統日誌',
    access: 'canCompanyManager',
    icon: 'fileDone',
    component: './SystemLog/index',
  },
  {
    path: '/companyConfig',
    name: '系統設定',
    access: 'canCompanyManager',
    icon: 'setting',
    component: './companyAdmin/CompanyConfig/index',
  },
  {
    component: './404',
  },
];

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
        path: '/companyManager/companyBusiness',
        name: '客戶',
        component: './companyManager/CompanyBusiness/index',
      },
      {
        path: '/companyManager/user',
        name: '內部人員',
        component: './companyManager/UserManage/index',
      },
      {
        path: '/companyManager/printer',
        name: '打印機',
        component: './company/Printer/index',
      },
    ],
  },
  {
    path: '/companyManagerItem',
    name: '商品管理',
    routes: [
      {
        path: '/companyManagerItem/category',
        name: '標簽',
        component: './company/Category/index',
      },
      {
        path: '/companyManagerItem/item',
        name: '商品',
        component: './company/Item/index',
      },
      {
        path: '/companyManagerItem/itemSpecification',
        name: '商品規格',
        component: './companyManager/ItemSpecification/index',
      },
      {
        path: '/companyManagerItem/itemSpecificationStock',
        name: '地點庫存',
        component: './shopManager/ItemSpecificationStock/index',
      },
      {
        path: '/companyManagerItem/itemSpecificationPriceTemplate',
        name: '價格模版',
        component: './companyManager/ItemSpecificationPriceTemplate/index',
      },
    ],
  },
  {
    path: '/shopManager',
    name: '訂單',
    routes: [
      {
        path: '/shopManager/internalOrder',
        name: '內部訂單',
        component: './shopManager/order/InternalOrder/index',
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
    path: '/companyConfig',
    name: '系統設定',
    icon: 'setting',
    component: './companyAdmin/CompanyConfig/index',
  },
  {
    component: './404',
  },
];

import React, { useRef, useState } from 'react';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import ProTable from '@ant-design/pro-table';
import { useModel } from 'umi';
import ShopModalForm from './shopModalForm';
import { SHOP_TYPES } from '@/enum/shopType';
import { convertEnumsToProTableValueEnum } from '@/enum/enumUtil';
import ProTableOperationColumnButtons from '@/commons/proTable/ProTableOperationButtons';
import { COMPANY_TEST_SHOP_PRINTER } from '@/services/hive/printService';
import { COMPANY_GET_WECHAT_MINI_PROGRAM_QR_CODE } from '@/services/hive/wechatMiniProgramQrCodeService';
import InactiveableLinkButton from '@/commons/InactiveableLinkButton';
import CreateShopButton from './CreateShopButton';
import ProTableActiveStatusColumn from '@/commons/proTable/ProTableActiveStatusColumn';
import { proTableCrudServiceGenerator } from '@/commons/proTable/proTableUtil';

const ShopProTable = (props) => {
  const { tableProps } = props;
  const { columnsProps = { showOperationButtons: true } } = tableProps ?? {};
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef();
  // const [createModalVisible, setCreateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  // const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const serviceGenerator = proTableCrudServiceGenerator(COMPANY_SHOP_SERVICE_CONFIG, actionRef);

  const onChangeModalFormVisible = (visible) => {
    if (!visible) {
      setCurrentRow(undefined);
    }
    setModalVisible(visible);
  };

  const onClickMiniProgramQrCode = async (record) => {
    const params = `companyId=${initialState.currentUser.company.id},shopId=${record.id}`;
    const response = await COMPANY_GET_WECHAT_MINI_PROGRAM_QR_CODE({
      page: 'pages/Landing/index',
      scene: params,
    });
  };

  const onClickTestPrinter = async (record) => {
    COMPANY_TEST_SHOP_PRINTER(record.id);
  };

  const COLUMNS = [
    ProTableActiveStatusColumn(),
    { title: '店名/倉名', dataIndex: 'name' },
    {
      title: '類型',
      dataIndex: 'shopType',
      valueEnum: convertEnumsToProTableValueEnum(SHOP_TYPES),
    },
    { title: '聯絡人', dataIndex: ['address', 'contactName'], search: false, valueType: 'text' },
    { title: '區號', dataIndex: ['address', 'countryCode'], search: false, valueType: 'number' },
    { title: '電話', dataIndex: ['address', 'phoneNumber'], search: false, valueType: 'number' },
    { title: '街道', dataIndex: ['address', 'street'], search: false, valueType: 'text' },
    { title: '單位', dataIndex: ['address', 'unit'], search: false, valueType: 'text' },

    {
      title: '默認打印機',
      dataIndex: ['defaultPrinter', 'name'],
      search: false,
      valueType: 'text',
    },
    {
      title: '小程序二維碼',
      render: (text, record) => (
        <a onClick={() => onClickMiniProgramQrCode(record)}>小程序二維碼</a>
      ),
      search: false,
    },
    columnsProps?.showOperationButtons
      ? ProTableOperationColumnButtons(
          (record) => {
            setCurrentRow(record);
            setModalVisible(true);
          },
          serviceGenerator.deactivate,
          (text, record) => (
            <InactiveableLinkButton
              disabled={!record.defaultPrinter}
              label="測試打印機"
              onClick={() => onClickTestPrinter(record)}
            />
          ),
          { deletePopConfirmMessage: '删除門店會一併删除該門店所有庫存，確認刪除?' },
        )
      : {},
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={COLUMNS}
        request={serviceGenerator.queryPagination}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <CreateShopButton key="create" onFinish={actionRef.current.reload} />,
        ]}
        {...tableProps}
      />
      <ShopModalForm
        onClickSubmit={currentRow ? serviceGenerator.update : serviceGenerator.create}
        setModalVisible={onChangeModalFormVisible}
        shop={currentRow}
        visible={modalVisible}
      />
    </>
  );
};

export default ShopProTable;

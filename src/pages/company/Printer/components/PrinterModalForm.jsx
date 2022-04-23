import ProFormPrinterSelect from '@/commons/proForm/ProFormPrinterSelect';
import { onModalFormVisibleChange } from '@/commons/proForm/proformUtil';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const PrinterModalForm = (props) => {
  const [form] = Form.useForm();
  const { onFinish, onVisibleChange, printer, visible } = props;
  form.setFieldsValue(printer);
  return (
    <ModalForm
      destroyOnClose
      form={form}
      onFinish={onFinish}
      onVisibleChange={(visible) => onModalFormVisibleChange(onVisibleChange, form, visible)}
      title={printer ? '修改打印機' : '新增打印機'}
      visible={visible}
    >
      <ProFormDigit hidden label="ID" name={['id']} />
      <ProFormText label="名稱" name={['name']} />
      <ProFormPrinterSelect label="打印機類型" name={['printer']} />
      <ProFormText label="打印機SN" name={['serialNumber']} />
      <ProFormText label="打印機Key" name={['printerKey']} />
      <ProFormText label="備註" name={['remark']} />
    </ModalForm>
  );
};

export default PrinterModalForm;

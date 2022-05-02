import React, { useState } from 'react';
import { MobileTwoTone } from '@ant-design/icons';
import { Button, Form, message, Result, Space } from 'antd';
import ProForm, { ProFormCaptcha, ProFormText, ProFormGroup } from '@ant-design/pro-form';
import styles from './index.less';
import { useIntl, history, useModel } from 'umi';

import ProFormCountryCodeSelect from '@/commons/proForm/ProFormCountryCodeSelect';
import { TRIAL_REQUEST, TRIAL_VERIFY } from '@/services/hive/trialService';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import Text from 'antd/lib/typography/Text';
import { LOGIN } from '@/services/hive/auth';
import { saveUserToken } from '@/storage/applicationStorage';

const Trial = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [verifiedCodeRequested, setVerifiedCodeRequested] = useState(false);
  const [form] = Form.useForm();
  const { initialState, setInitialState, refresh } = useModel('@@initialState');

  const reDirectToWelcomePage = () => {
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query;
    history.push(redirect || '/');
    refresh();
    return;
  };

  const login = async (username, password) => {
    const { data, response } = await LOGIN({
      username,
      password,
    });
    const authenticationToken = response.headers.get('authorization');
    saveUserToken(authenticationToken);
    setInitialState((s) => ({ ...s, currentUser: data }));
    setUserLoginState(data);
  };

  const requestTrial = async () => {
    await form.validateFields();
    const response = await TRIAL_REQUEST(form.getFieldsValue());
    setVerifiedCodeRequested(true);
    return true;
  };

  const verifyTrial = async (request) => {
    const response = await TRIAL_VERIFY(request);
    login(request.admin.username, request.admin.password);
    message.success('註冊成功');
    setShowResult(true);
  };

  return (
    <div className={styles.container}>
      <PageContainer title="企業試用申請">
        <ProCard>
          {showResult ? (
            <Result
              status="success"
              title="注冊成功"
              subTitle="此試用賬號擁有所有包括微信小程序及外部企業訂單功能"
              extra={[
                <Button key="console" type="primary" onClick={reDirectToWelcomePage}>
                  開始使用
                </Button>,
              ]}
            />
          ) : (
            <ProForm
              submitter={{
                submitButtonProps: {
                  disabled: !verifiedCodeRequested,
                },
              }}
              form={form}
              onFinish={verifyTrial}
            >
              <ProFormGroup title="公司資料">
                <Space direction="vertical">
                  <ProFormText
                    label="公司中文名稱"
                    name={['company', 'chineseName']}
                    rules={[{ required: true, message: '請輸入公司中文名稱' }]}
                  />
                  <ProFormText
                    label="公司英文名稱"
                    name={['company', 'englishName']}
                    rules={[{ required: true, message: '請輸入公司英文名稱' }]}
                  />
                </Space>
              </ProFormGroup>
              <ProFormGroup title="管理員資料">
                <Space direction="vertical">
                  <ProFormText
                    label="名稱"
                    name={['admin', 'name']}
                    rules={[{ required: true, message: '請輸入名稱' }]}
                  />

                  <ProFormText
                    label="賬號"
                    name={['admin', 'username']}
                    rules={[{ required: true, message: '請輸入賬號' }]}
                  />
                  <ProFormText.Password
                    label="密碼"
                    name={['admin', 'password']}
                    rules={[{ required: true, message: '請輸入密碼' }]}
                  />
                </Space>
              </ProFormGroup>
              <ProFormGroup title="驗證">
                <Space direction="vertical">
                  <ProFormCountryCodeSelect
                    label="區號"
                    name={['admin', 'countryCode']}
                    rules={[{ required: true, message: '請選擇區號' }]}
                  />
                  <ProFormText
                    label="手機號碼"
                    name={['admin', 'smsNumber']}
                    rules={[{ required: true, message: '請輸入手機號碼' }]}
                  />
                  <ProFormCaptcha
                    label="驗證碼"
                    captchaTextRender={(timing, count) => (
                      <Text>{timing ? `${count}後重新獲取` : '獲取驗證碼'}</Text>
                    )}
                    countDown={80}
                    fieldProps={{
                      prefix: <MobileTwoTone />,
                    }}
                    captchaProps={{}}
                    // 手机号的 name，onGetCaptcha 会注入这个值
                    phoneName={['admin', 'smsNumber']}
                    name={['oneTimePassword']}
                    rules={[
                      {
                        message: '請輸入驗證碼',
                      },
                    ]}
                    placeholder="請輸入驗證碼"
                    // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
                    // throw new Error("获取验证码错误")
                    onGetCaptcha={async (phone) => {
                      try {
                        await requestTrial();
                      } catch (ex) {
                        throw new Error('獲取驗證碼錯誤');
                      }
                      // message.success(`手機號 ${phone} 驗證碼發送成功!`);
                    }}
                  />
                </Space>
              </ProFormGroup>
            </ProForm>
          )}
        </ProCard>
      </PageContainer>
    </div>
  );
};

export default Trial;

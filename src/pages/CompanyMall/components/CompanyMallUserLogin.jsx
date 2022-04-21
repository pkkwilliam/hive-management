import { ModalForm } from '@ant-design/pro-form';
import React, { useState } from 'react';

const ForgotPasswordScene = (props) => {};

const LoginScene = (props) => {};

const RegisterScene = (props) => {};

const CompanyMallUserLogin = (props) => {
  const [scene, setScene] = useState('LOGIN_SCENE');

  return (
    <ModalForm>
      {scene === 'FORGOT_PASSWORD_SCENE' ? <ForgotPasswordScene /> : null}
      {scene === 'LOGIN_SCENE' ? <LoginScene /> : null}
      {scene === 'REGISTER_SCENE' ? <RegisterScene /> : null}
    </ModalForm>
  );
};

import React from 'react';
import Login from './Auth/Login';
import AccountNew from './Auth/AccountNew';
import Account from './Auth/Account';
import Password from './Auth/Password';
import PasswordReset from './Auth/PasswordReset';
import Reset from './Auth/Reset';
import Msg from './Auth/Msg';

const Auth = () => (
  <div>
    <Login />
    <AccountNew />
    <Account />
    <Password />
    <Reset />
    <PasswordReset />
    <Msg />
  </div>
);

export default Auth;

import { NextPage } from 'next';
import { ILayoutAuth } from '@/interfaces';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';


export const LayoutAuth:NextPage<ILayoutAuth> = ({title, subTitle, children, type}) => (
  <div className='bg-primary-gray'>

    { type === 'login' && (
      <LoginPage title={title} subTitle={subTitle}>
        {children}
      </LoginPage>
    )}

    { type === 'register' && (
      <RegisterPage title={title} subTitle={subTitle}>
        {children}
      </RegisterPage>
    )}

  </div>
);
import Styles from './login-header-styles.scss';
import { Logo } from '@/presentation/components';
import { memo } from 'react';

const LoginHeader = memo(() => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
});

export default LoginHeader;

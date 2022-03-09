import Styles from './login-header-styles.scss';
import { Logo } from '../logo/logo';
import { memo } from 'react';

export const LoginHeader = memo(() => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
});

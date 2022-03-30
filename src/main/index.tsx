import ReactDOM from 'react-dom';
import { Router } from '@/presentation/components';
import { makeLogin } from './factories/pages/login/login-factory';
import { makeSinup } from './factories/pages/signup/signup-factory';
import '@/presentation/styles/global.scss';

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSinup} />,
  document.getElementById('main'),
);

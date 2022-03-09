import { useContext } from 'react';
import { Spinner } from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

export const FormStatus = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  );
};

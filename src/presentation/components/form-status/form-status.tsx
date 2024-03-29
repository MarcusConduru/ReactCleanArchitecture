import { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span className={Styles.error} data-testid="main-error">
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus

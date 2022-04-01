import { useContext } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        id={props.name}
        placeholder=" "
        onFocus={(e) => {
          e.target.readOnly = false;
        }}
        readOnly
        data-testid={props.name}
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.value })
        }
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};

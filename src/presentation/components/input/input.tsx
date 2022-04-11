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
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        id={props.name}
        title={error}
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
      <label
        data-testid={`${props.name}-label`}
        title={error}
        htmlFor={props.name}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

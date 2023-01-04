import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

const Spinner = (props: Props) => {
  const nagativeClass = props.isNegative ? Styles.negative : ''
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[Styles.spinner, nagativeClass, props.className].join(' ')}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;

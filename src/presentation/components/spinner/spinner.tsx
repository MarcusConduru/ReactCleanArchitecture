import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

export const Spinner = (props: Props) => {
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[Styles.spinner, props.className].join(' ')}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

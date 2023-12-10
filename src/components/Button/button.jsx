import css from '../Styles/styles.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <>
      <button className={css.Button} type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

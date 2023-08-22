import styles from '../index.module.scss';

const Image = (props) => {
  return (
    <div className={styles['message__wrapper']}>
      <img
        className={styles['message__img']}
        src={props.url}
        alt='dalle generated'
        loading='lazy'
      />
    </div>
  );
};

export default Image;
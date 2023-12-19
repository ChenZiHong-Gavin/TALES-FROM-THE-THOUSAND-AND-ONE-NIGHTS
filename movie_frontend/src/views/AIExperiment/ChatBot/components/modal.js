import styles from '../index.module.scss';

const Modal = ({ title, children, modalOpen = false, setModalOpen }) => {
  return (
    <div>
      <input
        value={modalOpen}
        type='checkbox'
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
        className={styles['modal-toggle']}
      />
      <div className={styles.modal}>
        <div className={`${styles['relative']} ${styles['modal-box']}`}>
          <label
            onClick={() => setModalOpen(!modalOpen)}
            className={`${styles.absolute} ${styles['btn']} ${styles['btn-sm']} ${styles['btn-circle']} ${styles['right-2']} ${styles['top-2']}`}
          >
            ✕
          </label>
          <h3 className={`${styles['text-lg']} ${styles['font-bold']}`}>{title}</h3>
          <div className={styles['py-4']}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
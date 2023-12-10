import Modal from 'react-modal';
import css from './Modal.module.css';

Modal.setAppElement('#root');

export const Modal = ({ modalIsOpen, closeModal, largeImg, tags }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.Modal}
      overlayClassName={css.Overlay}
      contentLabel="Example Modal"
    >
      <img className={css.Img} src={largeImg} alt={tags} />
    </Modal>
  );
};

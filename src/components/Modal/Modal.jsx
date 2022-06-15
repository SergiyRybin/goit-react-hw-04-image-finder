import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', escClose);
    return () => {
      window.removeEventListener('keydown', escClose);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function escClose(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function bacdropClose(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.Overlay} onClick={bacdropClose}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;

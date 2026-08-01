import { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, title = "Title", children }) => {
  useEffect(() => {
    // if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      //   <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content}>
        {" "}
        <div className={styles.header}>
          {title && <h2>{title}</h2>}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
        {/* </div> */}
      </div>
    )
  );
};

export default Modal;

import { createPortal } from "react-dom";
import Modal from ".";

export const WithPortal = ({ isOpen, handleToggle }) => {
  const portalRoot = document.getElementById("portal-root");

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleToggle} title="FKFKkf">
      <h3>title Modal</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
        obcaecati!
      </p>
      <button type="button" onClick={handleToggle}>
        Close
      </button>
    </Modal>,
    portalRoot,
  );
};

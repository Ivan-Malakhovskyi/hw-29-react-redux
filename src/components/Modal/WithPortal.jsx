import Modal from ".";

export const WithPortal = ({ isOpen, handleToggle }) => {
  return (
    <Modal isOpen={isOpen} onClose={handleToggle} title="FKFKkf">
      <h3>title Modal</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
        obcaecati!
      </p>
      <button type="button" onClick={handleToggle}>
        Close
      </button>
    </Modal>
  );
};

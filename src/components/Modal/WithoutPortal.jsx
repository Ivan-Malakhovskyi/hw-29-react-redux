import Modal from ".";

export const WithoutPortal = ({ isOpen, handleToggle }) => {
  return (
    <Modal isOpen={isOpen} onClose={handleToggle}>
      <div>WithoutPortal</div>

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

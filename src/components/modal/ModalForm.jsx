import Modal from "react-bootstrap/Modal";

function ModalForm({ title, showModal, setShowModal, children }) {
  function handleClose() {
    setShowModal(!showModal);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="capitalize font-bold text-sky-700">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalForm;

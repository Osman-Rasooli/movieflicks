import React, { useEffect, useRef, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

import "./modal.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div ref={contentRef} className="modal-content">
      {props.children}
      <div className="modal-content-close" onClick={closeModal}>
        <RiCloseCircleLine className="close-icon" />
      </div>
    </div>
  );
};

export default Modal;

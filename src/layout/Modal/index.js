import React, { useState } from 'react';
import Modal from 'react-modal';

const MyModalComponent = ({ isOpen, ...props }) => {
  
  return (
    <Modal
      style={{ content: { padding: 0 } }}
      isOpen={isOpen}
    >
      {props.children}
    </Modal>
  );
};

export default MyModalComponent;

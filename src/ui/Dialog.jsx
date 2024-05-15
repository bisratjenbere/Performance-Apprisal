import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const DialogContainer = styled.div`
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101; /* Ensure dialog appears above the backdrop */
`;

const DialogText = styled.p`
  margin-bottom: 15px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DeleteConfirmationDialog = ({ onDelete, onCancel }) => {
  return (
    <>
      <Backdrop />
      <DialogContainer>
        <DialogText>Are you sure you want to delete?</DialogText>
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={onDelete}
        >
          Yes
        </Button>
        <Button onClick={onCancel}>No</Button>
      </DialogContainer>
    </>
  );
};

export default DeleteConfirmationDialog;

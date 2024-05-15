import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure the backdrop is behind the modal */
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 300px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  z-index: 1000;
`;

const NotificationItem = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.read ? "#f4f4f4" : "#ffffff")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const NotificationMessage = styled.p`
  margin: 0;
`;

const MarkAsReadButton = styled.button`
  border: none;
  background-color: transparent;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationsModal = ({ notifications, onClose, onMarkAsRead }) => {
  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalContainer>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            read={notification.read}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <NotificationMessage>{notification.text}</NotificationMessage>
          </NotificationItem>
        ))}
        <Button style={{ marginLeft: "8rem" }} onClick={onMarkAsRead}>
          Close
        </Button>
      </ModalContainer>
    </>
  );
};

export default NotificationsModal;

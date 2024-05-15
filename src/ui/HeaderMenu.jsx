import React, { useState } from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect } from "react";
import Logout from "../features/authentication/Logout";
import NotificationsModal from "./NotificationsModal";
import customFetch from "../utils/baseUrl";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const BellIcon = styled.span`
  position: relative;
`;
const NotificationCount = styled.span`
  position: absolute;
  top: -8px;
  right: -4.5px;
  background-color: #ff4d4f; /* Notification count background color */
  color: white; /* Notification count text color */
  border-radius: 50%;
  padding: 9px 3.5px;
  font-size: 12px;
  font-weight: bold;
`;

const HeaderMenu = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const entityData = { page: 1, limit: 3 };
      const response = await customFetch.post("/notification", entityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const data = response.data;

      if (data) {
        setNotification(data?.notifications);
      } else {
        console.error("Failed to fetch notifications:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };
  const handleMarkAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const entityData = { page: 1, limit: 3 };
      const response = await customFetch.patch(
        "/notification/all",
        entityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setShowNotifications((prev) => !prev);
    } catch (error) {}
  };
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={toggleNotifications}>
          <BellIcon>
            <BsBell />
            {notifications.length > 0 && (
              <NotificationCount>{notifications.length}</NotificationCount>
            )}
          </BellIcon>
        </ButtonIcon>
        {showNotifications && notifications.length > 0 && (
          <NotificationsModal
            notifications={notifications}
            onClose={toggleNotifications}
            onMarkAsRead={handleMarkAsRead}
          />
        )}
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;

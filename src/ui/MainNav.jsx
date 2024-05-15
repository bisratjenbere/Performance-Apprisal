import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import {
  FaBuilding,
  FaFolderOpen,
  FaUserPlus,
  FaCog,
  FaUserFriends,
  FaUsers,
  FaSearch,
  FaRegChartBar,
  FaChalkboardTeacher,
  FaChartBar,
  FaBookOpen,
  FaExclamationCircle,
} from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

import { MdPeople } from "react-icons/md";

import { HiOutlineLogout } from "react-icons/hi";
import { Assessment } from "@mui/icons-material";
import { Loop } from "@mui/icons-material";

import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const SubmenuContainer = styled.div`
  padding-left: 3.2rem;
`;

const SubmenuToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.hasGap ? "1.2rem" : "0")};
  cursor: pointer;
`;

const MainNav = () => {
  const { user } = useUser();

  const [isEvaluateOpen, setEvaluateOpen] = useState(false);
  const [isResultOpen, setResultOpen] = useState(false);

  const toggleEvaluateSubmenu = () => {
    setEvaluateOpen(!isEvaluateOpen);
    setResultOpen(false);
  };

  const toggleResultSubmenu = () => {
    setResultOpen(!isResultOpen);
    setEvaluateOpen(false);
  };

  const links = {
    admin: [
      { path: "/admin", title: "Home", icon: <HiOutlineHome /> },
      { path: "/admin/colleges", title: "Colleges", icon: <FaBuilding /> },
      {
        path: "/admin/departments",
        title: "Departments",
        icon: <FaFolderOpen />,
      },
      { path: "/admin/users", title: "Users", icon: <MdPeople /> },
      {
        path: "/admin/compalint",
        title: "Complaint",
        icon: <FaExclamationCircle />,
      },
    ],
    teamLeader: [
      { path: "/teamleader/dashboard", title: "Home", icon: <HiOutlineHome /> },

      { path: "/teamleader/Userss", title: "Add User", icon: <FaUserPlus /> },
    ],
    hr: [
      { path: "/hr/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/hr/user", title: "Add User", icon: <FaUserPlus /> },
      { path: "/hr/criteria", title: "Criterias", icon: <Assessment /> },
      { path: "/hr/cycle", title: "Cycle", icon: <Loop /> },
      { path: "/hr/users", title: "Users", icon: <FaUsers /> },
    ],
    head: [
      {
        path: "/head/courses",
        title: "Courses",
        icon: <FaChalkboardTeacher />,
      },
      { path: "/head/user", title: "Users", icon: <FaUsers /> },
      { path: "/head/report", title: "Report", icon: <FaFolderOpen /> },
    ],
    student: [
      { path: "/student/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/student/course", title: "Courses", icon: <FaBookOpen /> },
    ],
  };

  const commonSection = [
    {
      title: "Evaluate",
      icon: <FaChartBar />,
      submenu: [
        { path: "/evaluate/peer", title: "Peer", icon: <FaUserFriends /> },

        user.role !== "instructor" &&
          user.role !== "acadamic" &&
          user.role !== "assistance" &&
          user.role !== "adminstrative" && {
            path: "/evaluate/subordinate",
            title: "Subordinate",
            icon: <FaUsers />,
          },
        ,
        ...(user.role !== "head" &&
        user.role !== "dean" &&
        user.role !== "acadamic" &&
        user.role !== "instructor" &&
        user.role !== "head" &&
        user.role !== "assistance" &&
        user.role !== "director"
          ? [{ path: "/evaluate/self", title: "Self", icon: <FaUserFriends /> }]
          : []),
      ],
    },
  ];

  const commonSectiontwo = [
    {
      title: "Result",
      icon: <FaBookOpen />,
      submenu: [
        user.role === "director" ||
        user.role === "teamLeader" ||
        user.role === "dean" ||
        user.role === "head"
          ? {
              path: "/result/subbordinate-result",
              title: "Subordinate",
              icon: <FaUsers />, //
            }
          : [],
        {
          path: "/result/self-result",
          title: "Self",
          icon: <BsPerson />,
        },
      ],
    },
  ];
  const roleLinks = {
    admin: [...(links.admin || [])],
    teamLeader: [
      ...(links.teamLeader || []),
      ...commonSection,
      ...commonSectiontwo,
    ],
    hr: [...(links.hr || [])],
    head: [...(links.head || []), ...commonSection, ...commonSectiontwo],
    student: [...(links.student || [])],
    dean: [...(links.dean || []), ...commonSection, ...commonSectiontwo],
    director: [...commonSection, ...commonSectiontwo],
    instructor: [...commonSection, ...commonSectiontwo],
    assistance: [...commonSection, ...commonSectiontwo],
    acadamic: [...commonSection, ...commonSectiontwo],
    adminstrative: [...commonSection, ...commonSectiontwo],
  };

  return (
    <nav>
      <NavList>
        {(roleLinks[user.role] || []).map((link, index) => (
          <li key={index}>
            {link.submenu ? (
              <>
                <SubmenuToggle
                  onClick={
                    link.title === "Evaluate"
                      ? toggleEvaluateSubmenu
                      : toggleResultSubmenu
                  }
                >
                  <StyledNavLink to={link.path} activeClassName="active">
                    {link.icon}
                    <div>{link.title}</div>
                  </StyledNavLink>
                </SubmenuToggle>
                {link.title === "Evaluate" && isEvaluateOpen && (
                  <SubmenuContainer>
                    {link.submenu.map((sublink, subIndex) => (
                      <StyledNavLink
                        key={subIndex}
                        to={sublink.path}
                        activeClassName="active"
                      >
                        {sublink.icon}
                        {sublink.title}
                      </StyledNavLink>
                    ))}
                  </SubmenuContainer>
                )}
                {link.title === "Result" && isResultOpen && (
                  <SubmenuContainer>
                    {link.submenu.map((sublink, subIndex) => (
                      <StyledNavLink
                        key={subIndex}
                        to={sublink.path}
                        activeClassName="active"
                      >
                        {sublink.icon}
                        {sublink.title}
                      </StyledNavLink>
                    ))}
                  </SubmenuContainer>
                )}
              </>
            ) : (
              <StyledNavLink to={link.path} activeClassName="active">
                {link.icon}
                {link.title}
              </StyledNavLink>
            )}
          </li>
        ))}
      </NavList>
    </nav>
  );
};

export default MainNav;

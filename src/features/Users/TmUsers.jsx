import { useState } from "react";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";

import ButtonContainer from "../../ui/ButtonContainer";

import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";
const FadedButton = styled(Button)`
  opacity: 0.5;
  pointer-events: none;
`;

const TmUsers = ({ type, searchQuery }) => {
  const [evalutedUser, setEvalutedUser] = useState([]);
  const { user: currentUser } = useUser();

  const { collectionData: cycle } = useGet("cycles/active");
  const { collectionData: evalutionResult } = useGet("results");
  const navigate = useNavigate();

  let endPoint;
  endPoint =
    type === "peer"
      ? "users/peers"
      : `users/employees/${currentUser?.department._id}`;

  const { collectionData: users, isLoading, error } = useGet(endPoint);

  const isEvaluatedByCurrentUser = (userId) => {
    return evalutionResult.some(
      (result) =>
        result.evaluatedUserName === userId &&
        result.cycle === cycle?._id &&
        currentUser._id === result.evaluter
    );
  };

  const handleEvaluateBtnClick = (user) => {
    const intentData = {
      evalutedUserId: user.id,
      evaluterRole: currentUser.role,
      evalutionType: type,
    };
    const navigateToTmeval = (userData) => {
      navigate("/evaluate/user", {
        state: {
          evaluatedUser: { ...intentData },
        },
      });
    };
    const startDate = new Date(cycle?.startDate);
    const endDate = new Date(cycle?.endDate);
    const today = new Date();

    if (!(today >= startDate && today <= endDate)) {
      return alert(
        "Sorry, You are not allowed to give evaluation. Try again when the evaluation starts on ."
      );
    }
    if (cycle?.status === "active") navigateToTmeval(user);
    else
      alert(
        "The evaluation has not yet started. Please wait for the evaluation to begin ."
      );
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const row = params.row;

      const isEvaluated = isEvaluatedByCurrentUser(row.id);

      return (
        <ButtonContainer>
          {isEvaluated ? (
            <FadedButton size="small" variation="primary" disabled={true}>
              Evaluated
            </FadedButton>
          ) : (
            <Button
              size="small"
              variation="primary"
              onClick={() => handleEvaluateBtnClick(row)}
            >
              Evaluate
            </Button>
          )}
        </ButtonContainer>
      );
    },
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "lname", headerName: "Last Name", width: 150 },
    { field: "cemail", headerName: "Email", width: 220 },
    { field: "role", headerName: "Role", width: 220 },

    actionColumn,
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Employee Not Found with this department ID</p>;
  }
  let filteredUsers;
  if (searchQuery) {
    filteredUsers = users?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const { _id, firstName, lastName, role, email } = user;
      if (
        fullName.includes(searchQuery.toLowerCase()) ||
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return user;
    });
  } else {
    filteredUsers = users;
  }

  const rows =
    filteredUsers?.map((user, index) => {
      const {
        _id: id,
        firstName: fname,
        lastName: lname,
        email: cemail,
        role,
        department,
      } = user;

      return {
        id,
        fname,
        index,
        lname,
        cemail,
        role,
        department: department.departmentName,
      };
    }) || [];

  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default TmUsers;

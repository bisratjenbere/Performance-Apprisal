import Table from "../../ui/Table";

import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";

import { useUpdateEntity } from "../../hooks/useCustomeMutation";

import { Spinner } from "react-bootstrap";

const TmResultTable = ({ searchQuery }) => {
  const {
    collectionData: resultsToBeApproved,
    isLoading,
    error,
  } = useGet("results/department-result");
  const { updateEntity: updateResult } = useUpdateEntity({
    method: "patch",
    endpoint: "/results/approve-result",
    mutationKey: "[approve--user]",
    successMessage: " Approved  successfully",
    errorMessage: "Failed to Approve ",
    invalidateQueries: "results/department-result",
    redirectPath: "",
  });
  const handleUpdate = () => {};
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;

  const handleApprove = (id) => {
    updateResult(id, {});
  };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      const row = params.row;
      const isApprovedOrCompleted =
        row.evaluationStatus === "Approved" ||
        row.evaluationStatus === "Completed";
      return (
        <ButtonContainer>
          <Button
            style={{
              marginLeft: "1rem",
            }}
            size="small"
            variation="primary"
            disabled={isApprovedOrCompleted}
            onClick={() => handleApprove(row.id)}
          >
            {isApprovedOrCompleted ? "Approved" : "Approve"}
          </Button>
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
    { field: "fname", headerName: "First Name", width: 100 },
    { field: "lname", headerName: "Last Name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "evaluationStatus", headerName: "Status", width: 150 },
    { field: "totalResult", headerName: "Total Score", width: 130 },
    actionColumn,
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const resultilegeble = resultsToBeApproved.filter(
    (result) => result.totalResult
  );

  let filteredUsers;
  if (searchQuery) {
    filteredUsers = resultilegeble?.filter((result) => {
      const { firstName, lastName, email, role } = result.employee;
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const { evaluationStatus, totalResult } = result;
      const resultTOString = `${totalResult}`;
      if (
        fullName.includes(searchQuery.toLowerCase()) ||
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evaluationStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resultTOString.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return result;
    });
  } else {
    filteredUsers = resultilegeble;
  }

  const rows =
    filteredUsers?.map((result, index) => {
      const {
        _id: id,
        firstName: fname,
        lastName: lname,
        email,
        role,
      } = result.employee;

      return {
        id,
        fname,
        lname,
        role,
        email,
        index,
        evaluationStatus: result.evaluationStatus,
        totalResult: Math.round(result.totalResult),
      };
    }) || [];

  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default TmResultTable;

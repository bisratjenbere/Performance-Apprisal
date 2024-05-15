import Table from "../../ui/Table";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ResolveComplaintForm from "../../pages/Result/ResolveComplaintFrom";
const ComplaintTable = ({ searchQuery }) => {
  const { collectionData: users, isLoading, error } = useGet("users");
  const { collectionData: complaint } = useGet("complaints");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [resolvedComplaint, setResolvedComplaint] = useState(null);

  const handleOpenComplaintModal = () => {
    setShowComplaintModal(true);
  };

  const handleCloseComplaintModal = () => {
    setShowComplaintModal(false);
  };
  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;
  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const handleResolve = ({ id }) => {
    setResolvedComplaint(id);
    handleOpenComplaintModal();
  };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 350,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          <Button
            style={{
              marginLeft: "1rem",
            }}
            size="small"
            variation="secondary"
            onClick={() => openModal(row)}
          >
            View
          </Button>
          <Button
            style={{
              marginLeft: "1rem",
            }}
            size="small"
            variation="primary"
            onClick={() => handleResolve(row)}
          >
            Resolve
          </Button>
        </ButtonContainer>
      );
    },
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },

    { field: "cemail", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", type: "text", width: 150 },
    { field: "status", headerName: "Status", type: "text", width: 150 },
    { field: "issueDate", headerName: "Issue Date", width: 150 },
    actionColumn,
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  let filteredUsers;
  if (searchQuery) {
    filteredUsers = complaint?.filter((user) => {
      const { firstName, lastName, role, email } = user.userId;
      if (
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return user;
    });
  } else {
    filteredUsers = complaint;
  }

  const rows =
    (filteredUsers.userId &&
      filteredUsers?.map((user, index) => {
        if (user?.userId) {
          const {
            firstName: fname,
            lastName: lname,
            email: cemail,
            role,
          } = user?.userId;
          const id = user?._id;
          return {
            id,
            fname,
            lname,
            cemail,
            role,
            index,
            status: user.status,
            detail: user.detail,
            issueDate: formatDate(user?.issueDate),
          };
        }
      })) ||
    [];

  const modalContent = selectedComplaint && (
    <Modal
      onSubmit={closeModal}
      open={!!selectedComplaint}
      handleClose={closeModal}
    >
      <p>{selectedComplaint.detail}</p>
    </Modal>
  );

  return (
    <>
      <Table columns={columns} rows={rows} />
      {modalContent}

      <ResolveComplaintForm
        closeModal={handleCloseComplaintModal}
        open={showComplaintModal}
        id={resolvedComplaint}
      />
    </>
  );
};

export default ComplaintTable;

import Table from "../../ui/Table";

import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import Modal from "../../ui/Modal";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  useDeleteEntity,
  useUpdateEntity,
} from "../../hooks/useCustomeMutation";
import DeleteConfirmationDialog from "../../ui/Dialog";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
const UserTable = ({ searchQuery, type }) => {
  const { user } = useUser();
  const isAdmin = user.role === "admin";
  const navigate = useNavigate();
  let endpoint;

  if (type === "head") {
    endpoint = `users/alluser`;
  } else {
    endpoint = `users`;
  }
  const { collectionData: users, isLoading, error } = useGet(endpoint);

  const { deleteEntity: deleteUser } = useDeleteEntity({
    method: "delete",
    endpoint: "/users",
    mutationKey: "[delete--user]",
    successMessage: " User deleted successfully",
    errorMessage: "Failed to delete User",
    invalidateQueries: "users",
    redirectPath: "",
  });

  const { updateEntity: updateUser } = useUpdateEntity({
    method: "patch",
    endpoint: "/users",
    mutationKey: "[update-user]",
    successMessage: "User role updated successfully",
    errorMessage: "Failed to update user role",
    invalidateQueries: "users",
    redirectPath: "/admin/users",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [newRole, setNewRole] = useState("");
  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteUser(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleView = (row) => {
    navigate(`/user/UserInfo/${row.id}`, { state: row });
  };

  const handleUpdate = (user) => {
    setUpdateId(user.id);
    setCurrentRole(user.role);
    setOpenUpdateModal(true);
  };

  const handleUpdateRole = () => {
    if (newRole === currentRole)
      return toast.error(
        "Please choose a different role from the current one."
      );

    const data = {
      role: newRole,
    };

    updateUser(updateId, data);
    setOpenUpdateModal(false);
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);

    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 350,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          {isAdmin && (
            <>
              <Button
                size="small"
                variation="danger"
                onClick={() => handleDeleteBtnClick(row.id)}
              >
                Delete
              </Button>
              <Button
                style={{
                  marginLeft: "1rem",
                }}
                size="small"
                variation="primary"
                onClick={() => handleUpdate(row)}
              >
                Update
              </Button>
            </>
          )}
          {!isAdmin && (
            <Button
              style={{
                marginLeft: "1rem",
              }}
              size="small"
              variation="primary"
              onClick={() => handleView(row)}
            >
              View
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
    { field: "cemail", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", type: "text", width: 150 },
    actionColumn,
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p> No User Found with this department ID</p>;
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
  if (!isAdmin) {
    filteredUsers = filteredUsers?.filter(
      (user) =>
        user.role !== "student" && user.role !== "admin" && user.role !== "hr"
    );
  }
  const rows =
    filteredUsers?.map((user, index) => {
      const {
        _id: id,
        firstName: fname,
        lastName: lname,
        email: cemail,
        role,
      } = user;

      return { id, fname, lname, cemail, role, index };
    }) || [];

  return (
    <>
      {openUpdateModal && (
        <Modal
          title="Update User Role"
          open={openUpdateModal}
          handleClose={() => setOpenUpdateModal(false)}
          onSubmit={handleUpdateRole}
        >
          <TextField
            select
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="acadamic">Academic</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="director">Director</MenuItem>
            <MenuItem value="teamLeader">Team Leader</MenuItem>
            <MenuItem value="head">Head</MenuItem>
            <MenuItem value="dean">Dean</MenuItem>
            <MenuItem value="adminstrative">Administrative</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="assistance">Assistant</MenuItem>
          </TextField>
        </Modal>
      )}
      {showDeleteDialog && (
        <DeleteConfirmationDialog
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default UserTable;

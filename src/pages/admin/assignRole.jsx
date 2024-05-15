import React, { useState } from "react";
import { Field, Formik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { Spinner } from "react-bootstrap";
const AssignRole = () => {
  const navigate = useNavigate();
  const { updateEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/users/assign-role",
    mutationKey: "[update-role]",
    successMessage: "Role assigned and password sent via email successfully",
    errorMessage: "Failed to assign role",
    invalidateQueries: "users",
    redirectPath: "/admin/users",
    type: "many",
  });
  const [selectedRoles, setSelectedRoles] = useState({});
  const { collectionData: users, isLoading, error } = useGet("users");

  if (isLoading) return <Spinner />;
  const columns = [
    { field: "fname", headerName: "First Name", width: 200 },
    { field: "lname", headerName: "Last Name", width: 200 },
    { field: "cemail", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: (params) => (
        <Formik initialValues={{ role: "" }} onSubmit={() => {}}>
          <Field
            name={`${params.row.id}`}
            as={Select}
            fullWidth
            onChange={(e) => {
              const updatedRoles = { ...selectedRoles };
              updatedRoles[`${params.row.id}`] = e.target.value;
              setSelectedRoles(updatedRoles);
            }}
          >
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="acadamic">Acadamic</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="director">Director</MenuItem>
            <MenuItem value="teamLeader">Team Leader</MenuItem>
            <MenuItem value="head">Head</MenuItem>
            <MenuItem value="dean">Dean</MenuItem>
            <MenuItem value="adminstrative">Adminstrative</MenuItem>
            <MenuItem value="hr">Hr</MenuItem>
            <MenuItem value="assistance">Assistance</MenuItem>
          </Field>
        </Formik>
      ),
    },
  ];

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = users.filter((user) => user.role === undefined);

  const handleClick = async () => {
    updateEntity("", selectedRoles);
  };

  return (
    <>
      <Table
        columns={columns}
        rows={rows.map((row) => ({
          id: row._id,
          cemail: row.email,
          role: row.role,
          fname: row.firstName,
          lname: row.lastName,
        }))}
      />

      <Button
        style={{ width: "20rem", marginLeft: "40rem" }}
        variation="primary"
        size="medium"
        onClick={handleClick}
      >
        Save
      </Button>
    </>
  );
};

export default AssignRole;

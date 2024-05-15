import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGet } from "../../hooks/useGet";
import styled from "styled-components";
import Form from "../../ui/Form";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";

const StyledForm = styled(Form)`
  padding: 5px 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;
const AddCollege = ({ closeModal, open }) => {
  const { collectionData: users, isLoading, error } = useGet("users");

  const { addEntity: addCollege } = useAddEntity({
    method: "post",
    endpoint: "/colleges",
    mutationKey: "[add-college]",
    successMessage: "College added successfully",
    errorMessage: "Failed to add College",
    invalidateQueries: "colleges",
    redirectPath: "/admin/colleges",
  });
  const [formValues, setFormValues] = useState({
    Cname: "",
    Dnumber: "",
    Ccode: "",
    dean: "",
  });

  const formik = useFormik({
    initialValues: {
      Cname: "",
      Ccode: "",
      Dnumber: "",
      dean: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmitModal = async () => {
    try {
      if (
        !formik.isValid ||
        values.Cname == "" ||
        values.Ccode == "" ||
        values.dean === ""
      ) {
        return;
      }
      await addCollege({
        collegeName: values.Cname,
        collegeCode: values.Ccode,
        numberOfDepartment: +values.Dnumber,
        dean: values.dean,
      });
      closeModal();
    } catch (error) {
      console.error("Error adding college:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { values, touched, errors, handleChange, handleBlur } = formik;

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.role !== "head" ||
          user.role === "teamLeader" ||
          user.role === "dean"
      )
    : [];

  return (
    <Modal
      title="Add New College"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <StyledForm>
        <TextField
          name="Cname"
          label="College name"
          variant="outlined"
          fullWidth
          value={values.Cname}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.Cname && Boolean(errors.Cname)}
          helperText={touched.Cname && <ErrorText>{errors.Cname}</ErrorText>}
        />
        <TextField
          name="Ccode"
          label="College Code"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
          value={values.Ccode}
          onChange={handleChange}
          onBlur={handleBlur}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          error={touched.Ccode && Boolean(errors.Ccode)}
          helperText={touched.Ccode && <ErrorText>{errors.Ccode}</ErrorText>}
        />
        <TextField
          name="Dnumber"
          type="number"
          id="Dnumber"
          label="Number of Departments"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
          value={values.Dnumber}
          onChange={handleChange}
          onBlur={handleBlur}
          inputProps={{ style: { fontSize: "16px" }, min: "1" }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          error={touched.Dnumber && Boolean(errors.Dnumber)}
          helperText={
            touched.Dnumber && <ErrorText>{errors.Dnumber}</ErrorText>
          }
        />
        <TextField
          select
          name="dean"
          label="Dean"
          sx={{ marginBottom: "10px" }}
          variant="outlined"
          fullWidth
          value={values.dean}
          onChange={handleChange}
          onBlur={handleBlur}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          error={touched.dean && Boolean(errors.dean)}
          helperText={touched.dean && errors.dean}
        >
          {filteredUsers.map((user) => (
            <MenuItem
              key={user._id}
              value={`${user.firstName} ${user.lastName}`}
            >
              {`${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </TextField>
      </StyledForm>
    </Modal>
  );
};

export default AddCollege;

const validationSchema = Yup.object().shape({
  Cname: Yup.string()
    .min(2, "College name must be at least 2 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "College name must contain only letters and spaces"
    )
    .required("College name is required"),
  Ccode: Yup.string().matches(
    /^[a-zA-Z0-9]{2,}$/,
    "College code must contain only letters and numbers and be at least 2 characters long"
  ),
  Dnumber: Yup.number()
    .required("Number of departments is required")
    .positive("Number of departments must be positive")
    .integer("Number of departments must be an integer"),
  dean: Yup.string().required("Dean is required"),
});

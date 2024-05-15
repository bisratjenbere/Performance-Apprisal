import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Row from "../../ui/Row";

import Modal from "../../ui/Modal";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";

const AddStudentForm = ({ closeModal, open }) => {
  const [formValues, setFormValues] = useState({});
  const { addEntity: addNewStudent } = useAddEntity({
    method: "post",
    endpoint: "/users",
    mutationKey: "[add-students]",
    successMessage: "Student added successfully",
    errorMessage: "Failed to add student",
    invalidateQueries: "users",
    redirectPath: "/head/user",
  });
  const { user } = useUser();

  const handleSubmitModal = () => {
    const { firstName, lastName, email, section, batch, phoneNumber } =
      formValues;
    addNewStudent({
      firstName,
      lastName,
      email,
      section,
      batch,
      phoneNumber,
      role: "student",
    });
    closeModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Modal
      title="Add new Student"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
    >
      <form>
        <Row type="horizontal">
          <TextField
            name="firstName"
            label="First Name"
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
          />
        </Row>
        <Row type="horizontal">
          <TextField
            name="email"
            label="Email"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            type="email" // Type set to email
          />
          <TextField
            name="section"
            label="Section"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            type="number"
          />
        </Row>
        <Row type="horizontal">
          <TextField
            name="batch"
            label="Batch"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="number"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            type="tel"
          />
        </Row>
      </form>
    </Modal>
  );
};

const AddStudent = ({ closeModel, open }) => {
  return <AddStudentForm closeModal={closeModel} open={open} />;
};

export default AddStudent;

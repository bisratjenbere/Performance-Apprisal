import React from "react";
import Modal from "../../ui/Modal";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useFormik } from "formik";
import styled from "styled-components";
import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useGet } from "../../hooks/useGet";
import Form from "../../ui/Form";

const StyledForm = styled(Form)`
  padding: 5px 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
`;

const AddCycle = ({ closeModel, open }) => {
  const { collectionData: users, isLoading, error } = useGet("users");

  const { addEntity: addCycle } = useAddEntity({
    method: "post",
    endpoint: "/cycles",
    mutationKey: "[add-cycles]",
    successMessage: "Cycle added successfully",
    errorMessage: "Failed to add Cycle",
    invalidateQueries: "cycles",
    redirectPath: "/hr/cycle",
  });

  const [minEndDate, setMinEndDate] = useState("");

  const handleSubmitModal = async () => {
    try {
      closeModel();

      await addCycle(values);
    } catch (error) {
      console.error("Error adding cycle:", error);
    }
  };

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { values, touched, errors, handleChange, handleBlur } = formik;

  return (
    <Modal
      title="Add New Cycle"
      open={open}
      handleClose={closeModel}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <StyledForm>
        <TextField
          name="status"
          label="Status"
          select
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.status && Boolean(errors.status)}
          helperText={touched.status && errors.status}
          fullWidth
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
        >
          <MenuItem value="planned">Planned</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <TextField
          name="description"
          label="Description"
          variant="outlined"
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />

        <TextField
          name="startDate"
          variant="outlined"
          type="date"
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.startDate && Boolean(errors.startDate)}
          helperText={touched.startDate && errors.startDate}
          min={new Date().toISOString().split("T")[0]}
        />

        <TextField
          name="endDate"
          variant="outlined"
          type="date"
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.endDate && Boolean(errors.endDate)}
          helperText={touched.endDate && errors.endDate}
          min={minEndDate}
        />
      </StyledForm>
    </Modal>
  );
};

export default AddCycle;

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

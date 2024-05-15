import React from "react";
import { TextField, MenuItem } from "@mui/material";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useFormik } from "formik";
import Form from "../../ui/Form";
import * as Yup from "yup";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import Spinner from "../../ui/Spinner";
import { toast } from "react-hot-toast";
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

const AddDepartment = ({ closeModal, open }) => {
  const { collectionData: Colleges, isLoading, error } = useGet("colleges");
  const { addEntity: addNewDepartment } = useAddEntity({
    method: "post",
    endpoint: "/departments",
    mutationKey: "[add-department]",
    successMessage: "Department added successfully",
    errorMessage: "Failed to add Department ",
    invalidateQueries: "departments",
    redirectPath: "/admin/departments",
  });

  const formik = useFormik({
    initialValues: {
      Dname: "",
      Dcode: "",
      collegeId: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSubmitModal = async () => {
    try {
      if (
        !formik.isValid ||
        values.Dcode == "" ||
        values.Dname == "" ||
        values.collegeId === ""
      ) {
        return;
      }

      await addNewDepartment({
        departmentCode: values.Dcode,
        departmentName: values.Dname,
        collegeId: values.collegeId,
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
  }

  const { values, touched, errors, handleChange, handleBlur } = formik;
  return (
    <Modal
      title="Add New Department"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      onBlur={handleBlur}
      error={error}
      isLoading={isLoading}
    >
      <StyledForm>
        <TextField
          name="Dname"
          type="text"
          label="Department Name"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          error={touched.Dname && Boolean(errors.Dname)}
          helperText={touched.Dname && <ErrorText>{errors.Dname}</ErrorText>}
        />

        <TextField
          name="Dcode"
          type="text"
          label="Department Code"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          error={touched.Dcode && Boolean(errors.Dcode)}
          helperText={touched.Dcode && <ErrorText>{errors.Dcode}</ErrorText>}
        />

        <TextField
          select
          name="collegeId"
          label="College"
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        >
          {Colleges.map((college) => {
            return (
              <MenuItem key={college._id} value={college._id}>
                {college.collegeName}
              </MenuItem>
            );
          })}
        </TextField>
      </StyledForm>
    </Modal>
  );
};

export default AddDepartment;

const validationSchema = Yup.object({
  Dname: Yup.string()
    .min(2, "Department name must be at least 2 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Department name must contain only letters and spaces"
    )
    .required("Department name is required"),
  Dcode: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{2,}$/,
      "Department code must contain only letters and numbers and be at least 2 characters long"
    )
    .required("Department code is required"),
  collegeId: Yup.string().required("College is required"),
});

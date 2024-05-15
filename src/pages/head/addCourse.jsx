import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";
import styled from "styled-components";
import Form from "../../ui/Form";

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

const AddCourseForm = ({ closeModal, open }) => {
  const { addEntity: addNewCourse } = useAddEntity({
    method: "post",
    endpoint: "/courses",
    mutationKey: "[add-courses]",
    successMessage: "Course added successfully",
    errorMessage: "Failed to add Course",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
  });

  const { user } = useUser();
  const { collectionData: users, isLoading, error } = useGet("users");

  const formik = useFormik({
    initialValues: {
      Cname: "",
      Ccode: "",
      batch: "",
      semester: "",
      startDate: "",
      en: "",
      section: "",
      instructor: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const navigate = useNavigate();
  const handleSubmitModal = () => {
    const {
      Cname: name,
      Ccode: code,
      batch,
      instructor,
      semester,
      en: endDate,
      section,
      startDate: startDate,
    } = values;
    const department = user.department._id;

    addNewCourse({
      name,
      code,
      batch,
      instructor,
      semester,
      endDate,
      startDate,
      department,
      section,
    });
    closeModal();
  };

  if (isLoading) return <Spinner />;

  const { values, touched, errors, handleChange, handleBlur } = formik;

  const instructors = users.filter(
    (current) =>
      current.department === user.department._id &&
      ["instructor", "director", "head", "dean"].includes(current.role)
  );

  return (
    <Modal
      title="Add New Course"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <StyledForm>
        <Row>
          <Row type="horizontal">
            <TextField
              name="Cname"
              type="text"
              label="Course Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Cname && Boolean(errors.Cname)}
              helperText={
                touched.Cname && <ErrorText>{errors.Cname} </ErrorText>
              }
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />

            <TextField
              name="Ccode"
              type="text"
              label="Course Code"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.Ccode && Boolean(errors.Ccode)}
              helperText={
                touched.Ccode && <ErrorText>{errors.Ccode} </ErrorText>
              }
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
          </Row>
          <Row type="horizontal">
            <TextField
              name="batch"
              label="Batch"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.batch && Boolean(errors.batch)}
              helperText={
                touched.batch && <ErrorText>{errors.batch} </ErrorText>
              }
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />

            <TextField
              name="semester"
              type="number"
              label="Semester"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.semester && Boolean(errors.semester)}
              helperText={
                touched.semester && <ErrorText>{errors.semester} </ErrorText>
              }
              fullWidth
              inputProps={{
                min: "1",
                max: "2",
                style: { fontSize: "16px" },
              }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
          </Row>
          <Row type="horizontal">
            <TextField
              name="startDate"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={
                touched.startDate && <ErrorText>{errors.startDate} </ErrorText>
              }
              fullWidth
              inputProps={{
                style: { fontSize: "16px" },
                min: new Date().toISOString().split("T")[0],
              }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />

            <TextField
              name="en"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.en && Boolean(errors.en)}
              helperText={touched.en && <ErrorText>{errors.en} </ErrorText>}
              fullWidth
              inputProps={{
                style: { fontSize: "16px" },
              }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
          </Row>
          <Row type="horizontal">
            <TextField
              name="section"
              type="number"
              label="Section"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.section && Boolean(errors.section)}
              helperText={
                touched.section && <ErrorText>{errors.section}</ErrorText>
              }
              fullWidth
              inputProps={{
                style: { fontSize: "16px" },
              }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              InputProps={{
                inputProps: {
                  min: 1,
                  step: 1,
                },
              }}
            />

            <TextField
              name="instructor"
              Select
              select
              label="Instructor"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.instructor && Boolean(errors.instructor)}
              helperText={
                touched.instructor && <ErrorText>{errors.instructor}</ErrorText>
              }
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            >
              {instructors.map((instructor) => (
                <MenuItem key={instructor._id} value={instructor._id}>
                  {`${instructor.firstName} ${instructor.lastName}`}
                </MenuItem>
              ))}
            </TextField>
          </Row>
        </Row>
      </StyledForm>
    </Modal>
  );
};

const AddCourse = ({ closeModal, open }) => {
  return <AddCourseForm closeModal={closeModal} open={open} />;
};

export default AddCourse;

const validationSchema = Yup.object({
  Cname: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabetic characters and spaces are allowed"
    )
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  Ccode: Yup.string()
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Only alphabetic characters and numbers are allowed"
    )
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  batch: Yup.number()
    .required("Batch is required")
    .test("is-four-digits", "Batch must be a 4-digit number", (value) =>
      /^\d{4}$/.test(value)
    ),
  semester: Yup.number().required("Semester is required"),
  startDate: Yup.date().required("Start Date is required"),
  en: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
  section: Yup.number().required("Section is required"),
  instructor: Yup.string().required("Instructor is required"),
});

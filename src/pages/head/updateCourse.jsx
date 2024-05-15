import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { useUser } from "../../features/authentication/useUser";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";
const UpdateCourseModal = ({ open, handleClose, courseToUpdate }) => {
  const [formValues, setFormValues] = useState({});

  const { user } = useUser();
  const {
    collectionData: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGet("users");
  const { isLoading: updateLoading, updateEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/courses",
    mutationKey: "[update-course]",
    successMessage: "Course updated successfully",
    errorMessage: "Failed to update Course",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
  });

  useEffect(() => {
    setFormValues(courseToUpdate);
  }, [courseToUpdate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    let instructor;
    const {
      Cname: name,
      Ccode: code,
      batch,
      semester,
      en: endDate,
      startDate,
    } = formValues;

    const department = user.department.id;
    const id = courseToUpdate.id;

    if (courseToUpdate.instructor === formValues.instructor) {
      instructor = courseToUpdate.instId;
    } else {
      instructor = formValues.instructor;
    }
    const data = {
      name,
      code,
      batch,
      instructor,
      semester,
      endDate,
      startDate,
      department,
    };

    updateEntity(id, data);
    handleClose();
  };

  if (usersLoading) return <Spinner />;
  const instructorList = users.filter(
    (current) =>
      current.department === user.department._id &&
      current.role === "instructor"
  );

  return (
    <Modal
      title="Update Course"
      open={open}
      onSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <form>
        <Row>
          <TextField
            name="Cname"
            label="Course Name"
            value={formValues.Cname || ""}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="Ccode"
            label="Course Code"
            value={formValues.Ccode || ""}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px", width: "30rem" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="batch"
            label="Batch"
            type="number"
            value={formValues.batch || ""}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            variant="outlined"
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="semester"
            label="Semester"
            type="number"
            value={formValues.semester || ""}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="section"
            label="Section"
            type="number"
            value={formValues.section || ""}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
            variant="outlined"
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            value={formValues.startDate || ""}
            onChange={handleChange}
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
            variant="outlined"
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="en"
            label="End Date"
            type="date"
            value={formValues.en || ""}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            select
            name="instructor"
            label="Instructor"
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            defaultValue=""
            fullWidth
          >
            {instructorList.map((instrctor) => {
              return (
                <MenuItem key={instrctor._id} value={instrctor._id}>
                  {`${instrctor.firstName} ${instrctor.lastName}`}
                </MenuItem>
              );
            })}
          </TextField>
        </Row>
      </form>
    </Modal>
  );
};

export default UpdateCourseModal;

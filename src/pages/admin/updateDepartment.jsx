import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import { useGet } from "../../hooks/useGet";

const UpdateDepartmentModal = ({ open, handleClose, departmentToUpdate }) => {
  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    departmentCode: "",
    collegeId: "",
  });

  const {
    collectionData: colleges,
    isLoading: collegesLoading,
    error: collegesError,
  } = useGet("colleges");

  useEffect(() => {
    if (departmentToUpdate) {
      setDepartmentData({
        departmentName: departmentToUpdate.departmentName,
        departmentCode: departmentToUpdate.departmentCode,
        collegeId: departmentToUpdate.collegeId,
      });
    }
  }, [departmentToUpdate]);

  const { updateEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/departments",
    mutationKey: "[update-department]",
    successMessage: "Department updated successfully",
    errorMessage: "Failed to update Department",
    invalidateQueries: "departments",
    redirectPath: "/admin/departments",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { departmentName, departmentCode, collegeId } = departmentData;

    const updatedData = {
      departmentName,
      departmentCode,
      collegeId,
    };

    updateEntity(departmentToUpdate.id, updatedData);
    handleClose();
  };

  if (collegesLoading) return <p>Loading...</p>;
  if (collegesError) return <p>Error: {collegesError.message}</p>;

  return (
    <Modal
      width="130rem"
      title="Update Department"
      open={open}
      onSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <Row>
          <TextField
            name="departmentName"
            label="Department Name"
            value={departmentData.departmentName}
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
            name="departmentCode"
            label="Department Code"
            value={departmentData.departmentCode}
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
          <Select
            name="collegeId"
            label="College"
            value={departmentData.collegeId}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px", width: "30rem" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          >
            {colleges.map((college) => (
              <MenuItem key={college._id} value={college._id}>
                {college.collegeName}
              </MenuItem>
            ))}
          </Select>
        </Row>
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </Modal>
  );
};

export default UpdateDepartmentModal;

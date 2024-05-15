import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import { useGet } from "../../hooks/useGet";

const UpdateCollegeModal = ({ open, handleClose, collegeToUpdate }) => {
  console.log(collegeToUpdate);
  const [collegeData, setCollegeData] = useState({
    collegeName: "",
    collegeCode: "",
    numberOfDepartment: 0,
    dean: "",
  });

  const {
    collectionData: deans,
    isLoading: deansLoading,
    error: deansError,
  } = useGet("users");

  useEffect(() => {
    if (collegeToUpdate) {
      setCollegeData({
        collegeName: collegeToUpdate.collegeName,
        collegeCode: collegeToUpdate.collegeCode,
        numberOfDepartment: collegeToUpdate.numberOfDepartment,
        dean: collegeToUpdate.dean,
      });
    }
  }, [collegeToUpdate]);

  const { updateEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/colleges",
    mutationKey: "[update-college]",
    successMessage: "College updated successfully",
    errorMessage: "Failed to update College",
    invalidateQueries: "colleges",
    redirectPath: "/admin/colleges",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollegeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { collegeName, collegeCode, numberOfDepartment, dean } = collegeData;

    const updatedData = {
      collegeName,
      collegeCode,
      numberOfDepartment,
      dean,
    };

    updateEntity(collegeToUpdate.id, updatedData);
    handleClose();
  };

  if (deansLoading) return <p>Loading...</p>;
  if (deansError) return <p>Error: {deansError.message}</p>;

  return (
    <Modal
      width="130rem"
      title="Update College"
      open={open}
      onSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <Row>
          <TextField
            name="collegeName"
            label="College Name"
            value={collegeData.collegeName}
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
            name="collegeCode"
            label="College Code"
            value={collegeData.collegeCode}
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
            name="numberOfDepartment"
            type="number"
            label="Number of Departments"
            value={collegeData.numberOfDepartment}
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
          <Select
            name="dean"
            label="Dean"
            value={collegeData.dean}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px", width: "30rem" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          >
            {deans.map((user) => (
              <MenuItem
                key={user._id}
                value={`${user.firstName} ${user.lastName}`}
              >
                {`${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </Row>
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </Modal>
  );
};

export default UpdateCollegeModal;

import React, { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
const UpdateAppraisalCycleModal = ({ open, handleClose, cycleToUpdate }) => {
  const [updatedCycleData, setUpdatedCycleData] = useState({
    id: cycleToUpdate.id,
    status: cycleToUpdate.status,
    description: cycleToUpdate.description,
    startDate: cycleToUpdate.startDate,
    endDate: cycleToUpdate.endDate,
  });

  const StyledForm = styled.form`
    display: flex;
    width: 45rem;
    flex-direction: column;
  `;

  const StyledTextField = styled(TextField)`
    && {
      margin-bottom: 2.5rem;
      input {
        font-size: 1.5rem;
      }
      label {
        font-size: 1.5rem;
      }
    }
  `;
  const { updateEntity: updateAppraisalCycle } = useUpdateEntity({
    method: "patch",
    endpoint: `/cycles`,
    mutationKey: "[update-appraisal-cycle]",
    successMessage: "Appraisal cycle updated successfully",
    errorMessage: "Failed to update appraisal cycle",
    invalidateQueries: "appraisalcycles",
    redirectPath: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUpdatedCycleData({
      ...updatedCycleData,
      [name]: value,
    });
  };

  const handleUpdateCycle = () => {
    const id = updatedCycleData.id;
    const { startDate, endDate, description } = updatedCycleData;
    const data = { data: { startDate, endDate, description } };
    updateAppraisalCycle(id, data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Update Appraisal Cycle"
      onSubmit={handleUpdateCycle}
    >
      <StyledForm>
        <TextField
          select
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          value={updatedCycleData.status}
          onChange={handleInputChange}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
        >
          <MenuItem value="planned">planned</MenuItem>
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
        </TextField>
        <StyledTextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={updatedCycleData.description}
          onChange={handleInputChange}
        />
        <StyledTextField
          name="startDate"
          label="Start Date"
          variant="outlined"
          type="date"
          fullWidth
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
          value={updatedCycleData.startDate}
          onChange={handleInputChange}
        />

        <StyledTextField
          name="endDate"
          label="End Date"
          variant="outlined"
          type="date"
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
          fullWidth
          value={updatedCycleData.endDate}
          onChange={handleInputChange}
        />
      </StyledForm>
    </Modal>
  );
};

export default UpdateAppraisalCycleModal;

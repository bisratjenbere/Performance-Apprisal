import React, { useState } from "react";
import Modal from "../../ui/Modal";
import Textarea from "../../ui/Textarea";
import { TextField, MenuItem } from "@mui/material";
import { useAddEntity, useUpdateEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";
const ResolveComplaintForm = ({ closeModal, open, id }) => {
  const [complaintDetail, setComplaintDetail] = useState("");
  const [complaintStatus, setComplaintStatus] = useState("");
  const { user } = useUser();

  const { updateEntity: resolveComplaint } = useUpdateEntity({
    method: "patch",
    endpoint: "/complaints",
    mutationKey: "[patch-compalint]",
    successMessage: "complaint successfully resolved!",
    errorMessage: "Failed to resolve complaint",
    invalidateQueries: "complaints",
    redirectPath: "",
  });

  const handleSubmit = () => {
    resolveComplaint(id, {
      resolvedText: complaintDetail,
      status: complaintStatus,
    });
    setComplaintDetail("");
    closeModal();
  };

  const handleChange = (event) => {
    setComplaintDetail(event.target.value);
  };
  const handleStatusChange = (event) => {
    setComplaintStatus(event.target.value);
  };

  return (
    <Modal
      title="Resolve Complaint"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmit}
      width="80rem"
    >
      <label htmlFor="complaint-detail">Resolved Message</label>

      <Textarea
        id="complaint-detail"
        label="Complaint Detail"
        multiline
        value={complaintDetail}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        sx={{
          width: "100%",
          marginBottom: "10px",
          marginTop: "5px",
          resize: "vertical",
        }}
      />
      <TextField
        select
        name="status"
        label="Status"
        sx={{ marginBottom: "10px" }}
        inputProps={{ style: { fontSize: "16px" } }}
        InputLabelProps={{ style: { fontSize: "16px" } }}
        variant="outlined"
        fullWidth
        value={complaintStatus}
        onChange={handleStatusChange}
      >
        <MenuItem value="closed">Closed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="resolved">Resolved</MenuItem>
      </TextField>
    </Modal>
  );
};

export default ResolveComplaintForm;

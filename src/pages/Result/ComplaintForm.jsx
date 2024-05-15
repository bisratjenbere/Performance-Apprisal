import React, { useState } from "react";
import Modal from "../../ui/Modal";
import Textarea from "../../ui/Textarea";

import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";
const ComplaintForm = ({ closeModal, open }) => {
  const [complaintDetail, setComplaintDetail] = useState("");
  const [complaintStatus, setComplaintStatus] = useState("");
  const { user } = useUser();

  const { addEntity: addCompalint } = useAddEntity({
    method: "post",
    endpoint: "/complaints",
    mutationKey: "[add-compalint]",
    successMessage: "Your complaint has been successfully reported!",
    errorMessage: "Failed to Create complaint",
    invalidateQueries: "complaints",
    redirectPath: "",
  });

  const handleSubmit = () => {
    addCompalint({ detail: complaintDetail, userId: user._id });
    setComplaintDetail("");
    closeModal();
  };

  const handleChange = (event) => {
    setComplaintDetail(event.target.value);
  };

  return (
    <Modal
      title="Your Complaint"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmit}
      width="80rem"
    >
      <label htmlFor="complaint-detail">Complaint Detail:</label>
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
    </Modal>
  );
};

export default ComplaintForm;

import React, { useState } from "react";
import Modal from "../ui/Modal";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ExcelImportModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = () => {
    if (!file) {
      return;
    }

    onSuccess(file);
    onClose();
    setFile(null);
  };

  return (
    <Modal
      title="Import Courses"
      open={isOpen}
      handleClose={onClose}
      onSubmit={handleImportSubmit}
      isLoading={false}
      error={null}
    >
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="fileInput"
          style={{ display: "flex", alignItems: "center" }}
        >
          <CloudUploadOutlinedIcon style={{ marginRight: "8px" }} />
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          name="course"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </Modal>
  );
};

export default ExcelImportModal;

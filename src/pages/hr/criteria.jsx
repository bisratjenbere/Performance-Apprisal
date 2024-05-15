import React, { useState } from "react";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import CriteriaTable from "../../features/hr/criteriaTable";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Modal from "../../ui/Modal";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { MenuItem } from "@mui/material";
import { useAddEntity } from "../../hooks/useCustomeMutation";

const Criteria = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [evaluationType, setEvaluationType] = useState("");
  const [language, setLanguage] = useState("");

  const { addEntity: importCriteria } = useAddEntity({
    method: "post",
    endpoint: "/templetes/upload",
    mutationKey: "[add-templetes]",
    successMessage: "Templete Imported successfully",
    errorMessage: "Failed to Import Templete",
    invalidateQueries: "templetes",
    redirectPath: "/hr/criteria",
  });

  const handleImportModalOpen = () => {
    setIsImportModalOpen(true);
  };

  const handleImportModalClose = () => {
    setIsImportModalOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = () => {
    if (!file || !evaluationType || !language) {
      return;
    }
    const formData = new FormData();
    formData.append("course", file);
    formData.append("evaluationType", evaluationType);
    formData.append("language", language);

    importCriteria(formData);
    importCriteria({ file, evaluationType, language });
    setIsImportModalOpen(false);
    setFile(null);
    setEvaluationType("");
    setLanguage("");
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Appraisal Template</Heading>
        <Row type="horizontal">
          <Button>
            <Link to="/hr/addCriteria">Add Criteria</Link>
          </Button>
          <Button variation="secondary" onClick={handleImportModalOpen}>
            <CloudUploadOutlinedIcon style={{ marginRight: "8px" }} />
            Import
          </Button>
        </Row>
      </Row>
      <CriteriaTable />

      <Modal
        title="Import Appraisal Template"
        open={isImportModalOpen}
        handleClose={handleImportModalClose}
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

        <TextField
          name="evaluationType"
          select
          label="Evaluation Type"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "10px",
            marginLeft: "10px",
            width: "100%",
          }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={evaluationType}
          onChange={(e) => setEvaluationType(e.target.value)}
          style={{ marginBottom: "1rem" }}
        >
          <MenuItem value="">Select Criteria Type</MenuItem>
          <MenuItem value="student-to-instructor">
            Student-To-Instructor
          </MenuItem>
          <MenuItem value="head-to-instructor">Head-To-Instructor</MenuItem>
          <MenuItem value="team-leader-to-employee">
            Team-leader-to-employee
          </MenuItem>
          <MenuItem value="dean-to-head">Dean-To-Head</MenuItem>
          <MenuItem value="director-to-team-leader">
            Director-To-Team-Leader
          </MenuItem>
          <MenuItem value="self">Self</MenuItem>
          <MenuItem value="peer-academic-to-academic">
            Peer-Academic-To-Academic
          </MenuItem>
          <MenuItem value="peer-administrative-to-administrative">
            Peer-Administrative-To-Administrative
          </MenuItem>
          <MenuItem value="peer-instructor-to-instructor">
            Peer-Instructor-To-Instructor
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Language"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "10px",
            marginLeft: "10px",
            width: "100%",
          }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginBottom: "1rem" }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Amhric">Amharic</MenuItem>
        </TextField>
      </Modal>
    </>
  );
};

export default Criteria;

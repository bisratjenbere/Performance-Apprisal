//import { courses } from "../../data/course";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import CourseTable from "../../features/head/courseTable";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddCourse from "./addCourse";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Modal from "../../ui/Modal";
const StyledCollege = styled.div`
  height: max-content;
`;
const Courses = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const { addEntity: importCriteria } = useAddEntity({
    method: "post",
    endpoint: "/courses/upload",
    mutationKey: "[add-templetes]",
    successMessage: "courses Imported successfully",
    errorMessage: "Failed to Import courses",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
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
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("course", file);

    importCriteria(formData);

    setIsImportModalOpen(false);
    setFile(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <>
      {isAddModalOpen && (
        <AddCourse closeModal={closeAddModal} open={isAddModalOpen} />
      )}
      <StyledCollege>
        <Row type="horizontal">
          <Heading as="h1">All Courses</Heading>
          <Button style={{ marginLeft: "49rem" }} onClick={openAddModal}>
            Add Courses
          </Button>
          <Button variation="secondary" onClick={handleImportModalOpen}>
            <CloudUploadOutlinedIcon style={{ marginRight: "8px" }} />
            Import
          </Button>
        </Row>
        <Search
          onSearchChange={handleSearchChange}
          value={searchQuery}
          placeholder="Search for Course"
        />
        <CourseTable searchQuery={searchQuery} />
      </StyledCollege>

      <Modal
        title="Import Course"
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
      </Modal>
    </>
  );
};

export default Courses;

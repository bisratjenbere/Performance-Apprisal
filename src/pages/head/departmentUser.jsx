import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import UserTable from "../../features/Users/UserTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddStudent from "./AddStudentForm";
const DepartmentUser = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      {isAddModalOpen && (
        <AddStudent closeModel={closeAddModal} open={isAddModalOpen} />
      )}
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <Button style={{ marginLeft: "49rem" }} onClick={openAddModal}>
          Add Student
        </Button>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for User"
      />
      <UserTable type="head" searchQuery={searchQuery} />
    </>
  );
};

export default DepartmentUser;

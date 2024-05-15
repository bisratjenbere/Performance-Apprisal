import React, { useState } from "react";
import Search from "../../ui/Search";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import UserTable from "../../features/Users/UserTable";
import AddStudent from "./AddStudentForm";
const Users = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); //
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Users</Heading>
        <Button onClick={openAddModal}>Add Student</Button>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for Department"
      />
      <UserTable type="head" searchQuery={searchQuery} />
      {isAddModalOpen && (
        <AddStudent open={isAddModalOpen} closeModal={closeAddModal} />
      )}
    </>
  );
};

export default Users;

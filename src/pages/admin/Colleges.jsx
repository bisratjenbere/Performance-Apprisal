import React, { useState } from "react";
import Search from "../../ui/Search";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CollegeTable from "../../features/colleges/CollegeTable";
import AddCollege from "./addCollege";
const Colleges = () => {
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
        <Heading as="h1">All Colleges</Heading>
        <Button onClick={openAddModal}>Add College</Button>{" "}
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for Department"
      />
      <CollegeTable searchQuery={searchQuery} />
      {isAddModalOpen && (
        <AddCollege open={isAddModalOpen} closeModal={closeAddModal} />
      )}
    </>
  );
};

export default Colleges;

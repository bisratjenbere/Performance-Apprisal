import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import AppraisalCycleTable from "../../features/hr/CycleTable";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddCycle from "./addCycle";
const StyledCollege = styled.div`
  height: max-content;
`;
const Cycle = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
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
        <AddCycle closeModel={closeAddModal} open={isAddModalOpen} />
      )}
      <StyledCollege>
        <Row type="horizontal">
          <Heading as="h1">All Apprisal Cycle</Heading>

          <Button onClick={openAddModal}>Add New Cycle</Button>
        </Row>
        <Search
          onSearchChange={handleSearchChange}
          value={searchQuery}
          placeholder="Search for Cycle"
        />
        <AppraisalCycleTable searchQuery={searchQuery} />
      </StyledCollege>
    </>
  );
};

export default Cycle;

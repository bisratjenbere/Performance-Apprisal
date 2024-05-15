import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import UserTable from "../../features/Users/UserTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import ComplaintTable from "../../features/Users/ComplaintTable";

const Complaint = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Complaint</Heading>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for Complaint"
      />
      <ComplaintTable searchQuery={searchQuery} />
    </>
  );
};

export default Complaint;

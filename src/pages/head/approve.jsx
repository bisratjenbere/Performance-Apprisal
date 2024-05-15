import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import ReportTable from "../../features/Users/ReportTable";
import { Link } from "react-router-dom";
import { useState } from "react";

const Approve = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Students Yet Not Review Instructors</Heading>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for User"
      />
      <ReportTable searchQuery={searchQuery} />
    </>
  );
};

export default Approve;

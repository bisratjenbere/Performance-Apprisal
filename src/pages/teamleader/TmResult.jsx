import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";

import TmResultTable from "../../features/Users/TmResultTable";
import { useState } from "react";

const TmResult = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Users</Heading>
      </Row>
      <Search
        onSearchChange={handleChange}
        value={query}
        placeholder="Search for Result"
      />

      <TmResultTable />
    </>
  );
};

export default TmResult;

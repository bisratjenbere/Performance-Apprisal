import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";

import TmResultTable from "../../features/Users/TmResultTable";
import { useState } from "react";

const Subbordinateresult = () => {
  const [query, setQuery] = useState(null);

  const handleChange = (value) => {
    setQuery(value);
  };
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

      <TmResultTable searchQuery={query} />
    </>
  );
};

export default Subbordinateresult;

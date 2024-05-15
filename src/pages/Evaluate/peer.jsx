import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";

import TmUsers from "../../features/Users/TmUsers";
import { useState } from "react";

const peer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Peers</Heading>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for User"
      />

      <TmUsers type="peer" searchQuery={searchQuery} />
    </>
  );
};

export default peer;

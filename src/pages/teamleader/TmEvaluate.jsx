import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";

import TmUsers from "../../features/Users/TmUsers";

const TmEvaluate = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Users</Heading>
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for User"
      />

      <TmUsers searchQuery={searchQuery} />
    </>
  );
};

export default TmEvaluate;

import React from "react";
import ActionAreaCard from "../../ui/Card";
import Row from "../../ui/Row";

const Dashboard = () => {
  return (
    <Row type="horizontal">
      <ActionAreaCard icon="" title="Instructor" desc="5" />;
      <ActionAreaCard icon="" title="Student" desc="5" />;
      <ActionAreaCard icon="" title="Courses" desc="5" />;
    </Row>
  );
};

export default Dashboard;

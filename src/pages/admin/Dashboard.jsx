import { useGet } from "../../hooks/useGet";
import ActionAreaCard from "../../ui/Card";
import Row from "../../ui/Row";
import { HiOutlineUsers } from "react-icons/hi2";
import Chart from "../../ui/chart";
import Spinner from "../../ui/Spinner";

function Dashboard() {
  const { collectionData: users, isLoading: usersLoading } = useGet("users");
  const { collectionData: departments, isLoading: departmentsLoading } =
    useGet("departments");
  const { collectionData: colleges, isLoading: collegesLoading } =
    useGet("colleges");

  if (usersLoading || departmentsLoading || collegesLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <ActionAreaCard
          title="College"
          desc={`Total College-${colleges ? colleges.length : 0}`}
          icon={<HiOutlineUsers />}
        />
        <ActionAreaCard
          title="Department"
          desc={`Total Department-${departments ? departments.length : 0}`}
          icon={<HiOutlineUsers />}
        />
        <ActionAreaCard
          title="User"
          desc={`Total Users-${users ? users.length : 0}`}
          icon={<HiOutlineUsers />}
        />
      </Row>

      <Row>
        <Chart
          collegeData={colleges}
          departmentData={departments}
          userData={users}
        />
      </Row>
    </>
  );
}

export default Dashboard;

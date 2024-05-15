import Table from "../../ui/Table";

import { useGet } from "../../hooks/useGet";

import Spinner from "../../ui/Spinner";

const ReportTable = ({ searchQuery, type }) => {
  const { collectionData: evalutionResult } = useGet("results/detail");
  const { collectionData: users, isLoading, error } = useGet("users");
  const { collectionData: cycle } = useGet("cycles/active");
  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "lname", headerName: "Last Name", width: 150 },
    { field: "cemail", headerName: "Email", width: 250 },
    { field: "batch", headerName: "Batch", width: 100 },
    { field: "section", headerName: "Section", width: 100 },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  let filteredUsers;
  if (searchQuery) {
    filteredUsers = users?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const { _id, firstName, lastName, role, email, batch } = user;
      if (
        fullName.includes(searchQuery.toLowerCase()) ||
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return user;
    });
  } else {
    filteredUsers = users;
  }

  let filteredStudent = filteredUsers.filter((user) => user.role === "student");

  if (cycle) {
    filteredStudent = filteredStudent?.filter((student) => {
      return !evalutionResult?.some(
        (result) =>
          result.evaluter === student._id && cycle?._id === result?.cycle
      );
    });
  }

  const rows =
    filteredStudent?.map((user, index) => {
      const {
        _id: id,
        firstName: fname,
        lastName: lname,
        email: cemail,
        role,
        batch,
      } = user;
      const section = user?.section || 1;
      return { id, fname, lname, cemail, role, index, batch, section };
    }) || [];

  return <Table columns={columns} rows={rows} />;
};

export default ReportTable;

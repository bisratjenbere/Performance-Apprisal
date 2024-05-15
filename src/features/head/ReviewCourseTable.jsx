import { useEffect, useState } from "react";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import ButtonContainer from "../../ui/ButtonContainer";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";

import Spinner from "../../ui/Spinner";
const FadedButton = styled(Button)`
  opacity: 0.5;
  pointer-events: none;
`;

const TmUsers = ({ type }) => {
  const [evalutedUser, setEvalutedUser] = useState([]);
  const { user: currentUser } = useUser();
  const { collectionData: evalutionResult } = useGet("results/detail");
  const { collectionData: Courses, isLoading } = useGet(
    "courses/active-courses-for-student"
  );
  const { collectionData: cycle } = useGet("cycles/active");

  const navigate = useNavigate();

  const handleEvaluateBtnClick = (user) => {
    const intentData = {
      evalutedUserId: user.id,
      evaluterRole: currentUser.role,
      evalutionType: type,
    };
    const navigateToTmeval = (userData) => {
      navigate("/evaluate/user", {
        state: {
          evaluatedUser: { ...intentData },
        },
      });
    };

    if (cycle) navigateToTmeval(user);
    else
      alert(
        "The evaluation has not yet started. Please wait for the evaluation to begin ."
      );
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const row = params.row;

      const isEvaluated = isEvaluatedByCurrentUser(row);

      return (
        <ButtonContainer>
          {isEvaluated ? (
            <FadedButton
              size="small"
              variation="primary"
              disabled={true && instId}
            >
              Evaluated
            </FadedButton>
          ) : (
            <Button
              size="small"
              variation="primary"
              onClick={() => handleEvaluateBtnClick(row)}
            >
              {instId ? "Evaluate" : "Not Assigned"}
            </Button>
          )}
        </ButtonContainer>
      );
    },
  };

  let instId;
  if (isLoading) return <Spinner />;

  const isEvaluatedByCurrentUser = (row) => {
    return evalutionResult?.some((result) => {
      if (
        result.course &&
        result.evaluatedUserId === row.instId &&
        result.cycle === cycle?._id &&
        currentUser._id === result.evaluter &&
        result.course === row.id
      ) {
        return true;
      } else if (
        !result.course &&
        result.evaluatedUserId === row.instId &&
        result.cycle === cycle?._id &&
        currentUser._id === result.evaluter
      ) {
        return true;
      }
      return false;
    });
  };
  const getEvaluationStatus = (userId) => {
    if (isEvaluatedByCurrentUser(userId)) {
      return "Evaluated";
    } else {
      return "Not Evaluated";
    }
  };

  const rows =
    Courses?.map((course, index) => {
      const {
        _id: id,
        name: Cname,
        code: Ccode,
        isActive,
        semester,
        batch,
        endDate,
      } = course;

      const instructor = course.instructor
        ? `${course.instructor?.firstName} ${course?.instructor?.lastName}`
        : " not assigned";
      instId = course?.instructor?._id;
      return {
        id,
        Cname,
        index,
        semester,
        instId,
        Ccode,
        instructor,
        isActive,
        batch,
      };
    }) || [];

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "Cname", headerName: "Course Name", width: 250 },
    { field: "Ccode", headerName: "Code", width: 100 },
    {
      field: "instructor",
      headerName: "Instructor",
      type: "text",
      width: 120,
    },

    { field: "batch", headerName: "Batch", type: "text", width: 100 },
    { field: "semester", headerName: "Semester", type: "text", width: 100 },
    { field: "isActive", headerName: "Active", type: "text", width: 100 },

    actionColumn,
  ];
  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default TmUsers;

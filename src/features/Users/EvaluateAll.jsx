import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";

import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import reviewHelper from "../../utils/reviewHelper";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";

const EvaluateAll = ({ language }) => {
  const { collectionData: templetes, isLoading, error } = useGet("templetes");
  const { user: currentUser } = useUser();
  const [currentTemplete, setCurrentTemplete] = useState({});

  useEffect(() => {
    const filteredTemplete = templetes?.find(
      (templete) =>
        templete.evaluationType === evalutionProcessData.templete &&
        templete.language === language
    );

    setCurrentTemplete(filteredTemplete);
  }, [templetes, language]);

  const location = useLocation();
  const data = location.state?.evaluatedUser;
  let evalutedUserId, evaluterRole, evalutionType;

  if (data) {
    evalutedUserId = data.evalutedUserId;
    evaluterRole = data.evaluterRole;
    evalutionType = data.evalutionType;
  } else {
    evalutedUserId = currentUser._id;
    evaluterRole = currentUser.role;
    evalutionType = "self";
  }

  const evalutionProcessData = reviewHelper(
    evaluterRole,
    evalutionType,
    evalutedUserId
  );

  const { addEntity: saveEvalutionResult } = useAddEntity({
    method: "post",
    endpoint: evalutionProcessData.endPoint,
    mutationKey: `[evalute-user-${data?.id}]`,
    successMessage: "Thank you for your evaluation!",
    errorMessage: "Network Problem Please wait a minute.",
    invalidateQueries:
      evalutionType === "student" ? "results/detail" : "results",
    redirectPath: "",
  });

  const [evalutionResult, setEValutionResult] = useState([]);
  const ratingValuToBeUpdated = {};
  const handleClick = () => {
    const hasNullRating = evalutionResult.some(
      (result) => result.rating === null
    );

    const allQuestionsRated = evalutionResult?.length === rows?.length;
    if (hasNullRating) {
      alert("Please rate all questions before saving.");
    } else if (!allQuestionsRated) {
      alert("Please rate all questions before saving.");
    } else {
      const data = { evalData: evalutionResult, templete: currentTemplete._id };
      saveEvalutionResult(data)
        .then(() => {
          window.history.back();
        })
        .catch((error) => {
          alert("Failed to save data. Please try again.");
        });
    }
  };

  const handleRatingChange = (newValue, rowValue) => {
    const { id } = rowValue;

    const currentIndex = evalutionResult.findIndex(
      (result) => result.questionId === id
    );

    if (currentIndex !== -1) {
      const updatedResults = [...evalutionResult];
      updatedResults[currentIndex].rating = newValue;
      setEValutionResult(updatedResults);
    } else {
      const currentResult = { questionId: id, rating: newValue };
      setEValutionResult((prevRowRatings) => [
        ...prevRowRatings,
        currentResult,
      ]);
    }
    ratingValuToBeUpdated[`${id}`] = newValue;
  };

  const actionColumn = {
    field: "Rating",
    headerName: "Score",
    width: 150,
    renderCell: (params) => {
      const rowId = params.row.id;
      const index = params.row.index;
      const indexToBeUpdated = evalutionResult.findIndex((result) => {
        return result.id === rowId;
      });

      const ratingValue = ratingValuToBeUpdated[rowId];

      return (
        <Rating
          name={`rating-${index}`}
          value={ratingValue}
          onChange={(event, newValue) =>
            handleRatingChange(newValue, params.row)
          }
          size="large"
          sx={{
            "& .MuiRating-iconFilled": {
              color: ratingValue <= 2 ? "red" : "green",
            },
          }}
        />
      );
    },
  };

  const formatCriteria = (criteria) => {
    if (criteria?.length > 50) {
      return criteria.match(/.{1,50}(\s|$)/g).join("\n");
    }
    return criteria;
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    {
      field: "criteria",
      headerName: "Criteria",
      width: 800,
    },
    actionColumn,
  ];

  const questions = currentTemplete?.questions || [];

  const rows = questions.map((question, index) => {
    const { _id: id, criteria, category, weight } = question;
    return {
      id,
      index,
      criteria: formatCriteria(criteria),
      category,
      weight,
    };
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Table columns={columns} rows={rows} />

      <Row>
        <Button
          onClick={handleClick}
          style={{ marginLeft: "50%" }}
          size="large"
        >
          Save
        </Button>
      </Row>
    </>
  );
};

export default EvaluateAll;

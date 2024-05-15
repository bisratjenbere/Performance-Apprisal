import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useGet } from "../../hooks/useGet";

const Self = () => {
  const navigate = useNavigate();
  const { collectionData: cycle, isLoading, error } = useGet("cycles/active");

  useEffect(() => {
    if (!isLoading && !error) {
      if (cycle) {
        navigate("/evaluate/user");
      } else {
        alert(
          "The evaluation has not yet started. Please wait for the evaluation to begin."
        );
      }
    }
  }, [cycle, isLoading, error, navigate]);

  return isLoading ? <Spinner /> : null;
};

export default Self;

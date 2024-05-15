import React from "react";
import EvaluationBarChart from "../../features/EvaluationBarChart";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";

const HRDashboard = () => {
  const { collectionData, isLoading } = useGet("results/anlytics");

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Evaluation Scores Distribution</h2>
      </div>
      <EvaluationBarChart data={collectionData} />
    </div>
  );
};

export default HRDashboard;

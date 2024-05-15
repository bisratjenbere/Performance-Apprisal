import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceComparisonChart = ({ performanceData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="byPeer" name="Peer Evaluation" fill="#8884d8" />
        <Bar dataKey="bySelf" name="Self-Evaluation" fill="#82ca9d" />
        <Bar dataKey="byDirector" name="Director Evaluation" fill="#ffc658" />
        <Bar
          dataKey="byTeamLeader"
          name="Team Leader Evaluation"
          fill="#ff7f0e"
        />
        <Bar dataKey="byHead" name="Head Evaluation" fill="#d62728" />
        <Bar dataKey="byDean" name="Dean Evaluation" fill="#9467bd" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceComparisonChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ collegeData, departmentData, userData }) => {
  const collegeCount = collegeData ? collegeData.length : 0;
  const departmentCount = departmentData ? departmentData.length : 0;
  const userCount = userData ? userData.length : 0;

  const data = [
    { name: "Colleges", value: collegeCount },
    { name: "Departments", value: departmentCount },
    { name: "Users", value: userCount },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

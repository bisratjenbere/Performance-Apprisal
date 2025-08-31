import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField, MenuItem } from "@mui/material";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";
import EmployeeResult from "../Result/EmployeeResult";

const Report = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;

  .label-value {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .label {
      font-weight: bold;
      color: #333333;
    }

    .value {
      color: #666666;
    }

    .separator {
      flex: 1;
      height: 1px;
      background-color: #e0e0e0;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

const DownloadButton = styled(Button)`
  background-color: #4caf50;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const UserInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const [showResult, setShowResult] = useState(false);
  const [formValues, setFormValues] = useState({ cycle: "" });
  const [resultData, setResultData] = useState([]);

  const { collectionData: userToBeDisplayed } = useGet(`users/${id}`);
  const { collectionData: employees, isLoading } = useGet("users/alluser");
  const { collectionData: AppraisalCycles } = useGet("cycles");

  let userDetails = {
    fullName: "",
    email: "",
    startingDay: "",
    age: "",
    gender: "",
    phoneNumber: "",
    college: "",
    department: "",
    address: "",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setShowResult(true);
  };

  const [mainTabValue, setMainTabValue] = useState("1");
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };

  const formatedDate = (dateOfJoining) => {
    const date = new Date(dateOfJoining);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) return <Spinner />;

  if (userToBeDisplayed) {
    const fullName = `${userToBeDisplayed?.firstName} ${userToBeDisplayed?.lastName}`;
    const email = userToBeDisplayed?.email;
    const age = userToBeDisplayed?.age;
    const startingDay = formatedDate(userToBeDisplayed?.dateOfJoining);
    const gender = userToBeDisplayed?.gender;
    const phoneNumber = userToBeDisplayed?.phone;
    const address = userToBeDisplayed?.address;
    const department = userToBeDisplayed?.department?.departmentName;
    const college = userToBeDisplayed?.college?.collegeName;
    userDetails = {
      fullName,
      email,
      age,
      startingDay,
      gender,
      phoneNumber,
      address,
      department,
      college,
    };
  }

  const isLastTab = mainTabValue === "2";

  // Disabled PDF download for now
  const handleDownload = async () => {
    alert("PDF download is temporarily disabled.");
  };

  return (
    <TabContext value={mainTabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          sx={{ "& .MuiTab-root": { fontSize: "1.25rem" } }}
          onChange={handleMainTabChange}
          aria-label="User Information Tabs"
        >
          <Tab label="Personal Information" value="1" />
          <Tab label="Evaluation Result" value="2" />
        </TabList>
      </Box>

      {/* Personal Info */}
      <TabPanel value="1">
        <Report>
          <div className="label-value">
            <span className="label">Full Name:</span>
            <span className="value">{userDetails?.fullName}</span>
          </div>
          <div className="separator"></div>
          <div className="label-value">
            <span className="label">Email:</span>
            <span className="value">{userDetails?.email}</span>
          </div>
          <div className="separator"></div>
          <div className="label-value">
            <span className="label">Starting Day:</span>
            <span className="value">{userDetails?.startingDay}</span>
          </div>
          <div className="separator"></div>
          <div className="label-value">
            <span className="label">Age:</span>
            <span className="value">{userDetails?.age}</span>
          </div>
          <div className="label-value">
            <span className="label">Gender:</span>
            <span className="value">{userDetails?.gender}</span>
          </div>
          <div className="label-value">
            <span className="label">Phone Number:</span>
            <span className="value">{userDetails?.phoneNumber}</span>
          </div>
          <div className="label-value">
            <span className="label">College:</span>
            <span className="value">{userDetails?.college}</span>
          </div>
          <div className="label-value">
            <span className="label">Department:</span>
            <span className="value">{userDetails?.department}</span>
          </div>
          <div className="label-value">
            <span className="label">Address:</span>
            <span className="value">{userDetails?.address}</span>
          </div>
        </Report>
      </TabPanel>

      {/* Evaluation Result */}
      <TabPanel value="2">
        <Report>
          <TextField
            select
            label="Appraisal Cycle"
            fullWidth
            name="cycle"
            value={formValues.cycle}
            style={{
              fontSize: "1.2rem",
              display: "block",
              marginBottom: "20px",
              width: "50%",
            }}
            onChange={handleChange}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
          >
            {AppraisalCycles?.map((cycle) => (
              <MenuItem key={cycle?._id} value={cycle._id}>
                {cycle?.description}
              </MenuItem>
            ))}
          </TextField>

          {showResult && (
            <EmployeeResult
              setResultData={setResultData}
              cycleId={formValues.cycle}
              userId={id}
            />
          )}

          {isLastTab && (
            <DownloadButton
              disabled={resultData.length === 0}
              onClick={handleDownload}
            >
              Download as PDF
            </DownloadButton>
          )}
        </Report>
      </TabPanel>
    </TabContext>
  );
};

export default UserInfo;

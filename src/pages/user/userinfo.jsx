import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useLocation } from "react-router-dom";

import { saveAs } from "file-saver";
import {
  Document,
  PDFViewer,
  BlobProvider,
  Page,
  Image,
  pdf,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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
    gap: "10rem";
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
const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 50,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  userInfo: {
    fontSize: 14,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  score: {
    fontSize: 14,
  },
  rank: {
    fontSize: 14,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  header: {
    flexDirection: "column" /* Changed from "row" */,
    alignItems: "center" /* Centering horizontally */,
    justifyContent: "center" /* Centering vertically */,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  universityName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  tableCell: {
    fontSize: 12,
    padding: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

const UserInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const [showResult, setShowResult] = useState(false);
  const [formValues, setFormValues] = useState({
    cycle: "",
  });
  const [resultData, setResultData] = useState([]);
  const { collectionData: userToBeDisplayed } = useGet(`users/${id}`);
  const { collectionData: employees, isLoading } = useGet("users/alluser");
  const { collectionData: AppraisalCycles, error } = useGet("cycles");
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

  const UniversityLogo = () => (
    <Image src="../../../public/logo-light.png" style={styles.logo} />
  );

  const UniversityName = () => (
    <Text style={styles.universityName}>WOLKITE UNIVERSITY</Text>
  );

  const [mainTabValue, setMainTabValue] = useState("1");
  const [nestedTabValue, setNestedTabValue] = useState("3");
  const [selectedYear, setSelectedYear] = useState("");
  const formatedDate = (dateOfJoining) => {
    const dateString = dateOfJoining;
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
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
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };

  const handleNestedTabChange = (event, newValue) => {
    setNestedTabValue(newValue);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const isLastTab = mainTabValue === "2";
  const handleDownload = async () => {
    if (resultData.length > 0) {
      const pdfContent = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <UniversityLogo />
              <UniversityName />
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Evaluation Result</Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Full Name:</Text>
                <Text style={styles.userInfo}>{userDetails.fullName}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>College:</Text>
                <Text style={styles.userInfo}>{userDetails.college}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>Department:</Text>
                <Text style={styles.userInfo}>{userDetails.department}</Text>
              </View>
              <View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Name</Text>
                    <Text style={styles.tableHeader}>Score</Text>
                    <Text style={styles.tableHeader}>Rank</Text>
                  </View>

                  {resultData.map(
                    (entry, index) =>
                      entry.name !== undefined &&
                      entry.score !== undefined &&
                      entry.rank !== undefined && (
                        <View key={index} style={styles.tableRow}>
                          <Text style={styles.tableCell}>{entry.name}</Text>
                          <Text style={styles.tableCell}>{entry.score}</Text>
                          <Text style={styles.tableCell}>{entry.rank}</Text>
                        </View>
                      )
                  )}
                </View>
                <Text style={styles.total}>
                  Total Score: {resultData[3]?.total}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(pdfContent).toBlob();

      if (blob) {
        saveAs(blob, "result.pdf");
      }
    }
  };

  return (
    <TabContext value={mainTabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.25rem",
            },
          }}
          onChange={handleMainTabChange}
          aria-label="User Information Tabs"
        >
          <Tab label="Personal Information" value="1" />
          <Tab label="Evaluation Result" value="2" />
        </TabList>
      </Box>
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
      <TabPanel value="2">
        <Report>
          <TextField
            select
            label="Apprisal Cycle"
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
            {AppraisalCycles?.map((cycle) => {
              return (
                <MenuItem key={cycle?._id} value={cycle._id}>
                  {cycle?.description}
                </MenuItem>
              );
            })}
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

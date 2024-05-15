import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form, Field } from "formik";
import Button from "../../ui/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import { useGet } from "../../hooks/useGet";
import { Spinner } from "react-bootstrap";
import { useAddEntity } from "../../hooks/useCustomeMutation";

const Userss = () => {
  const { collectionData: departments, error } = useGet("departments");
  const { isLoading, collectionData: colleges } = useGet("colleges");
  const { addEntity } = useAddEntity({
    method: "post",
    endpoint: "/users/signUp",
    mutationKey: "[add-new-employee]",
    successMessage: "Employee added successfully",
    errorMessage: "Failed to add Employee",
    invalidateQueries: "users",
  });

  const [value, setValue] = useState("1");
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    salutation: "",
    date: "",
    experience: "",
    age: "",
    gender: "",
    status: "",
    phone: "",
    pemail: "",
    cemail: "",
    department: "",
    college: "",
    designation: "",
    address: "",
    branch: "Main",
    role: null,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isLastTab = value === "3";

  const saveUser = async (values) => {
    const {
      fname: firstName,
      lname: lastName,
      salutation: salutation,
      date: dateOfJoining,
      experience: experience,
      age,
      gender,
      phone,
      pemail: email,
      cemail: companyEmail,
      department,
      college,
      designation,
      address,
      branch,
    } = formValues;

    addEntity({
      branch,
      designation,
      college,
      department,
      companyEmail,
      email,
      phone,
      gender,
      age,
      experience,
      dateOfJoining,
      salutation,
      lastName,
      firstName,
    });

    setFormValues({
      fname: "",
      lname: "",
      salutation: "",
      date: "",
      experience: "",
      age: "",
      gender: "",
      status: "",
      phone: "",
      pemail: "",
      cemail: "",
      department: "",
      college: "",
      designation: "",
      address: "",
      branch: "Main",
      role: null,
    });
  };
  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Formik
        initialValues={formValues}
        onSubmit={(values, { setSubmitting }) => {
          saveUser(values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  sx={{
                    "& .MuiTab-root": {
                      fontSize: "1.25rem",
                    },
                  }}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Overview" value="1" />
                  <Tab label="Address And Contact" value="2" />
                  <Tab label="User Details" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Row>
                  <Row type="horizontal">
                    <TextField
                      name="fname"
                      label="First Name"
                      variant="outlined"
                      onChange={handleFieldChange}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      fullWidth
                    />
                    <TextField
                      name="lname"
                      onChange={handleFieldChange}
                      label="Last Name"
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    />
                  </Row>
                  <Row type="horizontal">
                    <TextField
                      select
                      name="salutation"
                      label="Salutation"
                      onChange={handleFieldChange}
                      sx={{ marginBottom: "10px", width: "70%" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                      <MenuItem value="Prof.">Prof.</MenuItem>
                      <MenuItem value="Assoc. Prof.">Assoc. Prof.</MenuItem>

                      <MenuItem value="Sir">Sir</MenuItem>
                    </TextField>
                    <TextField
                      name="date"
                      label="Joining Date"
                      type="date"
                      onChange={handleFieldChange}
                      inputProps={{
                        style: { fontSize: "16px", marginBottom: "10px" },
                      }}
                      InputLabelProps={{
                        style: { fontSize: "16px" },
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Row>

                  <Row type="horizontal">
                    <TextField
                      name="age"
                      onChange={handleFieldChange}
                      label="Age"
                      type="number"
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      select
                      name="gender"
                      onChange={handleFieldChange}
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      label="Gender"
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  </Row>
                  <Row type="horizontal">
                    <TextField
                      name="experience"
                      label="Experience"
                      type="number"
                      onChange={handleFieldChange}
                      variant="outlined"
                      sx={{ marginBottom: "10px", width: "50%" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      fullWidth
                    />
                  </Row>
                </Row>
              </TabPanel>
              <TabPanel value="2">
                <Row>
                  <Row type="horizontal">
                    <TextField
                      name="phone"
                      type="number"
                      onChange={handleFieldChange}
                      label="Phone Number"
                      variant="outlined"
                      sx={{
                        marginBottom: "10px",
                        marginLeft: "2rem",
                        width: "75%",
                      }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      fullWidth
                    />
                  </Row>
                  <Row type="horizontal">
                    <TextField
                      name="pemail"
                      onChange={handleFieldChange}
                      sx={{
                        marginBottom: "10px",
                        marginLeft: "2rem",
                        width: "75%",
                      }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      label="Personal Email"
                      variant="outlined"
                      fullWidth
                    />
                  </Row>
                  <Row type="horizontal">
                    <TextField
                      name="cemail"
                      onChange={handleFieldChange}
                      label="Company Email"
                      sx={{
                        marginBottom: "10px",
                        marginLeft: "2rem",
                        width: "75%",
                      }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    />
                  </Row>
                </Row>
              </TabPanel>
              <TabPanel value="3">
                <Row>
                  <Row type="horizontal">
                    <TextField
                      select
                      name="department"
                      label="department"
                      onChange={handleFieldChange}
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    >
                      {departments?.map((dep) => {
                        return (
                          <MenuItem key={dep._id} value={dep._id}>
                            {dep.departmentName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                    <TextField
                      select
                      name="branch"
                      onChange={handleFieldChange}
                      label="Branch"
                      sx={{ marginBottom: "10px", width: "50%" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    >
                      <MenuItem value="Main">Main</MenuItem>
                      <MenuItem value="Cluster">Cluster</MenuItem>
                      <MenuItem value="Butajir">Butajir</MenuItem>
                    </TextField>
                  </Row>
                  <Row type="horizontal">
                    <TextField
                      name="designation"
                      label="Designation"
                      onChange={handleFieldChange}
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      variant="outlined"
                      fullWidth
                    />

                    <TextField
                      name="address"
                      onChange={handleFieldChange}
                      sx={{ marginBottom: "10px" }}
                      inputProps={{ style: { fontSize: "16px" } }}
                      InputLabelProps={{ style: { fontSize: "16px" } }}
                      label="Address"
                      variant="outlined"
                      fullWidth
                    />
                  </Row>
                </Row>

                {isLastTab && <Button type="submit">Save changes</Button>}
              </TabPanel>
            </TabContext>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Userss;

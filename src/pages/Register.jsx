import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import Spinner from "../ui/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const { collectionData: departments } = useGet("departments");
  const { collectionData: colleges, isLoading } = useGet("colleges");

  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
    pnumber: "",
    batch: "",
    college: "",
    department: "",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    navigate("/login");
  };
  if (isLoading) return <Spinner />;
  return (
    <Formik
      initialValues={formValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        handleLogin();
      }}
    >
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Registration Form
          </h1>
          <TextField
            name="fname"
            label="First Name"
            variant="outlined"
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="lname"
            label="Last Name"
            variant="outlined"
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="date"
            label="Date of Joining"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="pnumber"
            label="Phone Number"
            variant="outlined"
            onChange={handleFieldChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="batch"
            label="Batch"
            onChange={handleFieldChange}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {[2012, 2013, 2014, 2015, 2016].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            name="college"
            label="College"
            onChange={handleFieldChange}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {colleges.map((college) => (
              <MenuItem key={college._id} value={college._id}>
                {college.collegeName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            name="department"
            label="Department"
            onChange={handleFieldChange}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {departments.map((department) => (
              <MenuItem key={department._id} value={department._id}>
                {department.departmentName}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Register;

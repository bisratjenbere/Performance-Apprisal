import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form, Field } from "formik";
import Button from "../../ui/Button";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import { useGet } from "../../hooks/useGet";
import { Spinner } from "react-bootstrap";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import * as Yup from "yup";

const User = () => {
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
    phone: "",
    pemail: "",
    cemail: "",
    department: "",
    designation: "",
    address: "",
    branch: "",
    role: null,
  });

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Main");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setSelectedDepartment(formValues.department);
    setSelectedBranch(formValues.branch);
    setSelectedGender(formValues.gender);
  }, [formValues]);

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

  const saveUser = async (values, { setSubmitting }) => {
    try {
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
        designation,
        address,
        branch,
      } = values;

      await addEntity({
        branch,
        designation,
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
        address,
      });

      setFormValues({
        ...formValues,
        fname: "",
        lname: "",
        salutation: "",
        date: "",
        experience: "",
        age: "",
        gender: "",
        phone: "",
        pemail: "",
        cemail: "",
        department: "",
        designation: "",
        address: "",
        branch: "Main",
        role: null,
      });

      setSubmitting(false);
    } catch (error) {
      console.error("Error saving user:", error);
      // Handle error here, if necessary
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          saveUser(values, { setSubmitting })
        }
      >
        {({ errors, touched }) => (
          <Form>
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
                <Box>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="fname"
                        placeholder="First Name"
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {errors.fname && touched.fname && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.fname}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="lname"
                        placeholder="Last Name"
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                          marginLeft: "1.5rem",
                        }}
                      />
                      {errors.lname && touched.lname && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "-16px",
                            left: "15px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.lname}
                        </Box>
                      )}
                    </Box>
                  </Row>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="salutation"
                        as="select"
                        sx={{ marginBottom: "10px", width: "70%" }}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      >
                        <option value="" disabled>
                          Select Salutation
                        </option>{" "}
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Assoc. Prof.">Assoc. Prof.</option>
                        <option value="Sir">Sir</option>
                      </Field>
                      {errors.salutation && touched.salutation && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.salutation}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="date"
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                          marginLeft: "1.5rem",
                        }}
                      />
                      {errors.date && touched.date && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.date}
                        </Box>
                      )}
                    </Box>
                  </Row>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="age"
                        placeholder="Age"
                        type="number"
                        min="18"
                        max="65"
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {errors.age && touched.age && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.age}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "2.5rem",
                      }}
                    >
                      <Field
                        name="gender"
                        as="select"
                        sx={{ marginBottom: "10px", width: "70%" }}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                          marginLeft: "1.5rem",
                        }}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      {errors.gender && touched.gender && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.gender}
                        </Box>
                      )}
                    </Box>
                  </Row>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name="experience"
                        placeholder="Experience"
                        type="number"
                        min="0"
                        // onChange={handleFieldChange}
                        style={{
                          width: "50%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {errors.experience && touched.experience && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.experience}
                        </Box>
                      )}
                    </Box>
                  </Row>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box>
                  <Row>
                    <Row type="horizontal">
                      <Box
                        sx={{
                          position: "relative",
                          width: "50%",
                          marginBottom: "2rem",
                        }}
                      >
                        <Field
                          name="phone"
                          placeholder="Phone Number"
                          style={{
                            width: "100%",
                            height: "50px",
                            fontSize: "16px",
                          }}
                        />
                        {errors.phone && touched.phone && (
                          <Box
                            sx={{
                              bottom: "-16px",
                              color: "red",
                              fontSize: "12px",
                            }}
                          >
                            {errors.phone}
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "50%",
                          marginBottom: "10px",
                        }}
                      >
                        <Field
                          name="pemail"
                          placeholder="Personal Email"
                          style={{
                            width: "100%",
                            height: "50px",
                            fontSize: "16px",
                            marginLeft: "2rem",
                          }}
                        />
                        {errors.pemail && touched.pemail && (
                          <Box
                            sx={{
                              bottom: "-16px",
                              color: "red",
                              fontSize: "12px",
                            }}
                          >
                            {errors.pemail}
                          </Box>
                        )}
                      </Box>
                    </Row>
                  </Row>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <Field
                        name="cemail"
                        placeholder="Company Email"
                        sx={{
                          marginBottom: "10px",
                          marginLeft: "2rem",
                          width: "75%",
                        }}
                        style={{
                          width: "50%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {errors.cemail && touched.cemail && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.cemail}
                        </Box>
                      )}
                    </Box>
                  </Row>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name="department"
                        as="select"
                        placeholder="Department"
                        sx={{ marginBottom: "10px", width: "70%" }}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {departments?.map((dep) => {
                          return (
                            <option key={dep._id} value={dep._id}>
                              {dep.departmentName}
                            </option>
                          );
                        })}
                      </Field>

                      {errors.department && touched.department && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.department}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name="branch"
                        as="select"
                        placeholder="Branch"
                        sx={{ marginBottom: "10px", width: "70%" }}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      >
                        <option value="" disabled>
                          Select Branch
                        </option>
                        <option value="Main">Main</option>
                        <option value="Cluster">Cluster</option>
                        <option value="Butajir">Butajir</option>
                      </Field>

                      {errors.branch && touched.branch && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.branch}
                        </Box>
                      )}
                    </Box>
                  </Row>
                  <Row type="horizontal">
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name="designation"
                        placeholder="Designation"
                        // onChange={handleFieldChange}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                      />
                      {errors.designation && touched.designation && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.designation}
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "50%",
                        marginBottom: "10px",
                      }}
                    >
                      <Field
                        name="address"
                        // onChange={handleFieldChange}
                        sx={{ marginBottom: "10px" }}
                        style={{
                          width: "100%",
                          height: "50px",
                          fontSize: "16px",
                        }}
                        placeholder="Address"
                      />
                      {errors.address && touched.address && (
                        <Box
                          sx={{
                            bottom: "-16px",
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {errors.address}
                        </Box>
                      )}
                    </Box>
                  </Row>
                </Box>
                {isLastTab && <Button type="submit">Save changes</Button>}
              </TabPanel>
            </TabContext>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default User;

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  salutation: Yup.string().required("Salutation is required"),
  date: Yup.date()
    .max(new Date(), "Joining date cannot be in the future")
    .required("Joining date is required"),
  experience: Yup.number().required("Experience is required").integer(),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(18, "Age must be at least 18 years old")
    .max(65, "Age cannot exceed 65 years old"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^09[0-9]{8}$/,
      "Phone number must start with '09' and be 10 digits long"
    ),

  pemail: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Invalid email format. Please enter a valid Gmail address."
    )
    .required("Personal email is required"),
  cemail: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@wku\.com$/,
      "Invalid email format. Please enter a valid WKU address"
    )
    .email("Invalid email format")
    .required("Company email is required"),
  department: Yup.string().required("Department is required"),
  designation: Yup.string().matches(
    /^[A-Za-z]+$/,
    "Only alphabetic characters are allowed"
  ),

  address: Yup.string()
    .matches(
      /^(?!\s*$)[A-Za-z0-9\s]+$/,
      "Address must contain at least one non-space character"
    )
    .required("Address is required"),
  branch: Yup.string().required("Branch is required"),
});

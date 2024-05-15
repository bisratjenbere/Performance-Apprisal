import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "../../ui/Button";
import styled from "styled-components"; // Import styled-components
import Row from "../../ui/Row";
import { MenuItem } from "@mui/material";
import { Margin } from "@mui/icons-material";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import Textarea from "../../ui/Textarea";
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const StyledTh = styled.th`
  padding: 12px 15px;
`;

const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
`;

const StyledHeaderRow = styled.tr`
  background-color: #f8f8f8;
  width: "100%";
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const AddCriteria = () => {
  const { addEntity: addCriteria } = useAddEntity({
    method: "post",
    endpoint: "/templetes",
    mutationKey: "[add-templetes]",
    successMessage: "Templete added successfully",
    errorMessage: "Failed to add Templete",
    invalidateQueries: "templetes",
    redirectPath: "/hr/criteria",
  });
  const [rows, setRows] = useState([
    {
      id: 1,
      category: "",
      criteria: "",
      weight: "",
    },
  ]);

  const handleSaveCriteria = async (values) => {
    const { criteriaType: evaluationType, Criterias: questions } = values;
    addCriteria({ evaluationType, questions });
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      category: "",
      criteria: "",
      weight: "",
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
    <Formik
      initialValues={{
        criteriaType: "",
        ...rows.reduce(
          (acc, row) => ({
            ...acc,
            [`category-${row.id}`]: row.category,
            [`criteria-${row.id}`]: row.criteria,
            [`weight-${row.id}`]: row.weight,
          }),
          {}
        ),
      }}
      validate={(values) => {
        const errors = {};
        rows.forEach((row) => {
          if (!values[`category-${row.id}`]) {
            errors[`category-${row.id}`] = "Required";
          }
          if (!values[`criteria-${row.id}`]) {
            errors[`criteria-${row.id}`] = "Required";
          }
          if (!values[`weight-${row.id}`]) {
            errors[`weight-${row.id}`] = "Required";
          }
        });
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const criteriaValues = rows.map((row) => ({
          category: values[`category-${row.id}`],
          criteria: values[`criteria-${row.id}`],
          weight: values[`weight-${row.id}`],
        }));
        handleSaveCriteria({
          criteriaType: values.criteriaType,
          Criterias: criteriaValues,
        });

        setSubmitting(false);
      }}
    >
      <Form>
        <Row style={{ marginBottom: "2rem" }}>
          <span as="h3">Appraisal Type</span>
          <Field
            name="criteriaType"
            as={TextField}
            select
            variant="outlined"
            fullWidth
            sx={{
              marginBottom: "10px",
              marginLeft: "10px",
              width: "50%",
            }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
          >
            <MenuItem value="">Select Criteria Type</MenuItem>
            <MenuItem value="student-to-instructor">
              Student-To-Instructor
            </MenuItem>
            <MenuItem value="head-to-instructor">Head-To-Instructor</MenuItem>
            <MenuItem value="team-leader-to-employee">
              Team-leader-to-employee
            </MenuItem>
            <MenuItem value="dean-to-head">Dean-To-Head</MenuItem>
            <MenuItem value="director-to-team-leader">
              Director-To-Team-Leader
            </MenuItem>
            <MenuItem value="self">Self</MenuItem>
            <MenuItem value="peer-academic-to-academic">
              Peer-Academic-To-Academic
            </MenuItem>
            <MenuItem value="peer-administrative-to-administrative">
              Peer-Administrative-To-Administrative
            </MenuItem>
          </Field>
        </Row>
        <StyledTable>
          <thead>
            <StyledHeaderRow>
              <StyledTh>Category</StyledTh>
              <StyledTh>Criteria</StyledTh>
              <StyledTh>Weight</StyledTh>
            </StyledHeaderRow>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <StyledTd>
                  <Field
                    name={`category-${row.id}`}
                    as={TextField}
                    variant="outlined"
                    sx={{ marginBottom: "10px", fontSize: "16px" }}
                    inputProps={{ style: { fontSize: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "16px" } }}
                    fullWidth
                  />
                  <ErrorMessage name={`category-${row.id}`} component="div" />
                </StyledTd>
                <StyledTd>
                  <Field
                    name={`criteria-${row.id}`}
                    as={Textarea}
                    sx={{ marginBottom: "10px", fontSize: "16px" }}
                    inputProps={{ style: { fontSize: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "16px" } }}
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name={`criteria-${row.id}`} component="div" />
                </StyledTd>
                <StyledTd>
                  <Field
                    name={`weight-${row.id}`}
                    as={TextField}
                    type="number"
                    sx={{ marginBottom: "10px", fontSize: "16px" }}
                    inputProps={{ style: { fontSize: "12px" } }}
                    InputLabelProps={{ style: { fontSize: "16px" } }}
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name={`weight-${row.id}`} component="div" />
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <Button
          style={{ marginTop: "2rem", marginRight: "2rem" }}
          variation="secondary"
          onClick={handleAddRow}
        >
          Add Row
        </Button>
        <Button type="submit">Save Criteria</Button>
      </Form>
    </Formik>
  );
};

export default AddCriteria;

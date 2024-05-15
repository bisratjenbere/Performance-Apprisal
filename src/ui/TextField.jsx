import * as React from "react";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { red } from "@mui/material/colors";

const theme = createTheme();

// const StyledTextField = styled(TextField)`
//   && {
//     font-size: 20rem !important;
//     color: green !important;
//   }
// `;

const CustomTextField = ({ label }) => {
  return <TextField label={label} sx={{ fontSize: 40, color: "red" }} />;
};

export default CustomTextField;

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, styled } from "@mui/system";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Row from "./Row";

const ErrorLabel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.dark}`,
  padding: "5px",
  borderRadius: "10px",
  color: theme.palette.error.dark,
  marginTop: "10px",
}));

const StyledDialogTitle = styled(DialogTitle)({
  color: "white",
  backgroundColor: "var(--color-brand-600)",
});

const Modal = (props) => {
  const {
    title,
    children,
    open,
    onSubmit,
    width,
    handleClose,
    error,
    isLoading,
  } = props;

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      sx={{ width: width, margin: "auto", p: 2 }}
    >
      <StyledDialogTitle variant="contained">{title}</StyledDialogTitle>
      <DialogContent dividers sx={{ p: 5 }}>
        {children}
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </DialogContent>
      <DialogActions>
        <ButtonGroup>
          <Button variation="secondary" onClick={handleClose}>
            <Row type="horizontal">
              <ClearIcon />
              Close
            </Row>
          </Button>
          <Button onClick={handleSubmit}>
            <Row type="horizontal">
              <DoneIcon /> Save changes
            </Row>
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

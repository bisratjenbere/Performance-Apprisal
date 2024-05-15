import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditQuestionForm = ({ question, onSave, onClose }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  const handleSubmit = () => {
    onSave(editedQuestion);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "var(--color-brand-600)" }}>
        Edit Question
      </DialogTitle>
      <DialogContent>
        <TextField
          name="criteria"
          label="Criteria"
          fullWidth
          multiline
          rows={4}
          value={editedQuestion.criteria}
          onChange={handleChange}
          InputProps={{ sx: { fontSize: "14px" } }}
          InputLabelProps={{ sx: { fontSize: "14px" } }}
        />
        <TextField
          name="weight"
          label="Weight"
          fullWidth
          value={editedQuestion.weight}
          onChange={handleChange}
          InputProps={{ sx: { fontSize: "14px" } }}
          InputLabelProps={{ sx: { fontSize: "14px" } }}
        />
        <TextField
          name="category"
          label="Category"
          fullWidth
          value={editedQuestion.category}
          onChange={handleChange}
          InputProps={{ sx: { fontSize: "14px" } }}
          InputLabelProps={{ sx: { fontSize: "14px" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionForm;

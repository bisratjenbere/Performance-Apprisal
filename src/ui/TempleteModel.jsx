import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Row from "./Row";
import EditQuestionForm from "./EditQuestionForm";
import { useDeleteEntity, useUpdateEntity } from "../hooks/useCustomeMutation";

const ErrorLabel = styled("div")(({ theme }) => ({
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

const TemplateModal = ({ template, onClose, onEdit, onDelete }) => {
  const { updateEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/templetes",
    mutationKey: "[update-templete-question]",
    successMessage: "Templete updated successfully",
    errorMessage: "Failed to update Templete",
    invalidateQueries: "templetes",
    redirectPath: "",
  });
  const { updateEntity: deleteEntity } = useUpdateEntity({
    method: "patch",
    endpoint: "/templetes/question",
    mutationKey: "[delete-templete-question]",
    successMessage: "Question Deleted successfully",
    errorMessage: "Failed to Delete Question",
    invalidateQueries: "templetes",
    redirectPath: "",
  });

  const [editQuestionId, setEditQuestionId] = useState(null);

  const handleEditQuestion = (questionId) => {
    setEditQuestionId(questionId);
  };

  const handleEditQuestionFormSubmit = (editedQuestion) => {
    const questionId = editedQuestion._id;

    const updatedQuestion = editedQuestion;
    updateEntity(template.id, { questionId, updatedQuestion });
    setEditQuestionId(null);
  };

  const handleDeleteQuestion = (questionId) => {
    deleteEntity(template.id, { questionId: questionId });
  };

  return (
    <>
      {editQuestionId && (
        <EditQuestionForm
          question={template.questions.find((q) => q._id === editQuestionId)}
          onSave={handleEditQuestionFormSubmit}
          onClose={() => setEditQuestionId(null)}
        />
      )}
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        sx={{ margin: "auto" }}
      >
        <StyledDialogTitle>{`Questions for Template `}</StyledDialogTitle>
        <DialogContent dividers sx={{ p: 5 }}>
          {template?.questions?.map((question) => (
            <div key={question._id}>
              <p>
                <strong>Criteria:</strong> {question.criteria}
              </p>
              <p>
                <strong>Weight:</strong> {question.weight}
              </p>
              <p>
                <strong>Category:</strong> {question.category}
              </p>
              <ButtonGroup>
                <Button
                  variation="secondary"
                  onClick={() => handleEditQuestion(question._id)}
                >
                  <Row type="horizontal">
                    <ClearIcon />
                    Edit
                  </Row>
                </Button>
                <Button
                  variation="danger"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  <Row type="horizontal">
                    <DoneIcon />
                    Delete
                  </Row>
                </Button>
              </ButtonGroup>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            <Row type="horizontal">
              <ClearIcon />
              Close
            </Row>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TemplateModal;

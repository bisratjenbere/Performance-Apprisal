import React, { useState } from "react";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import DeleteConfirmationDialog from "../../ui/Dialog";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import TemplateModal from "../../ui/TempleteModel";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;

const CriteriaTable = () => {
  const { collectionData: templets, isLoading } = useGet("templetes");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const { deleteEntity: deleteTemplete } = useDeleteEntity({
    method: "delete",
    endpoint: "/templetes",
    mutationKey: "[delete-templetes]",
    successMessage: "Appraisal Template Deleted successfully",
    errorMessage: "Failed to delete Template",
    invalidateQueries: "templetes",
    redirectPath: "",
  });

  if (isLoading) return <Spinner />;

  const rows = templets?.map((template, index) => {
    const {
      _id: id,
      evaluationType: AppraisalType,
      language,
      questions,
    } = template;
    return { id, AppraisalType, language, questions, index };
  });

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTemplete(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleViewBtnClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 350,
    renderCell: (params) => {
      const template = params.row;

      return (
        <ButtonContainer>
          <Button
            style={{ backgroundColor: "#F7C566", marginRight: "0.5rem" }}
            size="small"
            onClick={() => handleViewBtnClick(template)}
            variation="secondary"
          >
            View
          </Button>
          <Button
            size="small"
            variation="danger"
            onClick={() => handleDeleteBtnClick(template.id)}
          >
            Delete
          </Button>
        </ButtonContainer>
      );
    },
  };

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "AppraisalType", headerName: "Appraisal Type", width: 400 },
    { field: "language", headerName: "Language" },
    actionColumn,
  ];

  return (
    <>
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onEdit={(questionId) => console.log("Edit question ID:", questionId)}
          onDelete={(questionId) =>
            console.log("Delete question ID:", questionId)
          }
        />
      )}
      {showDeleteDialog && (
        <DeleteConfirmationDialog
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default CriteriaTable;

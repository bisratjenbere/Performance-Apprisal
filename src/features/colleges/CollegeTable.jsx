import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import DeleteConfirmationDialog from "../../ui/Dialog";
import ButtonContainer from "../../ui/ButtonContainer";
import UpdateCollegeModal from "../../pages/admin/UpdateCollegeModel";
import Spinner from "../../ui/Spinner";

const CollegeTable = ({ searchQuery }) => {
  const queryClient = useQueryClient();
  const { collectionData: Colleges, isLoading, error } = useGet("colleges");
  const { deleteEntity: deleteCollege } = useDeleteEntity({
    method: "delete",
    endpoint: "/colleges",
    mutationKey: "[delete-colleges]",
    successMessage: "college deleted successfully",
    errorMessage: "Failed to delete College",
    invalidateQueries: "colleges",
    redirectPath: "/admin/colleges",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedDepartment, setUpdatedDepartment] = useState({});

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteCollege(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };
  const handleUpdateBtnClick = (row) => {
    setUpdatedDepartment(row);
    setIsUpdate(true);
  };

  const cancelUpdating = () => {
    setIsUpdate(false);
  };
  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  let filteredCollege;
  if (searchQuery) {
    filteredCollege = Colleges?.filter((college) => {
      const { collegeCode, collegeName, dean, numberOfDepartment } = college;

      if (
        collegeCode.includes(searchQuery.toLowerCase()) ||
        collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dean.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${numberOfDepartment}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
        return college;
    });
  } else {
    filteredCollege = Colleges;
  }

  const rows =
    filteredCollege?.map((college, index) => {
      const {
        _id: id,
        collegeName,
        collegeCode,
        numberOfDepartment,
        dean,
      } = college;

      return {
        id,
        index,
        collegeName,
        collegeCode,
        numberOfDepartment,
        dean,
      };
    }) || [];

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          <Button
            size="small"
            variation="danger"
            onClick={() => handleDeleteBtnClick(row.id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            onClick={() => handleUpdateBtnClick(row)}
            variation="primary"
          >
            Update
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
    { field: "collegeName", headerName: "College Name", width: 200 },
    { field: "collegeCode", headerName: "College Code", width: 200 },
    {
      field: "numberOfDepartment",
      headerName: "Number of Department",
      width: 180,
    },
    { field: "dean", headerName: "Dean", width: 150 },

    actionColumn,
  ];

  return (
    <>
      {isUpdate && (
        <UpdateCollegeModal
          handleClose={cancelUpdating}
          collegeToUpdate={updatedDepartment}
          open={isUpdate}
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

export default CollegeTable;

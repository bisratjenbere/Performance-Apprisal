import React, { useState } from "react";
import Table from "../../ui/Table";
import ButtonContainer from "../../ui/ButtonContainer";
import Button from "../../ui/Button";
import UpdateAppraisalCycleModal from "../../pages/hr/UpdateApprisalCycle";
import DeleteConfirmationDialog from "../../ui/Dialog";
import Spinner from "../../ui/Spinner";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";

const AppraisalCycleTable = ({ searchQuery }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedAppraisalCycle, setUpdatedAppraisalCycle] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const {
    collectionData: AppraisalCycles,
    isLoading,
    error,
  } = useGet("cycles");
  const { deleteEntity: deleteAppraisalCycle } = useDeleteEntity({
    method: "delete",
    endpoint: "/cycles",
    mutationKey: "[delete-appraisal-cycle]",
    successMessage: "Appraisal cycle deleted successfully",
    errorMessage: "Failed to delete Appraisal cycle",
    invalidateQueries: "appraisalcycles",
    redirectPath: "",
  });

  const handleUpdateBtnClick = (row) => {
    setUpdatedAppraisalCycle(row);
    setIsUpdate(true);
    setShowUpdateModal(true);
  };

  const cancelUpdating = () => {
    setIsUpdate(false);
    setShowUpdateModal(false);
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteAppraisalCycle(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 300,
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

  let instId;
  if (isLoading) return <Spinner />;

  let filteredCycle;
  if (searchQuery) {
    filteredCycle = AppraisalCycles?.filter((cycle) => {
      const { description } = cycle;
      const currentCycleStatus = `${cycle.status}`;

      if (
        currentCycleStatus.includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return cycle;
    });
  } else {
    filteredCycle = AppraisalCycles;
  }
  const rows = filteredCycle.map((cycle, index) => {
    const { _id: id, status, description, startDate, endDate } = cycle;

    return {
      id,
      index,
      status,
      description,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  });

  const columns = [
    {
      field: "No",
      headerName: "No",
      width: 10,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "status", headerName: "Status", width: 120 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    actionColumn,
  ];

  return (
    <>
      {showDeleteDialog && (
        <DeleteConfirmationDialog
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      {isUpdate && (
        <UpdateAppraisalCycleModal
          cycleToUpdate={updatedAppraisalCycle}
          handleClose={cancelUpdating}
          open={showUpdateModal}
        />
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default AppraisalCycleTable;

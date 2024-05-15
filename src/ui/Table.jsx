import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Pagination from "./Pagination";

const StyledTableContainer = styled.div`
  width: fit-content;
  height: 100%;
  overflow-x: auto; /* Enable horizontal scrolling for smaller screens */
`;

const StyledTable = styled.div`
  width: 100%;
  height: 100%;

  .MuiDataGrid-root {
    font-size: 14px;
  }

  .MuiDataGrid-cell {
    white-space: pre-wrap; /* Allow line breaks */
  }

  .MuiDataGrid-headerCell {
    padding: 1.6rem 2.4rem;
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
  }

  .MuiDataGrid-iconButtonContainer-sort {
    color: blue;
    font-size: 10rem;
  }

  .MuiDataGrid-footerContainer {
    background-color: #eee;
    padding: 5px;
  }

  /* Additional styles from the second component */
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const Table = ({ columns, rows }) => {
  return (
    <StyledTableContainer>
      <StyledTable>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={true}
          disableColumnMenu
          rowHeight={70}
        />
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;

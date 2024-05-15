// Pagination.js
import React from "react";
import Button from "./Button";
import styled from "styled-components";

const StyledPagination = styled.div`
  margin-top: 100px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Pagination = ({ currentPage, handlePreviousClick, handleNextClick }) => {
  return (
    <StyledPagination>
      <Button
        variation="secondary"
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        Previous
      </Button>
      <Button onClick={handleNextClick}>Next</Button>
    </StyledPagination>
  );
};

export default Pagination;

import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import Row from "./Row";
import PropTypes from "prop-types";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  width: max-content;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 10px;
  width: max-content;
`;

const SearchInput = styled.input`
  border: none;
  color: #000;
  outline: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const Search = ({ placeholder, onSearchChange }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <StyledSearch>
      <Row type="horizontal">
        <SearchInputContainer>
          <MdSearch />
          <SearchInput
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </SearchInputContainer>
      </Row>
    </StyledSearch>
  );
};

// Add prop-type validation
Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;

import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;

  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default StyledSelect;

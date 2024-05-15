import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
 

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
      margin-top: 1.5rem;
      width: 100%;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};
export default Row;

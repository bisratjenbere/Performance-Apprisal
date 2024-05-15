import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";

const StyledApprove = styled.div``;

const TmApprove = () => {
  return (
    <StyledApprove>
      <ButtonGroup>
        <Button> Approve </Button>
        <Button variation="danger"> Decline </Button>
      </ButtonGroup>
    </StyledApprove>
  );
};

export default TmApprove;

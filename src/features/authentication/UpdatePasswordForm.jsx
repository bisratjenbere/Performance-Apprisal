import { useForm } from "react-hook-form";

import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useResetPassword } from "./useResetPassword";
import { useParams } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10rem;

  gap: 4rem;
  margin-top: 3rem;
`;

const UpdateWrapper = styled.div`
  margin-top: 12rem;
  margin-left: 25%;
  margin-right: 25rem;
  background-color: white;
  padding: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { token } = useParams();

  const { resetPassword, isLoading } = useResetPassword();

  function onSubmit({ password }) {
    resetPassword({ password, token }, { onSuccess: reset });
  }

  return (
    <UpdateWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="New password (min 4 chars)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <ButtonContainer>
          <Button onClick={reset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isLoading}>Reset password</Button>
        </ButtonContainer>
      </Form>
    </UpdateWrapper>
  );
}

export default UpdatePasswordForm;

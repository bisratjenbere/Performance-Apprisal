import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Heading from "../ui/Heading";
import { useState } from "react";
import { useForgotPassword } from "../features/authentication/useForgotPassword";

const ForgotPasswordLayout = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-grey-50);
`;

const ForgotPasswordSection = styled.section`
  margin-top: 10rem;
  margin-bottom: 10rem;
  min-height: 80vh;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const Separator = styled.hr`
  border: none;
  height: 2px;
  width: 100%;
  background-image: linear-gradient(
    to right,
    transparent,
    var(--color-primary),
    transparent
  );
  margin: 1.5rem 0;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackToLoginLink = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
`;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { isLoading, forgotPassword } = useForgotPassword();
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(
      { email },
      {
        onSettled: () => {
          setEmail("");
        },
      }
    );
  };

  return (
    <ForgotPasswordLayout>
      <ForgotPasswordSection>
        <Heading as="h4">Forgot Your Password?</Heading>
        <Separator />
        <p>
          Enter your email address to receive instructions for <br /> creating a
          new password.
        </p>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form>
        <Footer>
          <BackToLoginLink href="/login">Back to Login</BackToLoginLink>
          <Button onClick={handleSubmit} size="large">
            Submit
          </Button>
        </Footer>
      </ForgotPasswordSection>
    </ForgotPasswordLayout>
  );
}

export default ForgotPassword;

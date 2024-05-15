import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useState } from "react";

import FormRowVertical from "../ui/FormRowVertical";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const StyledLoginSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;
const ForgotPasswordLink = styled.a`
  color: var(--color-primary);
  text-decoration: underline;
  margin-top: 1rem;
  margin-left: 13rem;
  cursor: pointer;
`;
const StudentRegister = styled.div`
  text-align: center;
  display: block;
  color: var(--color-brand);
  text-decoration: none;
  margin-top: 2rem;
  font-size: 1.4rem;
`;
const RememberMeCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-top: 1rem;
`;
function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <LoginLayout>
      <StyledLoginSection>
        <Logo />
        <Heading as="h4">WKU EPAS</Heading>
        <LoginForm />
        <RememberMeCheckbox
          id="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <label htmlFor="rememberMe"> Remember Me</label>
        <ForgotPasswordLink href="/forgot-password">
          Forgot Password?
        </ForgotPasswordLink>
      </StyledLoginSection>
    </LoginLayout>
  );
}

export default Login;

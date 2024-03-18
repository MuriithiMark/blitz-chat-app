import React from "react";

import "./login-page.scss";
import LoginForm from "../../../components/forms/login/LoginForm";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";

const LoginPage = () => {
  useAuthenticatedUser({isAuthPage: true})
  return (
    <div className="auth-container login-container">
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

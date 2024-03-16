import React from "react";

import "./login-page.scss";
import LoginForm from "../../../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="auth-container login-container">
      <div className="form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

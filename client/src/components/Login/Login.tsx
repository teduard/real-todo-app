import React from "react";
import UserFront from "@userfront/react";
import Helmet from "react-helmet";

class Login extends React.Component {
  render() {
    const LoginForm = UserFront.build({
      toolId: "klodor",
    });

    return (
      <>
        <Helmet>
          <title>Real Todo App Login</title>
        </Helmet>
        <br />
        <LoginForm />
      </>
    );
  }
}

export default Login;

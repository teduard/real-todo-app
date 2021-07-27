import React from "react";
import UserFront from "@userfront/react";
import Helmet from "react-helmet";

class SignUp extends React.Component {
  render() {
    const SignUpForm = UserFront.build({
      toolId: "nabkbo",
    });

    return (
      <>
        <Helmet>
          <title>Real Todo App - Sign up</title>
        </Helmet>
        <br />
        <SignUpForm />
      </>
    );
  }
}

export default SignUp;

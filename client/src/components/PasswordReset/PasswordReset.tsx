import React from "react";
import UserFront from "@userfront/react";
import Helmet from "react-helmet";

class PasswordReset extends React.Component {
  render() {
    const PasswordResetForm = UserFront.build({
      toolId: "drmkmk",
    });

    return (
      <>
        <Helmet>
          <title>Real Todo App - Password reset</title>
        </Helmet>
        <br />
        <PasswordResetForm />
      </>
    );
  }
}

export default PasswordReset;

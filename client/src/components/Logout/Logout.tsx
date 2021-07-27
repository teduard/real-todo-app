import React from "react";
import UserFront from "@userfront/react";
import Helmet from "react-helmet";

class Logout extends React.Component {
  render() {
    const LogoutForm = UserFront.build({
      toolId: "mnklkn",
    });

    return (
      <>
        <Helmet>
          <title>Real Todo App Logout</title>
        </Helmet>
        <br />
        <LogoutForm />
      </>
    );
  }
}

export default Logout;

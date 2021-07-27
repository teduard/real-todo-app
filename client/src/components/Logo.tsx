import React from "react";
import logo from "../assets/logo.png";

class Logo extends React.Component {
  render() {
    return (
      <>
        <img
          height="24px"
          src={logo}
          className="App-logo"
          alt="Take Care Logo"
          {...this.props}
        />
      </>
    );
  }
}

export default Logo;

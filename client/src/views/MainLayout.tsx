import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import ScrollToTop from "../components/ScrollToTop";

class MainLayout extends React.Component {
  render() {
    return (
      <>
        <Router>
          <ScrollToTop />
          <Header />
          <Navigation />
          <main>{this.props.children}</main>
          <Toolbar />
          <Footer />
        </Router>
      </>
    );
  }
}

export default MainLayout;

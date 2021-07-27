import React from "react";
import './App.css'
import UserFront from "@userfront/react";
import MainLayout from "./views/MainLayout";

class App extends React.Component {
  render() {
    UserFront.init("6nzgxjb7");

    return (
      <div className="App">
        <header className="App-header">
          <MainLayout></MainLayout>
        </header>
      </div>
    );
  }
}

export default App; 
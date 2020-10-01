import React from "react";
import "./App.scss";
import { Header } from "./components";
import { Home } from "./pages";
// import "rsuite/dist/styles/rsuite-default.css";
// import { } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;

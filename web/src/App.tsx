import React from "react";
import "./App.scss";
import { Home, Login, Register } from "./pages";
// import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;

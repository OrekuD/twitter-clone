import React from "react";
import "./App.scss";
import { Home, Login, Post, Register } from "./pages";
// import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "./components";
import { Provider } from "./context/context";

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <div className="App">
          <Layout>
            <Route path="/" exact component={Home} />
            <Route path="/post/:postId" exact component={Post} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Layout>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

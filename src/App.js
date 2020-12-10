import "./App.css";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {user ? (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

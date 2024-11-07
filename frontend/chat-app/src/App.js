import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Customer from "./Components/Customer";
import Admin from "./Components/Admin";
import AgentLogin from "./Components/AgentLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/agent-login" element={<AgentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

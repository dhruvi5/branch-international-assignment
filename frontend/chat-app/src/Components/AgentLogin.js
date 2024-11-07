import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentLogin() {
  const [agentId, setAgentId] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (agentId) {
      localStorage.setItem("agentId", agentId);
      navigate("/admin");
    } else {
      alert("Please enter an agent ID.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Agent Login</h2>
      <div>
        <label>Agent ID:</label>
        <input
          type="text"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>Enter Admin Panel</button>
    </div>
  );
}

export default AgentLogin;

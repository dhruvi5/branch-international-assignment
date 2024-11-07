import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Chat Support System</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/customer">
          <button>Customer</button>
        </Link>
        <Link to="/admin" style={{ marginLeft: "10px" }}>
          <button>Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import axios from "axios";

function Customer() {
  const [customerId, setCustomerId] = useState("");
  const [content, setContent] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/messages/send",
        null,
        {
          params: { customerId, content },
          headers: { "Content-Type": "application/json" },
        }
      );
      setResponseMessage("Your message has been sent!");
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Customer Support</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Question:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Question</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Customer;

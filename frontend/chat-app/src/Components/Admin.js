import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [messages, setMessages] = useState([]);
  const [responseText, setResponseText] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [agentId, setAgentId] = useState("");
  const [agentIdPrompted, setAgentIdPrompted] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/messages");
        setMessages(response.data.filter((msg) => !msg.isResolved));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleRespond = async (messageId) => {
    console.log(agentId);

    if (!agentId) {
      alert("Please enter your Agent ID first.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/messages/${messageId}/respond`,

        null,
        {
          params: {
            agentId: agentId,
            response: responseText,
          },
        }
      );

      setMessages(
        messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, isResolved: true, agentId: agentId }
            : msg
        )
      );
      setResponseText("");
      setSelectedMessageId(null);
    } catch (error) {
      console.error("Error responding to message:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Panel</h2>
      {!agentIdPrompted && (
        <div>
          <label>Enter Agent ID: </label>
          <input
            type="text"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            required
          />
          <button onClick={() => setAgentIdPrompted(true)}>Confirm</button>
        </div>
      )}

      <h3>Unresolved Questions</h3>
      {messages.length === 0 ? (
        <p>All questions have been resolved!</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li
              key={message.id}
              style={{ margin: "20px 0", listStyleType: "none" }}
            >
              <p>
                <strong>Customer ID:</strong> {message.customerId}
              </p>
              <p>
                <strong>Question:</strong> {message.content}
              </p>
              {message.isResolved ? (
                <p>
                  <strong>Resolved by Agent ID:</strong> {message.agentId}
                  <span style={{ color: "green", marginLeft: "10px" }}>
                    [Resolved]
                  </span>
                </p>
              ) : selectedMessageId === message.id ? (
                <div>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Enter your response"
                  />
                  <button onClick={() => handleRespond(message.id)}>
                    Submit Response
                  </button>
                </div>
              ) : (
                <button onClick={() => setSelectedMessageId(message.id)}>
                  Respond
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;

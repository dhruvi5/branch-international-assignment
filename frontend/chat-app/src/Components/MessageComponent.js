import React, { useEffect, useState } from "react";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const MessageComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/your-websocket-endpoint");

    socket.onmessage = (event) => {
      const updatedMessage = JSON.parse(event.data);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNewResponse = debounce((updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === updatedMessage.id ? updatedMessage : msg
      )
    );
  }, 300);

  const handleMessageResponse = (messageId, response) => {
    const updatedMessage = { id: messageId, response };
    handleNewResponse(updatedMessage);
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.content} <br />
            Response: {message.response || "No response yet"}
            <button
              onClick={() =>
                handleMessageResponse(message.id, "This is a response")
              }
            >
              Respond
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageComponent;

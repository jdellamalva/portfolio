"use client";

import React, { useState } from "react";

export default function Contact() {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Hello there, please provide a recipe for guacamole!",
          },
        ],
      }),
    });

    const data = await res.json();
    setResponse(data.completion?.content || "Error fetching response");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Contact Page</h1>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Test OpenAI API
      </button>
      {response && (
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
          Response: {response}
        </p>
      )}
    </div>
  );
}

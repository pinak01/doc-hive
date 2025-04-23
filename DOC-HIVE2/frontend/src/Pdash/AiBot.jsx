import React, { useState, useEffect } from 'react';

const AiBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load the chatbot script when the chat container is open.
      const container = document.getElementById('chat-tab-content');
      if (container && !container.querySelector('script')) {
        const script = document.createElement('script');
        script.src = "https://app.dante-ai.com/bubble-embed.js?kb_id=688327b4-a351-4ddc-bd65-b8e8edff3702&token=777fea7b-9237-49c4-bf5c-e6883e59e912&modeltype=gpt-4-omnimodel-mini&tabs=false";
        script.async = true;
        container.appendChild(script);
      }
    } else {
      // Clear the chat container when closing the chat.
      const container = document.getElementById('chat-tab-content');
      if (container) {
        container.innerHTML = "";
      }
    }
  }, [isOpen]);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}>
      {/* Toggle Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        {isOpen ? (
          // Close Icon (X)
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/>
          </svg>
        ) : (
          // Chat Icon (speech bubble)
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="#fff" d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
          </svg>
        )}
      </div>
      {/* Chat Container */}
      {isOpen && (
        <div
          id="chat-tab-content"
          style={{
            width: "300px",
            height: "400px",
            background: "#fff",
            border: "1px solid white",
            borderRadius: "5px",
            marginTop: "10px",
            overflow: "hidden"
          }}
        >
          {/* The chatbot embed script will render here */}
        </div>
      )}
    </div>
  );
};

export default AiBot;

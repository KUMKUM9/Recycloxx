import React, { useState } from "react";
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyAUDNqXJRg3SxEMKu0yCg90yNoiCdu-RxI";

const ChatbotBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with recycling today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const userMessages = [
        ...messages.map(m => m.text),
        input
      ].join("\n");

      console.log("Sending request to Gemini API...");
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
        {
          contents: [{
            parts: [{
              text: `You are a helpful recycling assistant. Help the user with their recycling questions: ${userMessages}`
            }]
          }]
        }
      );

      console.log("Received response:", response.data);

      if (!response.data.candidates || response.data.candidates.length === 0) {
        throw new Error("No response candidates received from API");
      }

      const botReply = response.data.candidates[0]?.content?.parts?.[0]?.text;
      if (!botReply) {
        throw new Error("Response format not as expected");
      }

      setMessages(msgs => [...msgs, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(msgs => [
        ...msgs,
        { 
          from: "bot", 
          text: "Sorry, there was an error: " + (err.response?.data?.error?.message || err.message || "Unknown error")
        }
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 9999,
        }}
      >
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#338a86",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 16px rgba(51,138,134,0.18)",
              fontSize: 34,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.2s",
            }}
            aria-label="Open chatbot"
            title="Chat with Recyclox Assistant"
          >
            💬
          </button>
        )}
        {open && (
          <div
            style={{
              width: 340,
              height: 420,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 8px 32px rgba(51,138,134,0.22)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "fadeIn 0.3s",
            }}
          >
            <div
              style={{
                background: "#338a86",
                color: "#fff",
                padding: "14px 18px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 17,
              }}
            >
              Recyclox Assistant
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: 22,
                  cursor: "pointer",
                  marginLeft: 8,
                }}
                aria-label="Close chatbot"
                title="Close"
              >
                ×
              </button>
            </div>
            <div
              style={{
                flex: 1,
                padding: 14,
                overflowY: "auto",
                background: "#f5f7fa",
                fontSize: 15,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.from === "user" ? "right" : "left",
                    margin: "8px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: msg.from === "user" ? "#c8e6c9" : "#e0e0e0",
                      color: "#222",
                      borderRadius: 12,
                      padding: "6px 12px",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              {loading && (
                <div style={{ color: "#888", fontStyle: "italic" }}>Thinking...</div>
              )}
            </div>
            <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  border: "none",
                  padding: 12,
                  fontSize: 15,
                  outline: "none",
                  background: "#fafafa",
                }}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                style={{
                  background: "#338a86",
                  color: "#fff",
                  border: "none",
                  padding: "0 18px",
                  fontSize: 16,
                  cursor: "pointer",
                }}
                aria-label="Send message"
                disabled={loading}
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotBubble;
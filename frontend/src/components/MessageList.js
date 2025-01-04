import { useEffect, useRef } from 'react';

export const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ padding: '10px', backgroundColor: msg.user === currentUser ? '#e3f2fd' : 'white' }}>
          <strong>{msg.user}:</strong> {msg.text}
          {msg.image && <img src={msg.image} alt="uploaded" style={{ maxWidth: '200px', display: 'block', marginTop: '5px' }} />}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://34.227.157.219:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      socket.emit('message', { user: username, text: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <input
        placeholder="Tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '10px' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={{ width: '80%', padding: '10px' }}
        />
        <button type="submit" style={{ width: '20%', padding: '10px' }}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
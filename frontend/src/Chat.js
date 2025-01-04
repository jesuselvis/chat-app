import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';

const socket = io('http://34.227.157.219:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const setName = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsNameSet(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() || selectedImage) {
      socket.emit('message', { 
        user: username, 
        text: messageInput,
        image: selectedImage
      });
      setMessageInput('');
      setSelectedImage(null);
    }
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessageInput(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!isNameSet) {
    return (
      <form onSubmit={setName} style={{ maxWidth: '400px', margin: '20px auto' }}>
        <input
          placeholder="Ingresa tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Comenzar Chat
        </button>
      </form>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Chat como: {username}</h2>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '10px', backgroundColor: msg.user === username ? '#e3f2fd' : 'white' }}>
            <strong>{msg.user}:</strong> {msg.text}
            {msg.image && <img src={msg.image} alt="uploaded" style={{ maxWidth: '200px', display: 'block', marginTop: '5px' }} />}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ marginRight: '10px' }}
          />
          <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </button>
        </div>
        {showEmojiPicker && (
          <div style={{ position: 'absolute', bottom: '100px' }}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            style={{ flex: 1, padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
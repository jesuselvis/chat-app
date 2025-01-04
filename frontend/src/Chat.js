import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LoginForm } from './components/LoginForm';
import { MessageList } from './components/MessageList';
import { ChatForm } from './components/ChatForm';

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

  const handleSetName = (e) => {
    e.preventDefault();
    if (username.trim()) setIsNameSet(true);
  };

  const handleSendMessage = (e) => {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioRecord = (audioData) => {
    WebSocket.emit('message',{
        user: username,
        text: '🎤 Mensaje de voz',
        audio: audioData
    })
  };

  if (!isNameSet) {
    return (
      <LoginForm 
        username={username}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onSubmit={handleSetName}
      />
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px',
      margin: '20px auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',        
      }}>
      <h2 style={{
        textAlign: 'center',
        color: '#333',
        padding: '10px',
        borderBottom: '2px solid #e0e0e0'
      }}>Chat como: {username}</h2>
      <MessageList messages={messages} currentUser={username} />
      <ChatForm 
        messageInput={messageInput}
        onMessageChange={(e) => setMessageInput(e.target.value)}
        onSubmit={handleSendMessage}
        onImageUpload={handleImageUpload}
        showEmojiPicker={showEmojiPicker}
        onEmojiToggle={() => setShowEmojiPicker(!showEmojiPicker)}
        onEmojiSelect={(emojiObject) => {
          setMessageInput(prev => prev + emojiObject.emoji);
          setShowEmojiPicker(false);
        }}
        onAudioRecord={handleAudioRecord}
      />
    </div>
  );
}

export default Chat;
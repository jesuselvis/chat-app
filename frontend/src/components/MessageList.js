import React, { useState, useEffect, useRef } from 'react';

export const MessageList = ({ messages, currentUser }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '10px', backgroundColor: msg.user === currentUser ? '#e3f2fd' : 'white' }}>
            <strong>{msg.user}:</strong> {msg.text}
            {msg.image && (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                    <img 
                        src={msg.image} 
                        alt="uploaded" 
                        onClick={() => setSelectedImage(msg.image)}
                        style={{ maxWidth: '200px', cursor: 'pointer'}} 
                    />
                </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <img src={selectedImage} style={{ maxHeight: '90vh', maxWidth: '90vw' }} />
        </div>
      )}
    </>
  );
};
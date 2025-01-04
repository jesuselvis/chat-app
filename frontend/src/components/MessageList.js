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
      <div style={{ 
        height: '500px', 
        overflowY: 'auto', 
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
        }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            padding: '12px', 
            backgroundColor: msg.user === currentUser ? '#e3f2fd' : 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
            <strong style={{color: '#2196f3'}} > {msg.user}:</strong> {msg.text}
            {msg.image && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img 
                        src={msg.image} 
                        alt="uploaded" 
                        onClick={() => setSelectedImage(msg.image)}
                        style={{ maxWidth: '200px', cursor: 'pointer'}} 
                    />
                </div>
            )}
            {msg.audio && (
                <audio controls src={msg.audio} style={{marginTop: '10px', width: '100%'}} />
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
import EmojiPicker from 'emoji-picker-react';
import { AudioRecorder } from './AudioRecorder';

export const ChatForm = ({ 
    messageInput, 
    onMessageChange, 
    onSubmit, 
    onImageUpload, 
    showEmojiPicker, 
    onEmojiToggle, 
    onEmojiSelect, 
    onAudioRecord
 }) => (
    <form onSubmit={onSubmit}>
      <div style={{ 
        display: 'flex', 
        marginBottom: '10px', 
        justifyContent: 'space-between',
        padding: '8px',
        backgroundColor: 'white',
        borderRadius: '8px' 
        }}>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ marginRight: '10px' }}
        />
        <button type="button" onClick={onEmojiToggle}>😊</button>
        <AudioRecorder onAudioRecord={onAudioRecord} />
      </div>
      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '100px' }}>
          <EmojiPicker onEmojiClick={onEmojiSelect} />
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <input
          value={messageInput}
          onChange={onMessageChange}
          style={{ 
            flex: 1, 
            padding: '12px',
            borderRadius: '6px', 
            border: '1px solid #ddd' 
        }}
        />
        <button type="submit" style={{ 
            padding: '12px 24px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
            }}>Enviar</button>
      </div>
    </form>
  );
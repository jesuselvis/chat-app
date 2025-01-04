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
      <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}>
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
          style={{ flex: 1, padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Enviar</button>
      </div>
    </form>
  );
import React, { useState } from 'react';

export const AudioRecorder = ({ onAudioRecord }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => onAudioRecord(reader.result);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <button 
      onClick={isRecording ? stopRecording : startRecording}
      style={{
        padding: '10px',
        backgroundColor: isRecording ? 'red' : 'gray',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px'
      }}
    >
      🎤
    </button>
  );
};
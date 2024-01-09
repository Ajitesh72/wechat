import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:8080', { transports: ['websocket'] });
    setSocket(newSocket);

    // Listen for incoming chat messages
    newSocket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log(messages)
    });

    // Cleanup when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // Send the chat message to the server
      socket.emit('chat message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the WebSocket Chat App!</h1>
        <div className="chat-container">
          <ul className="message-list">
            {messages.map((msg, index) => (
              <li key={index} className="message-item">{msg}</li>
            ))}
          </ul>
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button onClick={handleSendMessage} className="send-button">Send</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

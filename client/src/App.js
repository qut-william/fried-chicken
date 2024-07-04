import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a separate CSS file for React component styles

const App = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageSender, setMessageSender] = useState('Westpac Pal');

  useEffect(() => {
    // Load messages from localStorage on component mount
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  const updateMessageSender = (name) => {
    setMessageSender(name);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    const message = {
      sender: messageSender,
      text: inputText,
      timestamp
    };

    // Update state with new message
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save messages to localStorage
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Clear input field
    setInputText('');
  };

  const clearChat = () => {
    // Clear localStorage and reset state
    localStorage.clear();
    setMessages([]);
  };

  return (
    <div className="App">
      <div className="person-selector">
        <button
          className={`button person-selector-button ${messageSender === 'Westpac Pal' ? 'active-person' : ''}`}
          id="westpacpal-selector"
          onClick={() => updateMessageSender('Westpac Pal')}
        >
          Westpac Pal
        </button>
        <button
          className={`button person-selector-button ${messageSender === 'Jane' ? 'active-person' : ''}`}
          id="jane-selector"
          onClick={() => updateMessageSender('Jane')}
        >
          Jane
        </button>
      </div>
      <div className="chat-box">
        <div className="chat-header-container">
          <h2 className="chat-header">{messageSender} chatting...</h2>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'Westpac Pal' ? 'blue-bg sent-message' : 'gray-bg received-message'}`}
              >
                <div className="message-sender">{message.sender}</div>
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type here, ${messageSender}...`}
              required
            />
            <button type="submit" className="button send-button">
              Send
            </button>
          </form>
          <button className="button clear-chat-button" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

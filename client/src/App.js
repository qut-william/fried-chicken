import React, { useState, useEffect } from 'react';
import axios from 'axios';
import transactions from './data/transactions';
import './App.css'; // Assuming you have a separate CSS file for React component styles

const App = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageSender, setMessageSender] = useState("user");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    // Load messages from localStorage on component mount
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  const updateMessageSender = (name) => {
    setMessageSender(name);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("test")
    setSubmitDisabled(true);

    const message = {
      role: messageSender,
      content: inputText,
    };

    // Update state with new message
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        // const response = await axios.post("http://envy.ddns.net:5000/chat", {
        transactions,
        messages: updatedMessages
      });

      console.log(response.data)
      setMessages(response.data)
      
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }
    catch {

    }
    finally {
      setSubmitDisabled(false);
    }

    // Save messages to localStorage

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
      <div className="chat-box">
        <div className="chat-header-container">
          <h2 className="chat-header">Westpac Pal</h2>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'gray-bg received-message' : 'blue-bg sent-message'}`}
              >
                <div className="message-sender">{message.role === 'user' ? 'Jane' : 'Westpac Pal'}</div>
                <div className="message-text">{message.content}</div>
                {message.AR ? <div className='message-link'>Check your spending with AR →</div> : ''}
              </div>
            ))}
          </div>

          <form className="chat-input-form" disabled={submitDisabled} onSubmit={sendMessage}>
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

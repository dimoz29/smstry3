import React, { useState } from 'react';
import './App.css';

function App() {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [messageText, setMessageText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient_number: recipientNumber,
          message_text: messageText,
        }),
      });

      if (response.status === 200) {
        setSuccessMessage('Message sent successfully');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Error sending message');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error sending message');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain SMS Sender</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Number:
          <input
            type="text"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Message Text:
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default App;

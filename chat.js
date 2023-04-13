import React, { useState, useRef, useEffect } from 'react';
import '../StyleSheet/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([{ text: '¡Bienvenido al chat!', sender: 'system' }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      // Agregar mensaje del usuario
      setMessages([...messages, { text: inputValue, sender: 'me' }]);

      // Enviar mensaje a la API de ChatGPT
      const response = await fetch('https://api.openai.com/v1/engine/ada/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${'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'}`, // Reemplazar con tu API key de OpenAI
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          'prompt': `Human: ${inputValue}\nAI:`,
          'temperature': 0.5,
          'max_tokens': 50
        })
      });

      // Obtener respuesta de la API de ChatGPT
      const data = await response.json();
      const aiResponse = data.choices[0].text.trim();

      // Agregar respuesta de la API al chat
      setMessages([...messages, { text: aiResponse, sender: 'you' }]);
      setInputValue('');
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-log">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.sender}`} key={index}>
            <span>{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Whats your Question?..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Chat;

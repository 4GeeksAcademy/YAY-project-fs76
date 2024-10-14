import React, { useState, useContext } from 'react';
import { AuthContext } from './ChatApp';

export const MessageInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input && token) {
      sendMessage({ author: 'Usuario', text: input });
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

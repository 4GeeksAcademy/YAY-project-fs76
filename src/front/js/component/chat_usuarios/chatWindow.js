import React from 'react';
import { Message } from './mesaage';

export const ChatWindow = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

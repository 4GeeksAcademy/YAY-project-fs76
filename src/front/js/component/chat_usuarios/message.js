import React from 'react';

export const Message = ({ message }) => {
  return (
    <div>
      <strong>{message.author}:</strong> {message.text}
    </div>
  );
};
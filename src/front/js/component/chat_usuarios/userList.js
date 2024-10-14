import React from 'react';
import { UserChat } from './userChat';

export const UserList = () => {
  const users = [
    { id: 1, name: 'Usuario1' },
    { id: 2, name: 'Usuario2' },
    { id: 3, name: 'Usuario3' },
  ];

  return (
    <div>
      <h3>Usuarios</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <UserChat user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

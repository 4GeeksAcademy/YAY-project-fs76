import React from 'react';
import { ChatWindow } from './chatWindow';
import { MessageInput } from './mesaageInput';
import { UserList } from './userList';

export const AuthContext = createContext();

export const ChatApp = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const authenticateUser = (userData) => {
    // Lógica para autenticar al usuario y obtener el token
    setToken(userData.token);
    setUser(userData.user);
  };

  const sendMessage = (message) => {
    // Lógica para enviar un mensaje
    setMessages([...messages, message]);
  };

  return (
    <AuthContext.Provider value={{ token, user, authenticateUser }}>
      <UserList />
      <ChatWindow messages={messages} />
      <MessageInput sendMessage={sendMessage} token={token} />
    </AuthContext.Provider>
  );
};

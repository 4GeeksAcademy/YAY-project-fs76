import React from 'react';
import { useContext } from 'react';

const ProfileInfo = ({ profile }) => {
  return (
    <div>
      <h2>Información de perfil</h2>
      <p>Nombre: {profile.name}</p>
      <p>Apellidos: {profile.lastName}</p>
      <p>Fecha de nacimiento: {profile.birthDate}</p>
      <p>Ubicación: {profile.location}</p>
      <p>Breve descripción: {profile.description}</p>
    </div>
  );
};

export default ProfileInfo;
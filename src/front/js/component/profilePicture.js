import React from 'react';

const ProfilePicture = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Imagen de perfil" style={{ maxWidth: '100%' }} />
      ) : (
        <div>
          {/* Agregar un indicador de carga o una imagen de placeholder */}
          <p>Cargando imagen...</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
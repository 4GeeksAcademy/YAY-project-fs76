import React, { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../store/appContext';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { actions } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.editProfile(name, lastName, birthDate, location, description)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Apellidos:
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </label>
        <label>
          Fecha de nacimiento:
          <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
        </label>
        <label>
          Ubicación:
          <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </label>
        <label>
          Breve descripción:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
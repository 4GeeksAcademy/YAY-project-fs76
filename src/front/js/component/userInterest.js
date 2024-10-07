import React, { useState, useEffect } from 'react';

const UserInterest = () => {
  const [interests, setInterests] = useState([
    { id: 1, name: 'Bailar' },
    { id: 2, name: 'Jugar al mus' },
    { id: 3, name: 'Leer' },
    { id: 4, name: 'Ver películas' },
    { id: 5, name: 'Escuchar música' },
    { id: 6, name: 'Hacer deporte' },
    { id: 7, name: 'Viajar' },
    { id: 8, name: 'Aprender idiomas' },
  ]); // store the list of interests
  const [selectedInterests, setSelectedInterests] = useState([]); 
  const [columns, setColumns] = useState(2); 
    const storedInterests = localStorage.getItem('selectedInterests');

  const handleInterestSelect = (interestId) => {
    const isSelected = selectedInterests.includes(interestId);
    if (isSelected) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
    props.onInterestSelect(selectedInterests);
  };

  const chunkInterests = () => {
    const chunkSize = Math.ceil(interests.length / columns);
    const chunkedInterests = [];
    for (let i = 0; i < interests.length; i += chunkSize) {
      chunkedInterests.push(interests.slice(i, i + chunkSize));
    }
    return chunkedInterests;
  };

  return (
    <div>
      <h2>Elegir mis intereses</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          {chunkInterests().map((interestsChunk, index) => (
            <table key={index}>
              <thead>
              </thead>
              <tbody>
                {interestsChunk.map((interest) => (
                  <tr key={interest.id}>
                    <td>{interest.name}</td>
                    <td>
                      <button onClick={() => handleInterestSelect(interest.id)}>Elegir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <ul>
            {selectedInterests.map((interestId) => (
              <li key={interestId}>
                {interests.find((interest) => interest.id === interestId).name}
                <button onClick={() => handleInterestSelect(interestId)}>Quitar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInterest;
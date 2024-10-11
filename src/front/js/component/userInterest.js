import React, { useState, useEffect } from 'react';

const UserInterest = () => {
  const [interests, setInterests] = useState([
  ]); 
  const [selectedInterests, setSelectedInterests] = useState([]); 

  useEffect(() => {
    const storedInterests = localStorage.getItem('selectedInterests');
    if (storedInterests) {
      setSelectedInterests(JSON.parse(storedInterests));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
  }, [selectedInterests]); 

  const handleInterestSelect = (interestId) => {
    const interest = interests.find((interest) => interest.id === interestId);
    setSelectedInterests((prevInterests) => [...prevInterests, interest]);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          {interests.map((interest) => (
            <div key={interest.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ width: '80%' }}>{interest.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInterest;
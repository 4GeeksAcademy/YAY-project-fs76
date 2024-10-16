import React, { useState, useEffect } from 'react';
import "../../styles/userInterest.css";

const interestsData = [
  { id: 1, name: 'Cine' },
  { id: 2, name: 'Deporte' },
  { id: 3, name: 'Música' },
  { id: 4, name: 'Arte' },
  { id: 5, name: 'Cultura' },
];

const UserInterest = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const apiKey = '';
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  useEffect(() => {
    const storedInterests = localStorage.getItem('selectedInterests');
    if (storedInterests) {
      setSelectedInterests(JSON.parse(storedInterests));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
  }, [selectedInterests]);

  const handleAskAI = async () => {
    setLoading(true);
    const interesesSeleccionados = JSON.parse(localStorage.getItem('selectedInterests'));
    const prompt = `Genera 4 recomendaciones de actividades diferentes basadas en los siguientes intereses y que sean para personas mayores de 60 años con estilo de vida saludable y sociable: ${interesesSeleccionados}.`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 350,
          temperature: 0.5,
        }),
      });

      const responseData = await response.json();
      const recommendationsContent = responseData.choices[0].message.content;

      const recommendations = recommendationsContent.split('\n').map((rec, index) => ({
        id: index + 1,
        name: rec.trim(),
      })).filter(rec => rec.name);

      const limitedRecommendations = recommendations.slice(0, 4);

      setAiRecommendations(limitedRecommendations);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
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
          <h7> Si no sabes que eventos podrian encajar con tus intereses...</h7>
        </div>
      </div>
      <button className="custom-button btn btn-lg mb-3"
        onClick={handleAskAI}
        style={{
          backgroundColor: '#7c488f',
          color: '#ffffff'
        }}
      >
        Pedir ayuda a Eureka <i className="fa-solid fa-robot" style={{ color: '#ffffff' }}></i>
      </button>

     {loading && (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="🤚">
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>
        <div className="👍"></div>
      </div>
      {/* Contenedor para el texto */}
      <div className="loading-text">
        Estoy pensando que actividades basadas en tus intereses te podrían gustar...
      </div>
    </div>
  </div>
)}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Recomendaciones de Eureka</h2>
            <ul>
              {aiRecommendations.map((recommendation) => (
                <li key={recommendation.id}>{recommendation.name}</li>
              ))}
            </ul>
            <div className="d-grid gap-2 d-md-block">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInterest;

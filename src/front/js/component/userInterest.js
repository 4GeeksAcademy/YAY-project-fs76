import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; 
import { Link } from 'react-router-dom';
import "../../styles/userInterest.css";

const UserInterest = () => {
  const [interests, setInterests] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actions } = useContext(Context); // Acceder a las acciones del contexto

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // Aquí es donde se define apiEndpoint

  useEffect(() => {
    const fetchInterests = async () => {
      const fetchedInterests = await actions.obtenerIntereses(); // Llama a la acción para obtener intereses
      setInterests(fetchedInterests); // Guarda los intereses en el estado
    };

    fetchInterests();
  }, [actions]);

  const handleAskAI = async () => {
    setLoading(true);

    // Verifica si hay intereses
    if (interests.length === 0) {
      setAiRecommendations([]); // No hay recomendaciones en este caso
      setIsModalOpen(true); // Abre el modal
      setLoading(false); // Finaliza la carga
      return; // Salir de la función
    }


    const interesesSeleccionados = interests.map(interest => interest.nombre);
    const randomQuestion = `¡Estoy emocionado de ayudarte! `; // Frase aleatoria para agregar variabilidad
    const prompt = `${randomQuestion}Genera 4 recomendaciones de actividades diferentes basadas en los siguientes intereses y que sean para personas mayores de 60 años con estilo de vida saludable y sociable: ${interesesSeleccionados.join(', ')}.`;

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
          temperature: 0.7, // Ajusta el nivel de aleatoriedad
        }),
      });

      const responseData = await response.json();
      const recommendationsContent = responseData.choices[0].message.content;

      // Dividir el contenido en líneas (asumiendo que cada recomendación está en una nueva línea)
      const recommendationsLines = recommendationsContent.split('\n').map(line => line.trim()).filter(line => line);

      // Resaltar los nombres de los intereses y el enunciado de cada recomendación
      const highlightedRecommendations = recommendationsLines.map(rec => {
        const highlightedStatement = rec.replace(/^(.*?)\: /, (match, p1) => {
          const highlightedPart = interesesSeleccionados.reduce((text, interest) => {
            const regex = new RegExp(`(${interest})`, 'gi');
            return text.replace(regex, '<strong>$1</strong>');
          }, p1);
          return `<strong>${highlightedPart}</strong>: `;
        });

        return highlightedStatement;
      });

      const recommendations = highlightedRecommendations.map((rec, index) => ({
        id: index + 1,
        name: rec,
      }));

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
    <div className='profile-card text-center'>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h3>¿Necesitas ayuda?</h3>
          <h5>Si no sabes qué eventos podrían encajar con tus intereses...</h5>
        </div>
      </div>
      <button className="btn btn-lg mt-3 mb-1"
        onClick={handleAskAI}
        style={{
          backgroundColor: '#7c488f',
          color: '#ffffff'
        }}
      >
        Pide consejo a Eureka <i className="fa-solid fa-robot" style={{ color: '#ffffff' }}></i>
      </button>
      <p className='text-start mt-0 ms-1'>*No olvides guardar antes tus cambios en 'Mis Intereses'</p>

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
            <div className="loading-text">
              Estoy pensando qué actividades basadas en tus intereses te podrían gustar...
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
          <div className="d-flex justify-content-between align-items-start">
            <h1 className="flex-fill text-center">Recomendaciones de Eureka</h1>
            <button
          type="button"
          className="btn-close"
          onClick={handleCloseModal}
          aria-label="Close"
        ></button>
        </div>
            {interests.length === 0 ? ( // Verifica si no hay intereses
              <>
              <div className='container w-75'>
                <p className='fs-4'><i className="fa-solid fa-circle-exclamation" style={{ color: '#7c488f' }}></i>  ¡Oh vaya! Parece que aún no has seleccionado ningún interés. Vete a la sección "Mis Intereses" en tu perfil y elige todos los que quieras. Guarda los cambios y vuelve cuando lo hayas hecho para poder ayudarte.</p>
                
                </div>
              </>
            ) : (
              <ul>
                {aiRecommendations.map((recommendation) => (
                  <li key={recommendation.id} dangerouslySetInnerHTML={{ __html: recommendation.name }} />
                ))}
              </ul>
            )}
            <div className="d-grid gap-2 d-md-block">
              <button className="btn btn-secondary float-end" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInterest;
const getRecommendations = (interests) => {
    const recommendations = [
      { id: 1, name: 'Sesiones de cine más baratas si eres mayor de 65 años', interests: ['cine'] },
      { id: 2, name: 'Torneo de petanca en el barrio', interests: ['deporte'] },
      { id: 3, name: 'La mejor orquesta de tus películas favoritas "Bso symphony orchestra"', interests: ['música', 'cine'] },
      { id: 4, name: 'Clase de yoga para principiantes', interests: ['deporte'] },
      { id: 5, name: 'Exposición de arte en el museo local', interests: ['arte', 'cultura'] },
    ];
  
    const filteredRecommendations = recommendations.filter(recommendation => {
      return recommendation.interests.some(interest => interests.includes(interest));
    });
  
    return filteredRecommendations;
  };
  
  const handleAskAI = async (setChatMessages, selectedInterests) => {
    setChatMessages([
      <div key={0} className="d-flex flex-row justify-content-start mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
        <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
          <p className="small mb-0">Estoy pensando que actividades basadas en tus intereses te podrían gustar...</p>
        </div>
      </div>
    ]);
  
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simula el proceso de pensamiento de la IA
    const recommendations = getRecommendations(selectedInterests);
    const chatMessagesHTML = recommendations.map((recommendation, index) => (
      <div key={index + 1} className="d-flex flex-row justify-content-start mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
        <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, 0.2)' }}>
          <p className="small mb-0">{recommendation.name}</p>
        </div>
      </div>
    ));
    setChatMessages([...chatMessages, ...chatMessagesHTML]);
  };
  
  export { getRecommendations, handleAskAI };
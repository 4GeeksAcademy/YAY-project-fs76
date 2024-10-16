import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Inscripciones } from "./inscripciones";
import { handleAskAI } from './recomendaciones';


export const Eventos = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [inscripcionIds, setInscripcionIds] = useState({});
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    actions.loadEventosConUsuarios()
      .then(() => setLoading(false), actions.loadInscripciones())
      .catch(err => {
        setLoading(false);
        setError("Error al cargar eventos");
      });
  }, [actions.loadEventosConUsuarios]);

  const setInscripcionIdForEvento = (eventoId, id, userId) => {
    setInscripcionIds(prev => ({ ...prev, [eventoId]: id, [userId]: id }));
    console.log('Inscripcion IDs:', inscripcionIds);
  };

  const userId = localStorage.getItem("user_id");


  return (
    <div className="container m-5 mx-auto w-75">
      <div className="d-flex justify-content-center">
        <button className="custom-button btn btn-lg mb-3"
          onClick={() => navigate(`/eventos-mapa/${userId}`)}
          style={{
            borderColor: '#ffc107',
            color: '#494949'
          }}
        >
          Ver en Mapa  <i className="fa-solid fa-map-location-dot" style={{ color: '#7c488f' }}></i>
        </button>
      </div>
      <ul className="list-group">
        {Array.isArray(store.eventos) && store.eventos.map((evento) => (
          <li key={evento.id} className="list-group-item d-flex justify-content-between" style={{ borderColor: '#ffc107' }}>
            
            <div className="d-flex justify-content-between flex-grow-1">
              <img
                src="https://cdn-icons-png.freepik.com/512/3544/3544735.png"
                alt="profileImage"
                className="rounded-circle my-auto ms-4"
                style={{ height: '100%', maxHeight: '100px' }}
              />
              <ul className="ms-5 flex-grow-1" style={{ listStyle: 'none', padding: 0 }}>
                <li className="fs-3" style={{ color: '#7c488f' }}>{evento.nombre}</li>
                <li className="text-muted fs-5">
                  <i className="fa-solid fa-calendar-days" style={{ color: '#7c488f' }}></i> {evento.fecha}
                </li>
                <li className="text-muted fs-6">
                  <i className="fa-solid fa-clock" style={{ color: '#7c488f' }}></i> {evento.horario}
                </li>
                <li className="text-muted fs-7">
                  <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i>  {evento.direccion}
                </li>
                <li>
                  <Link to={`/evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Saber más</Link>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-end align-items-start mt-5">

              <Inscripciones
                usuarioId={actions.getUserId()}
                eventoId={evento.id}
                nombreEvento={evento.nombre}
                inscripcionId={inscripcionIds[evento.id]}
                setInscripcionId={(id) => setInscripcionIdForEvento(evento.id, id, actions.getUserId())}
              />
            </div>
          </li>
        ))}
      </ul>
      

      {chatMessages.length > 0 && (
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}
    </div>
  );
};
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';
import { GetEventoImage } from '../getEventoImage';

export const Landing_Card = () => {
  const { store, actions } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [interes, setInteres] = useState(null);
  const [intereses, setIntereses] = useState({});
  const [showModalInfo, setShowModalInfo] = useState(false);

  useEffect(() => {
    actions.loadEventos().then(() => {
      // Aquí agregas carga de imágenes para cada evento
      store.eventos.forEach((evento) => {
        actions.getInteresPorEvento(evento.id).then((data) => {
          if (data) {
            setIntereses((prevIntereses) => ({ ...prevIntereses, [evento.id]: data.nombre }));
          }
        }).catch(error => {
          console.error("Error al cargar el interés:", error);
        });

        // Cargar la imagen del evento
        actions.getEventoImage(evento.id).then(response => {
          evento.foto_evento = response.foto_evento; // Asegúrate de que esto esté en la estructura de tu API
        }).catch(error => {
          console.error("Error al cargar la imagen del evento:", error);
        });
      });
    }).catch(error => {
      console.error("Error al cargar eventos:", error);
    });

    const handleScroll = () => {
      const cardTop = document.querySelector('.landing-card').getBoundingClientRect().top;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition > cardTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleShowInfoModal = () => {
    setShowModalInfo(true);
  };

  return (
    <div className="container content-space-2 content-space-b-lg-3">
      {/* Title */}
      <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-7">
        <h1 className="display-3 m-3">Eventos Destacados</h1>
      </div>
      {/* End Title */}

      <div className="row row-cols-1 flex-row row-cols-sm-2 row-cols-lg-3   mb-5">

        {Array.isArray(store.eventos) && store.eventos.slice(0, 6).map((evento) => (
          <div key={evento.id} className="col mb-3">
            {/* Card */}
            <div className={`card landing-card card-flush card-land h-100 ${isVisible ? 'animate' : ''}`}>
              <div className="card-pinned card-ancla">
                <div className="card-pinned-top-start card-ancla-top-start">
                  <span className="badge badge-lg bg-dark m-2" style={{ fontSize: "15px", fontWeight: '400' }}>{intereses[evento.id]}</span>
                </div>
                <div style={{width: '100%', height: '100%', maxHeight: '220px', objectFit: 'cover'}}>
                <GetEventoImage
                  eventoId={evento.id}
                  setImagenUrl={(url) => evento.foto_evento = url}
                  partnerId={evento.partner_id === parseInt(localStorage.getItem("partner_id"))}
                />
                </div>
              </div>
              {/* Body */}
              <div className="card-body margen-body">
                <div className="row align-items-center mb-3">
                  <div className="col-md-12">
                    <span><i className="fa-solid fa-calendar-days" style={{ color: '#7c488f' }}></i> {evento.fecha}</span>
                    <h3 className="card-title text-inherit mb-3">{evento.nombre}</h3>
                    <div className='descripcion-card'>
                      <span >{evento.breve_descripcion}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end mb-3">
                    <button className='btn' style={{ backgroundColor: '#7c488f', color: 'white', fontWeight: '500' }} onClick={handleShowInfoModal}>Saber más</button>
                  </div>
                </div>
              </div>
              {/* End Body */}
            </div>
            {/* End Card */}

          </div>
        ))}

        <div className="mt-5 w-100 text-center">
          <a className="custom-button btn"
            onClick={handleShowInfoModal}
            style={{
              borderColor: '#7c488f',
              borderWidth: '2px',
              color: '#494949',
              fontWeight: '500'
            }}>
            Ver todos los eventos <i className="bi-chevron-right small ms-1"></i>
          </a>
        </div>
      </div>
      {showModalInfo && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Detalles del Evento</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModalInfo(false)} aria-label="Close" onFocus={(e) => e.target.blur()}></button>                            </div>
              <div className="modal-body text-center mt-3">
                <h5>¿Quieres saber más de este evento?</h5>
                <Link to="/signup">
                  <button className="btn btn-lg my-3" style={{ backgroundColor: '#7c488f', color: 'white' }}>Regístrate y YAY</button>
                </Link>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalInfo(false)} onFocus={(e) => e.target.blur()}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>


  );
};

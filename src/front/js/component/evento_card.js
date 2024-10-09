import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Inscripciones } from "./inscripciones";

export const Evento_Card = () => {
    const { store, actions } = useContext(Context);
    const [inscripcionIds, setInscripcionIds] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadEventosConUsuarios()
        actions.loadInscripciones()
        actions.getUserId()
    }, []);

    
    const evento = store.eventos.find((evento) => evento.id === parseInt(params.theid));
    console.log('Evento:', evento);
    console.log('Inscripciones:', store.inscripciones);
    console.log('Usuario ID:', actions.getUserId());

    const inscripcion = store.inscripciones.find((inscripcion) =>
        inscripcion.evento_id === evento.id && inscripcion.usuario_id === actions.getUserId() && inscripcion.id === inscripcionIds
    );

    console.log('Inscripciones:', inscripcionIds);

    const setInscripcionIdForEvento = (eventoId, id) => {
        setInscripcionIds(prev => ({ ...prev, [eventoId]: id }));
        console.log('Inscripcion IDs:', inscripcionIds);
    };

    return (
        <>
            {evento ? (
                <div className="container w-100 d-flex justify-content-center">
                    <div className="card my-5 d-flex flex-row w-100" key={evento.id} style={{ borderColor: '#ffc107' }}>
                        <div className="profile me-3 col-6">
                            <img src="https://cdn-icons-png.freepik.com/512/3544/3544735.png" alt="profileImage" className="rounded-circle w-75 m-4" />
                        </div>
                        <div className="my-5 w-100">
                            <h2 className="mb-3" style={{ color: '#7c488f' }}>{evento.nombre}</h2>
                            <span className="text-muted d-block mb-3">
                                <b>Fecha</b>: {evento.fecha}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Horario</b>: {evento.horario}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Ubicacion</b>: {evento.direccion}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Plazas</b>: {evento.cupo}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Dificultad</b>: {evento.dificultad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Precio</b>: {evento.precio}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Accesibilidad</b>: {evento.accesibilidad}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Observaciones</b>: {evento.observaciones}
                            </span>
                            <span className="text-muted d-block mb-3">
                                <b>Descripción</b>: {evento.breve_descripcion}
                            </span>

                            <div className="d-flex justify-content-between align-items-end">
                                <Inscripciones
                                    className='mt-3'
                                    usuarioId={actions.getUserId()}
                                    eventoId={evento.id}
                                    nombreEvento={evento.nombre}
                                    inscripcionId={inscripcionIds[evento.id]}
                                    setInscripcionId={(id) => setInscripcionIdForEvento(evento.id, id)}
                                />
                                <Link to={-1}>
                                    <button className="btn btn-secondary me-5 mt-3">Volver atrás</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="m-5 p-3 alert-danger rounded">
                    <i className="fa-solid fa-triangle-exclamation"></i> Evento no encontrado
                </h1>
            )}
        </>
    );

};

Evento_Card.propTypes = {
    match: PropTypes.object
};
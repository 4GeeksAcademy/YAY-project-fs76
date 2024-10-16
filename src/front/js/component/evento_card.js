import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Inscripciones } from "./inscripciones";
import { GetEventoImage } from "./getEventoImage";

export const Evento_Card = () => {
    const { store, actions } = useContext(Context);
    const [inscripcionIds, setInscripcionIds] = useState([]);
    const [interes, setInteres] = useState(null);
    const [loading, setLoading] = useState(true);


    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadInscripciones()
        actions.getUserId()
        actions.loadEventosConUsuarios().then(() => {
            const eventoId = parseInt(params.theid);
            actions.getInteresPorEvento(eventoId).then((data) => {
                if (data) {
                    setInteres(data);
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error al cargar el interés:", error);
                setLoading(false);
            });
        }).catch(error => {
            console.error("Error al cargar eventos:", error);
            setLoading(false);
        });
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
                <div className="container w-100 d-flex justify-content-center align-items-start shadow ">
                    <div className="card-header p-0 mt-5">
                            <GetEventoImage eventoId={evento.id} setImagenUrl={(url) => evento.foto_evento = url} partnerId={evento.partner_id === parseInt(localStorage.getItem("partner_id"))} />
                            <div className="d-flex justify-content-center align-items-end">
                            <Link to={-1}>
                                        <button className="btn btn-secondary btn-lg me-5 mt-3">Volver atrás</button>
                                    </Link>
                                    <Inscripciones
                                        className='mt-3'
                                        usuarioId={actions.getUserId()}
                                        eventoId={evento.id}
                                        nombreEvento={evento.nombre}
                                        inscripcionId={inscripcionIds[evento.id]}
                                        setInscripcionId={(id) => setInscripcionIdForEvento(evento.id, id)}
                                    />

                                </div>
                        </div>
                             <div className="card-body mx-5">
                             <h1 className="mb-3 mt-3" style={{ color: '#7c488f' }}>{evento.nombre}</h1>
                             <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="text-muted d-block mb-3">
                                    <b>Fecha</b>: {evento.fecha}
                                </span>
                                <span className="text-muted d-block mb-3">
                                    <b>Horario</b>: {evento.horario}
                                </span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="text-muted d-block mb-3">
                                    <b>Accesibilidad</b>: {evento.accesibilidad ? 'Sí' : 'No'}
                                </span>
                                <span className="text-muted d-block mb-3">
                                    <b>Plazas</b>: {evento.cupo}
                                </span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 fs-5">

                                <span className="text-muted d-block mb-3">
                                    <b>Dificultad</b>: {evento.dificultad}
                                </span>
                                <span className="text-muted d-block mb-3">
                                    <b>Precio</b>: {evento.precio} €
                                </span>
                                </div>
                                <span className="text-muted d-block mb-3 fs-5">
                                    <b>Descripción</b>: {evento.breve_descripcion}
                                </span>
                                <span className="text-muted d-block mb-3 fs-5">
                                    <b>Observaciones</b>: {evento.observaciones}
                                </span>
                                <span className="text-muted d-block mb-3 fs-5">
                                    <b>Ubicacion</b>: {evento.direccion}
                                </span>

                                {loading ? (
                                    <p>Cargando interés...</p>
                                ) : (
                                    <span className="text-muted d-block mb-3 fs-5">
                                        <b>Interés</b>: {interes ? interes.nombre : 'No especificado'}
                                    </span>
                                )}
                               
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
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Inscripciones } from "./inscripciones";

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [inscripcionIds, setInscripcionIds] = useState({}); // Cambia a un objeto para manejar múltiples inscripciones

    useEffect(() => {
        actions.loadEventosConUsuarios()
            .then(() => setLoading(false))
            .catch(err => {
                setLoading(false);
                setError("Error al cargar eventos");
            });
    }, [actions.loadEventosConUsuarios]);


    const setInscripcionIdForEvento = (eventoId, id) => {
        setInscripcionIds(prev => ({ ...prev, [eventoId]: id }));
        console.log('Inscripcion IDs:', inscripcionIds);
    };

    return (
        <div className="container m-5 mx-auto w-75">
            <ul className="list-group">
                {Array.isArray(store.eventos) && store.eventos.map((evento) => (
                    <li key={evento.id} className="list-group-item d-flex justify-content-between">
                        <div className="d-flex justify-content-between flex-grow-1">
                            <img
                                src="https://cdn-icons-png.freepik.com/512/3544/3544735.png"
                                alt="profileImage"
                                className="rounded-circle my-auto ms-4"
                                style={{ height: '100%', maxHeight: '100px' }}
                            />
                            <ul className="ms-5 flex-grow-1" style={{ listStyle: 'none', padding: 0 }}>
                                <li className="fs-3 ">{evento.nombre}</li>
                                <li className="text-muted fs-5">
                                    <i className="fa-solid fa-calendar-days"></i> {evento.fecha}
                                </li>
                                <li className="text-muted fs-6">
                                    <i className="fa-solid fa-clock"></i> {evento.horario}
                                </li>
                                <li className="text-muted fs-7">
                                    <i className="fa-solid fa-location-dot"></i>  {evento.ciudad}
                                </li>
                                <li>
                                    <Link to={`/evento/${evento.id}`} className="btn btn-sm btn-primary">Saber más</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-end align-items-start">
                            <Inscripciones
                                usuarioId={actions.getUserId()}
                                eventoId={evento.id}
                                inscripcionId={inscripcionIds[evento.id]} // Pasa el inscripcionId específico para el evento
                                setInscripcionId={(id) => setInscripcionIdForEvento(evento.id, id)} // Actualiza el inscripcionId para el evento específico
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/">
                <button className="btn btn-primary mt-5">Back home</button>
            </Link>
        </div>
    );
};
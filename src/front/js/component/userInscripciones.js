import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserInscripciones = () => {
    const { store, actions } = useContext(Context);
    const { userId } = useParams(); 
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inscripcionIds, setInscripcionIds] = useState({}); 
    const [error, setError] = useState(null);

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
    return (
        <div className="container m-5 mx-auto w-50">

            <h2>Tus Inscripciones</h2>
            {store.inscripciones.length > 0 ? (
                <ul className="list-group">
                    {store.inscripciones.map(inscripcion => {
                        const evento = store.eventos.find(evento => evento.id === inscripcion.evento_id);
                        return (
                            <li key={inscripcion.id} className="list-group-item d-flex justify-content-between" style={{ borderColor: '#ffc107' }}>
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
                                            <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i> {evento.ciudad}
                                        </li>
                                        <li>
                                            <Link to={`/evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#A7D0CD', color: '#494949' }}>Saber más</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No tienes inscripciones.</p>
            )}

        </div>
    );
};
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Inscripciones } from "./inscripciones";

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [apuntados, setApuntados] = useState({});
    const [inscripcionId, setInscripcionId] = useState(null);

    useEffect(() => {
        actions.loadEventos().then((eventos) => {
            setLoading(false);
        });
    }, [actions.loadEventos]);

    const handleApuntar = (eventoId) => {
        setApuntados((prevApuntados) => ({ ...prevApuntados, [eventoId]: true }));

        const userId = store.currentUser?.id; 
        fetch('process.env.BACKEND_URL + "/api/inscripciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuario_id: userId,
            evento_id: eventoId,
            fecha_registro: new Date().toISOString()
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    const handleDesapuntar = (eventoId) => {
        setApuntados((prevApuntados) => ({ ...prevApuntados, [eventoId]: false }));
    };

    return (
        <div className="container m-5 mx-auto w-75">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/formulario-evento">
                    <button className="btn btn-primary">Crear nuevo evento</button>
                </Link>
            </div>
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
                            <Link to={`/formulario-evento/${evento.id}`}>
                                <button className="btn btn-icon">
                                    <i className="fa-solid fa-pencil" />
                                </button>
                            </Link>
                            <button className="btn btn-icon" onClick={() => {
                                actions.deleteEvento(evento.id);
                            }}>
                                <i className="fa-solid fa-trash" />
                            </button>
                            <Inscripciones 
                                usuarioId={1} 
                                eventoId={evento.id} 
                                inscripcionId={inscripcionId} 
                                setInscripcionId={setInscripcionId} 
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
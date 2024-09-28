import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        actions.loadEventos().then((eventos) => {
            setLoading(false);
        });
    }, [actions.loadEventos]);

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

                        <Link to={`/evento/${evento.id}`} key={evento.id} className="text-decoration-none flex-grow-1" style={{ textDecoration: 'none', color: 'black' }}>
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
                                </ul>
                            </div>
                        </Link>

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
                        </div>
                    </li>

                ))}
            </ul>

            <Link to="/">
                <button className="btn btn-primary mt-5">Back home</button>
            </Link>
        </div >
    )
}
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const PartnerMisEventos = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isAuthenticated = store.auth;

    if (!isAuthenticated) {
        return <Navigate to="/notFound" />;
    }

    useEffect(() => {
        const partnerId = localStorage.getItem("partner_id"); // Obtén el partner_id desde localStorage
        if (partnerId) {
            actions.loadEventosConUsuarios()
                .then(() => {
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    setError("Error al cargar eventos");
                });
        }
    }, [actions]);

    const handleDeleteClick = (evento) => {
        // Implementa la lógica para eliminar el evento aquí.
        // Por ejemplo, puedes llamar a un método de actions para eliminar el evento
        actions.deleteEvento(evento.id)
            .then(() => {
                // Actualiza la lista de eventos si es necesario
                actions.loadEventosConUsuarios();
            })
            .catch(err => {
                console.error("Error al eliminar el evento:", err);
            });
    };

    return (
        <div className="container m-5 mx-auto w-75">
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/formulario-evento">
                    <button className="btn" style={{ backgroundColor: '#7c488f', color: 'white' }} onFocus={(e) => e.target.blur()}>
                        Crear nuevo evento
                    </button>
                </Link>
            </div>
            {loading ? (
                <p>Cargando eventos...</p>
            ) : (
                <ul className="list-group">
                    {Array.isArray(store.eventos) && store.eventos
                        .filter(evento => evento.partner_id === parseInt(localStorage.getItem("partner_id"))) // Filtra por partner_id
                        .map((evento) => (
                            <li key={evento.id} className="list-group-item d-flex justify-content-between" style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', border: 'none', marginBottom: '10px' }}>
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
                                            <i className="fa-solid fa-location-dot" style={{ color: '#7c488f' }}></i> {evento.direccion}
                                        </li>
                                        <li>
                                            <Link to={`/partner-evento/${evento.id}`} className="btn my-2" style={{ backgroundColor: '#7c488f', color: 'white' }}>
                                                Ver detalles
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-end align-items-start">
                                    <button className="btn btn-icon" onClick={() => navigate(`/formulario-evento/${evento.id}`)} tabIndex="-1">
                                        <i className="fa-solid fa-pencil" style={{ color: '#7c488f' }} tabIndex="-1" />
                                    </button>
                                    <button className="btn btn-icon" onClick={() => handleDeleteClick(evento)} tabIndex="-1">
                                        <i className="fa-solid fa-trash" style={{ color: '#7c488f' }} />
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};
